import sqlite3

# ==============================================================================
# LESAKA AI: MULTI-AGENT GRAPH ORCHESTRATOR (COMP 401)
# Routes telemetry through specialized logic nodes: Molemo, Loapi, Thekiso.
# Need to fix the async implementation later for production
# ==============================================================================

class GraphOrchestrator:
    def __init__(self, db_path):
        self.db_path = db_path
        # temp fix for the race condition I saw yesterday
        self.lock = False

    def route_telemetry(self, cattle_id):
        # Fetch verified data from our INFS-validated database
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT temperature FROM telemetry_logs WHERE cattle_id = ? ORDER BY log_id DESC LIMIT 1", (cattle_id,))
            row = cursor.fetchone()
            conn.close()

            if not row:
                # COMP: Self-healing fallback to neutral supervisor node
                return self.agent_supervisor(cattle_id, "NO_DATA_FOUND")

            temp = row[0]
            
            # COMP: Validate regional identifier exists in context
            if not self.validate_context(cattle_id):
                return self.agent_supervisor(cattle_id, "CONTEXT_ANOMALY")
            
            # State Machine Logic (The "Graph" Routing)
            print(f"[System] Orchestrating route for {cattle_id} (Temp: {temp}C)...")
            
            # Node 1: Molemo (Biomedical Logic)
            if temp > 39.5:
                return self.agent_molemo(cattle_id, "HIGH_FEVER_RISK")
            
            # Node 2: Loapi (Environmental Logic)
            elif temp < 36.0:
                return self.agent_loapi(cattle_id, "COLD_STRESS")
                
            # Node 3: Thekiso (Market Logic)
            else:
                return self.agent_thekiso(cattle_id, "MARKET_OPTIMAL")
        except Exception as e:
            # COMP: Self-healing - catch exception and route to supervisor
            print(f"[COMP] Exception caught: {e}, routing to supervisor")
            return self.agent_supervisor(cattle_id, f"PROCESSING_ERROR: {str(e)}")
    
    def validate_context(self, cattle_id):
        """COMP: Validate that regional identifier exists in context"""
        # Placeholder for actual regional validation
        # Need to implement proper context checking later
        return True
    
    def agent_supervisor(self, cid, status):
        """COMP: Neutral supervisor node for self-healing fallback"""
        return f"[Supervisor Node] {cid} routed to neutral state. Reason: {status}"

    def agent_molemo(self, cid, status): return f"[Molemo Agent] ALERT: {cid} flagged for veterinary intervention. Reason: {status}"
    def agent_loapi(self, cid, status): return f"[Loapi Agent] NOTICE: {cid} requires shade/shelter. Reason: {status}"
    def agent_thekiso(self, cid, status): return f"[Thekiso Agent] READY: {cid} qualifies for market liquidation. Status: {status}"

# --- LIVE DEMO EXECUTION ---
if __name__ == "__main__":
    orchestrator = GraphOrchestrator('lesaka_edge.db')
    print(orchestrator.route_telemetry("BOT-001"))
