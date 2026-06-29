# Database Initialization Script for Lesaka AI
# Run this first to setup the database structure

from lesaka_validation_engine import LesakaValidationEngine

def main():
    print("Initializing Lesaka AI Database...")
    
    # Create engine instance
    engine = LesakaValidationEngine()
    
    # Setup database schema
    engine.initialize_database()
    
    print("\n=== Sample Data Setup ===")
    
    # Register some demo farmers
    print("Registering demo farmers...")
    owner1 = engine.register_farmer("Kagiso Molefe", "Serowe")
    owner2 = engine.register_farmer("Thato Masisi", "Orapa")
    owner3 = engine.register_farmer("Boitumelo Sebina", "Palapye")
    
    print(f"Created owner IDs: {owner1}, {owner2}, {owner3}")
    
    # Register cattle
    print("\nRegistering cattle...")
    engine.register_cattle("BOT-001", owner1, "Brahman", "2022-03-15", "Male")
    engine.register_cattle("BOT-002", owner1, "Tswana", "2023-01-20", "Female")
    engine.register_cattle("BOT-003", owner2, "Brahman", "2021-11-10", "Male")
    engine.register_cattle("BOT-004", owner2, "Tswana", "2022-07-25", "Female")
    engine.register_cattle("BOT-005", owner3, "Brahman", "2023-02-14", "Male")
    
    # Add some sample telemetry data
    print("\nAdding sample telemetry readings...")
    engine.ingest_telemetry("BOT-001", 38.5, 72)  # Normal
    engine.ingest_telemetry("BOT-001", 40.2, 85)  # Fever range
    engine.ingest_telemetry("BOT-002", 37.8, 68)  # Normal
    engine.ingest_telemetry("BOT-003", 35.5, 65)  # Cold stress
    engine.ingest_telemetry("BOT-004", 41.0, 90)  # High fever
    engine.ingest_telemetry("BOT-005", 38.2, 70)  # Normal
    
    print("\n=== Database Setup Complete ===")
    print("You can now run the web app with: python app.py")
    print("Or test the orchestrator with: python graph_orchestrator.py")

if __name__ == "__main__":
    main()
