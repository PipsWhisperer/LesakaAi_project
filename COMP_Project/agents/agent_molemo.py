# ==============================================================================
# LESAKA AI: AGENT MOLEMO - BIOMEDICAL ANALYSIS (COMP 401)
# Specialized agent for fever detection and veterinary intervention
# ==============================================================================

class AgentMolemo:
    """
    Agent Molemo specializes in biomedical analysis for cattle health.
    Focuses on fever detection and veterinary intervention recommendations.
    """
    
    def __init__(self):
        self.name = "Molemo"
        self.specialization = "Biomedical Analysis"
        self.fever_threshold = 39.5  # Celsius
        self.critical_threshold = 41.0  # Celsius
        
    def analyze_temperature(self, temperature, heart_rate=None):
        """
        Analyze temperature reading for fever patterns
        Returns: (severity: str, recommendation: str, action_required: bool)
        """
        if temperature >= self.critical_threshold:
            severity = "CRITICAL"
            recommendation = "Immediate veterinary intervention required"
            action_required = True
        elif temperature >= self.fever_threshold:
            severity = "HIGH"
            recommendation = "Veterinary assessment recommended within 24 hours"
            action_required = True
        else:
            severity = "NORMAL"
            recommendation = "No intervention required"
            action_required = False
            
        return severity, recommendation, action_required
    
    def generate_alert(self, cattle_id, temperature, heart_rate):
        """
        Generate alert message for fever detection
        """
        severity, recommendation, action_required = self.analyze_temperature(temperature, heart_rate)
        
        alert = {
            'agent': self.name,
            'cattle_id': cattle_id,
            'temperature': temperature,
            'heart_rate': heart_rate,
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
        heart_rate = telemetry_data.get('heart_rate')
        
        severity, recommendation, action_required = self.analyze_temperature(temperature, heart_rate)
        
        if action_required:
            return f"[{self.name} Agent] ALERT: {cattle_id} flagged for veterinary intervention. " \
                   f"Temp: {temperature}C, Severity: {severity}. {recommendation}"
        else:
            return f"[{self.name} Agent] INFO: {cattle_id} temperature normal. No action required."


# --- DEMO ---
if __name__ == "__main__":
    agent = AgentMolemo()
    
    # Test with fever temperature
    print(agent.process("BOT-001", {'temperature': 40.2, 'heart_rate': 85}))
    
    # Test with normal temperature
    print(agent.process("BOT-002", {'temperature': 38.5, 'heart_rate': 72}))
