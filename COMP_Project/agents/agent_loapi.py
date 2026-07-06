# ==============================================================================
# LESAKA AI: AGENT LOAPI - ENVIRONMENTAL ANALYSIS (COMP 401)
# Specialized agent for environmental stress detection and shelter recommendations
# ==============================================================================

class AgentLoapi:
    """
    Agent Loapi specializes in environmental analysis for cattle comfort.
    Focuses on cold stress detection and shelter recommendations.
    """
    
    def __init__(self):
        self.name = "Loapi"
        self.specialization = "Environmental Analysis"
        self.cold_threshold = 36.0  # Celsius
        self.severe_cold_threshold = 34.0  # Celsius
        
    def analyze_temperature(self, temperature, humidity=None):
        """
        Analyze temperature reading for cold stress patterns
        Returns: (severity: str, recommendation: str, action_required: bool)
        """
        if temperature <= self.severe_cold_threshold:
            severity = "SEVERE"
            recommendation = "Immediate shelter required, provide heating if available"
            action_required = True
        elif temperature <= self.cold_threshold:
            severity = "MODERATE"
            recommendation = "Provide shelter and monitor closely"
            action_required = True
        else:
            severity = "NORMAL"
            recommendation = "No shelter intervention required"
            action_required = False
            
        return severity, recommendation, action_required
    
    def generate_alert(self, cattle_id, temperature, humidity):
        """
        Generate alert message for cold stress detection
        """
        severity, recommendation, action_required = self.analyze_temperature(temperature, humidity)
        
        alert = {
            'agent': self.name,
            'cattle_id': cattle_id,
            'temperature': temperature,
            'humidity': humidity,
            'severity': severity,
            'recommendation': recommendation,
            'action_required': action_required,
            'timestamp': self._get_timestamp()
        }
        
        return alert
    
    def _get_timestamp(self):
        """Get current timestamp - placeholder for proper implementation"""
        from datetime import datetime
        return datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    def process(self, cattle_id, telemetry_data):
        """
        Main processing method for agent
        This is called by the graph orchestrator
        """
        temperature = telemetry_data.get('temperature')
        humidity = telemetry_data.get('humidity')
        
        severity, recommendation, action_required = self.analyze_temperature(temperature, humidity)
        
        if action_required:
            return f"[{self.name} Agent] NOTICE: {cattle_id} requires shelter/shelter. " \
                   f"Temp: {temperature}C, Severity: {severity}. {recommendation}"
        else:
            return f"[{self.name} Agent] INFO: {cattle_id} temperature comfortable. No shelter intervention required."


# --- DEMO ---
if __name__ == "__main__":
    agent = AgentLoapi()
    
    # Test with cold temperature
    print(agent.process("BOT-001", {'temperature': 35.0, 'humidity': 65}))
    
    # Test with normal temperature
    print(agent.process("BOT-002", {'temperature': 38.5, 'humidity': 72}))
