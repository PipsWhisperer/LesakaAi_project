import sqlite3
import random
import string
from datetime import datetime

# ==============================================================================
# LESAKA AI: DATA GOVERNANCE & STORAGE ENGINE (INFS 401)
# Implements 3NF relational database with validation for edge telemetry
# ==============================================================================

class LesakaValidationEngine:
    def __init__(self, db_path='lesaka_edge.db'):
        self.db_path = db_path
        self.MIN_TEMP = 30.0  # physiological lower bound
        self.MAX_TEMP = 45.0  # physiological upper bound
        
    def initialize_database(self):
        """Create 3NF normalized database schema"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        # Added timeout because was getting database locked errors during testing
        
        # Table 1: Farmers (anonymized for privacy)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS farmers (
                farmer_id INTEGER PRIMARY KEY AUTOINCREMENT,
                owner_id TEXT UNIQUE NOT NULL,  -- anonymized token
                full_name TEXT,
                district TEXT,
                registration_date TEXT
            )
        ''')
        
        # Table 2: Cattle (linked to farmers via owner_id)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS cattle (
                cattle_id TEXT PRIMARY KEY,
                owner_id TEXT NOT NULL,
                breed TEXT,
                birth_date TEXT,
                gender TEXT,
                FOREIGN KEY (owner_id) REFERENCES farmers(owner_id)
            )
        ''')
        
        # Table 3: Telemetry Logs (normalized sensor data)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS telemetry_logs (
                log_id INTEGER PRIMARY KEY AUTOINCREMENT,
                cattle_id TEXT NOT NULL,
                temperature REAL NOT NULL,
                heart_rate INTEGER,
                timestamp TEXT NOT NULL,
                validation_status TEXT,
                FOREIGN KEY (cattle_id) REFERENCES cattle(cattle_id)
            )
        ''')
        
        conn.commit()
        conn.close()
        print("[INFS] Database initialized with 3NF schema")
    
    def generate_owner_id(self):
        """Generate anonymized owner token for privacy-by-design"""
        return 'OWN-' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    def validate_temperature(self, temp):
        """Validate temperature is within physiological bounds"""
        # Added extra check because sensor was sending -0.1 sometimes
        if temp < self.MIN_TEMP or temp > self.MAX_TEMP:
            return False, f"Temperature {temp}C outside valid range ({self.MIN_TEMP}-{self.MAX_TEMP}C)"
        return True, "Valid"
    
    def validate_region(self, district):
        """Validate district is within Botswana regions"""
        valid_regions = ['Orapa', 'Serowe', 'Maun', 'Ghanzi', 'Francistown', 'Gaborone', 'Lobatse']
        # Added strip() because user was typing with spaces at the end
        if district.strip() not in valid_regions:
            return False, f"District {district} not in valid operational regions"
        return True, "Valid region"
    
    def register_farmer(self, full_name, district):
        """Register new farmer with anonymized ID"""
        # Validate region first (INFS payload constraint)
        is_valid_region, region_msg = self.validate_region(district)
        if not is_valid_region:
            print(f"[INFS] Registration rejected: {region_msg}")
            return None
            
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        owner_id = self.generate_owner_id()
        reg_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        try:
            cursor.execute('''
                INSERT INTO farmers (owner_id, full_name, district, registration_date)
                VALUES (?, ?, ?, ?)
            ''', (owner_id, full_name, district, reg_date))
            conn.commit()
            print(f"[INFS] Farmer registered: {full_name} -> {owner_id}")
            return owner_id
        except sqlite3.IntegrityError:
            print("[INFS] Error: Owner ID collision, retrying...")
            return self.register_farmer(full_name, district)
        finally:
            conn.close()
    
    def check_rbac_permission(self, user_role, requested_data):
        """RBAC validation - check if user role can access requested data"""
        # INFS: Privacy-by-design - brokers can't see GPS coordinates
        if user_role == 'broker':
            if 'coordinates' in requested_data or 'lat' in requested_data or 'lon' in requested_data:
                return False, "Broker role cannot access geospatial coordinates"
            return True, "Access granted"
        elif user_role == 'admin' or user_role == 'farmer':
            return True, "Full access granted"
        else:
            return False, f"Unknown role: {user_role}"
    
    def register_cattle(self, cattle_id, owner_id, breed, birth_date, gender):
        """Register cattle under anonymized owner"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
                VALUES (?, ?, ?, ?, ?)
            ''', (cattle_id, owner_id, breed, birth_date, gender))
            conn.commit()
            print(f"[INFS] Cattle registered: {cattle_id} under {owner_id}")
            return True
        except sqlite3.IntegrityError as e:
            print(f"[INFS] Error registering cattle: {e}")
            return False
        finally:
            conn.close()
    
    def ingest_telemetry(self, cattle_id, temperature, heart_rate=None):
        """Ingest and validate telemetry data with structural integrity checks"""
        # Validate temperature bounds
        is_valid, message = self.validate_temperature(temperature)
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        status = "VALID" if is_valid else "REJECTED"
        
        if is_valid:
            cursor.execute('''
                INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
                VALUES (?, ?, ?, ?, ?)
            ''', (cattle_id, temperature, heart_rate, timestamp, status))
            conn.commit()
            print(f"[INFS] Telemetry accepted: {cattle_id} | {temperature}C | {status}")
        else:
            # Still log rejected data for audit trail
            cursor.execute('''
                INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
                VALUES (?, ?, ?, ?, ?)
            ''', (cattle_id, temperature, heart_rate, timestamp, status))
            conn.commit()
            print(f"[INFS] Telemetry rejected: {cattle_id} | {temperature}C | Reason: {message}")
        
        conn.close()
        return is_valid, message
    
    def get_farmer_cattle(self, owner_id):
        """Retrieve all cattle for a given anonymized owner"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT cattle_id, breed, birth_date, gender 
            FROM cattle 
            WHERE owner_id = ?
        ''', (owner_id,))
        
        results = cursor.fetchall()
        conn.close()
        return results

# --- DEMO SETUP ---
if __name__ == "__main__":
    engine = LesakaValidationEngine()
    engine.initialize_database()
    
    # Register demo farmer
    owner_id = engine.register_farmer("Kagiso Molefe", "Serowe")
    
    # Register demo cattle
    engine.register_cattle("BOT-001", owner_id, "Brahman", "2022-03-15", "Male")
    engine.register_cattle("BOT-002", owner_id, "Tswana", "2023-01-20", "Female")
    
    # Ingest sample telemetry (valid and invalid)
    engine.ingest_telemetry("BOT-001", 38.5, 72)  # Valid
    engine.ingest_telemetry("BOT-001", 40.2, 85)  # Valid (fever range)
    engine.ingest_telemetry("BOT-002", 28.0, 65)  # Invalid (too cold)
    engine.ingest_telemetry("BOT-002", 47.5, 90)  # Invalid (too hot)
    
    print("\n[INFS] Demo setup complete. Database ready for agent orchestration.")
