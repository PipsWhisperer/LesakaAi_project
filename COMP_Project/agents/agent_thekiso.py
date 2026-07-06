# ==============================================================================
# LESAKA AI: AGENT THEKISO - MARKET ASSESSMENT (COMP 401)
# Specialized agent for market readiness and liquidation recommendations
# ==============================================================================

class AgentThekiso:
    """
    Agent Thekiso specializes in market assessment for cattle.
    Focuses on determining optimal timing for market liquidation.
    """
    
    def __init__(self):
        self.name = "Thekiso"
        self.specialization = "Market Assessment"
        self.optimal_temp_min = 36.0  # Celsius
        self.optimal_temp_max = 39.5  # Celsius
        self.optimal_heart_rate_min = 60  # BPM
        self.optimal_heart_rate_max = 80  # BPM
        
    def analyze_health_status(self, temperature, heart_rate):
        """
        Analyze health status for market readiness
        Returns: (market_ready: bool, grade: str, recommendation: str)
        """
        temp_optimal = self.optimal_temp_min <= temperature <= self.optimal_temp_max
        heart_rate_optimal = self.optimal_heart_rate_min <= heart_rate <= self.optimal_heart_rate_max
        
        if temp_optimal and heart_rate_optimal:
            market_ready = True
            grade = "A"
            recommendation = "Cattle is in optimal health for market liquidation"
        elif temp_optimal:
            market_ready = True
            grade = "B"
            recommendation = "Cattle is market-ready with minor considerations"
        elif heart_rate_optimal:
            market_ready = False
            grade = "C"
            recommendation = "Cattle requires health assessment before market"
        else:
            market_ready = False
            grade = "D"
            recommendation = "Cattle not suitable for market - requires intervention"
            
        return market_ready, grade, recommendation
    
    def estimate_market_value(self, cattle_id, grade):
        """
        Estimate market value based on health grade
        This is a placeholder - would integrate with actual market data
        """
        # Placeholder values - need to integrate with real market data later
        grade_values = {
            'A': 15000,  # Botswana Pula
            'B': 12000,
            'C': 8000,
            'D': 5000
        }
        
        base_value = grade_values.get(grade, 5000)
        
        # Add random variation to simulate market fluctuations
        import random
        variation = random.uniform(-0.1, 0.1)
        estimated_value = base_value * (1 + variation)
        
        return round(estimated_value, 2)
    
    def generate_assessment(self, cattle_id, temperature, heart_rate):
        """
        Generate market assessment report
        """
        market_ready, grade, recommendation = self.analyze_health_status(temperature, heart_rate)
        estimated_value = self.estimate_market_value(cattle_id, grade)
        
        assessment = {
            'agent': self.name,
            'cattle_id': cattle_id,
            'temperature': temperature,
            'heart_rate': heart_rate,
            'market_ready': market_ready,
            'grade': grade,
            'recommendation': recommendation,
            'estimated_value_pula': estimated_value,
            'timestamp': self._get_timestamp()
        }
        
        return assessment
    
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
        
        market_ready, grade, recommendation = self.analyze_health_status(temperature, heart_rate)
        
        if market_ready:
            return f"[{self.name} Agent] READY: {cattle_id} qualifies for market liquidation. " \
                   f"Grade: {grade}. {recommendation}"
        else:
            return f"[{self.name} Agent] HOLD: {cattle_id} not market-ready. " \
                   f"Grade: {grade}. {recommendation}"


# --- DEMO ---
if __name__ == "__main__":
    agent = AgentThekiso()
    
    # Test with optimal health
    print(agent.process("BOT-001", {'temperature': 38.5, 'heart_rate': 72}))
    
    # Test with suboptimal health
    print(agent.process("BOT-002", {'temperature': 40.2, 'heart_rate': 85}))
