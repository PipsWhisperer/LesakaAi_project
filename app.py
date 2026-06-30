from flask import Flask, render_template, request, jsonify, send_from_directory
import sqlite3
from lesaka_validation_engine import LesakaValidationEngine
from graph_orchestrator import GraphOrchestrator
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'lesaka-ai-secret-key-2024'

# Initialize engines
validation_engine = LesakaValidationEngine()
orchestrator = GraphOrchestrator('lesaka_edge.db')

# Routes
@app.route('/')
def dashboard():
    """Main dashboard view - serves React app"""
    # Try to serve React build if it exists, otherwise fallback to template
    if os.path.exists('frontend/dist'):
        return send_from_directory('frontend/dist', 'index.html')
    return render_template('dashboard.html')

@app.route('/<path:path>')
def serve_react(path):
    """Serve React static files"""
    if os.path.exists('frontend/dist'):
        return send_from_directory('frontend/dist', path)
    return jsonify({'error': 'File not found'}), 404

@app.route('/api/register_farmer', methods=['POST'])
def register_farmer():
    """API endpoint to register new farmer"""
    data = request.json
    name = data.get('full_name')
    district = data.get('district')
    
    owner_id = validation_engine.register_farmer(name, district)
    return jsonify({'status': 'success', 'owner_id': owner_id})

@app.route('/api/ingest_telemetry', methods=['POST'])
def ingest_telemetry():
    """API to ingest sensor data"""
    data = request.json
    cattle_id = data.get('cattle_id')
    temp = float(data.get('temperature'))
    heart_rate = data.get('heart_rate')
    
    is_valid, message = validation_engine.ingest_telemetry(cattle_id, temp, heart_rate)
    
    # If valid, route through orchestrator
    if is_valid:
        result = orchestrator.route_telemetry(cattle_id)
        return jsonify({'status': 'success', 'validation': 'valid', 'orchestrator_result': result})
    else:
        return jsonify({'status': 'rejected', 'validation': 'invalid', 'reason': message})

@app.route('/api/cattle_list/<owner_id>')
def cattle_list(owner_id):
    """Get all cattle for a farmer"""
    cattle = validation_engine.get_farmer_cattle(owner_id)
    return jsonify({'cattle': cattle})

@app.route('/api/telemetry_history/<cattle_id>')
def telemetry_history(cattle_id):
    """Get telemetry history for specific cattle"""
    conn = sqlite3.connect('lesaka_edge.db')
    cursor = conn.cursor()
    cursor.execute('''
        SELECT temperature, heart_rate, timestamp, validation_status 
        FROM telemetry_logs 
        WHERE cattle_id = ? 
        ORDER BY timestamp DESC 
        LIMIT 50
    ''', (cattle_id,))
    history = cursor.fetchall()
    conn.close()
    
    return jsonify({'history': history})

if __name__ == '__main__':
    # Initialize DB on startup
    validation_engine.initialize_database()
    print("[Flask] Starting Lesaka AI Web Interface...")
    app.run(debug=True, port=5000)
