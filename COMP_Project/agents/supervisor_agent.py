# ==============================================================================
# LESAKA AI: SUPERVISOR AGENT - SELF-HEALING FALLBACK (COMP 402)
# Neutral supervisor node for error handling and system recovery
# ==============================================================================

class SupervisorAgent:
    """
    Supervisor Agent provides self-healing fallback for the multi-agent system.
    Handles errors, missing data, and context anomalies gracefully.
    """
    
    def __init__(self):
        self.name = "Supervisor"
        self.specialization = "Error Recovery & System Stability"
        self.error_log = []
        
    def handle_error(self, cattle_id, error_type, error_message):
        """
        Handle system errors with appropriate fallback strategies
        Returns: (fallback_action: str, recovery_message: str)
        """
        # Log the error for audit trail
        self._log_error(cattle_id, error_type, error_message)
        
        # Determine fallback strategy based on error type
        if error_type == "NO_DATA_FOUND":
            fallback_action = "REQUEST_DATA"
            recovery_message = f"No telemetry data found for {cattle_id}. Requesting data refresh."
            
        elif error_type == "CONTEXT_ANOMALY":
            fallback_action = "VALIDATE_CONTEXT"
            recovery_message = f"Context validation failed for {cattle_id}. Re-validating regional identifier."
            
        elif error_type == "PROCESSING_ERROR":
            fallback_action = "RETRY_SAFE_MODE"
            recovery_message = f"Processing error for {cattle_id}. Retrying in safe mode."
            
        else:
            fallback_action = "ESCALATE"
            recovery_message = f"Unknown error type for {cattle_id}. Escalating to manual review."
            
        return fallback_action, recovery_message
    
    def _log_error(self, cattle_id, error_type, error_message):
        """
        Log error for audit trail and system monitoring
        """
        from datetime import datetime
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        error_entry = {
            'timestamp': timestamp,
            'cattle_id': cattle_id,
            'error_type': error_type,
            'error_message': error_message
        }
        
        self.error_log.append(error_entry)
        print(f"[{self.name}] Error logged: {error_entry}")
        
        # In production, this would write to database
        return True
    
    def get_error_statistics(self):
        """
        Get statistics on errors for system monitoring
        Returns: dict with error counts by type
        """
        error_counts = {}
        for entry in self.error_log:
            error_type = entry['error_type']
            error_counts[error_type] = error_counts.get(error_type, 0) + 1
        
        return error_counts
    
    def process(self, cattle_id, error_type, error_message=None):
        """
        Main processing method for supervisor agent
        Called by graph orchestrator when errors occur
        """
        fallback_action, recovery_message = self.handle_error(cattle_id, error_type, error_message)
        
        return f"[{self.name} Agent] {cattle_id} routed to neutral state. " \
               f"Action: {fallback_action}. {recovery_message}"
    
    def reset_error_log(self):
        """
        Reset error log (useful for testing or periodic cleanup)
        """
        self.error_log = []
        print(f"[{self.name}] Error log reset")
        return True


# --- DEMO ---
if __name__ == "__main__":
    supervisor = SupervisorAgent()
    
    # Test error handling
    print(supervisor.process("BOT-001", "NO_DATA_FOUND"))
    print(supervisor.process("BOT-002", "CONTEXT_ANOMALY"))
    print(supervisor.process("BOT-003", "PROCESSING_ERROR", "Database timeout"))
    
    # Show error statistics
    print(f"\nError Statistics: {supervisor.get_error_statistics()}")
