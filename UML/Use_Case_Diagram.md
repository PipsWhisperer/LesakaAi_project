# Lesaka AI System - Use Case Diagram

## Actors
- **Farmer**: Primary user who owns cattle and receives alerts
- **Broker**: Intermediary who manages multiple farms
- **Admin**: System administrator with full access
- **System**: Automated components (agents, orchestrator, database)

## Use Cases

### Farmer Use Cases
1. **Register Cattle**
   - Description: Add new cattle to the system
   - Precondition: Farmer is authenticated
   - Postcondition: Cattle record created in database

2. **View Telemetry Data**
   - Description: View real-time health data for owned cattle
   - Precondition: Farmer is authenticated
   - Postcondition: Telemetry data displayed

3. **Receive Health Alerts**
   - Description: Receive automated alerts for health issues
   - Precondition: Cattle has telemetry data
   - Postcondition: Alert notification sent

4. **View Market Assessment**
   - Description: View market readiness status for cattle
   - Precondition: Cattle health data available
   - Postcondition: Market grade displayed

### Broker Use Cases
1. **View Client Cattle Data**
   - Description: View telemetry data for client farms
   - Precondition: Broker is authenticated
   - Postcondition: Client data displayed (without GPS)

2. **Generate Reports**
   - Description: Generate aggregated reports for clients
   - Precondition: Broker has access to client data
   - Postcondition: Report generated

### Admin Use Cases
1. **Manage Users**
   - Description: Create, update, delete user accounts
   - Precondition: Admin is authenticated
   - Postcondition: User accounts updated

2. **View Audit Logs**
   - Description: View system access and modification logs
   - Precondition: Admin is authenticated
   - Postcondition: Audit logs displayed

3. **Configure System**
   - Description: Modify system settings and parameters
   - Precondition: Admin is authenticated
   - Postcondition: System configuration updated

### System Use Cases
1. **Validate Telemetry Data**
   - Description: Validate incoming sensor data
   - Precondition: Data received from sensors
   - Postcondition: Data validated and stored/rejected

2. **Route to Agent**
   - Description: Route telemetry data to appropriate agent
   - Precondition: Data validated
   - Postcondition: Data routed based on temperature

3. **Detect Fever**
   - Description: Agent Molemo analyzes for fever
   - Precondition: Temperature > 39.5°C
   - Postcondition: Fever severity determined

4. **Detect Cold Stress**
   - Description: Agent Loapi analyzes for cold stress
   - Precondition: Temperature < 36.0°C
   - Postcondition: Cold stress severity determined

5. **Assess Market Readiness**
   - Description: Agent Thekiso assesses market readiness
   - Precondition: Temperature in normal range
   - Postcondition: Market grade assigned

6. **Handle Errors**
   - Description: Supervisor agent handles system errors
   - Precondition: Error detected
   - Postcondition: Fallback action executed

## Relationships

### Include Relationships
- "View Telemetry Data" includes "Validate Telemetry Data"
- "Receive Health Alerts" includes "Route to Agent"

### Extend Relationships
- "View Market Assessment" extends "View Telemetry Data"

### Generalization Relationships
- Farmer, Broker, Admin generalize to "User"

## Use Case Diagram (ASCII Representation)

```
                    ┌─────────────┐
                    │    System   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
   │ Farmer  │       │ Broker  │       │  Admin  │
   └────┬────┘       └────┬────┘       └────┬────┘
        │                  │                  │
        │                  │                  │
   ┌────▼──────────────────▼──────────────────▼────┐
   │              Use Cases                        │
   │  ┌──────────────────────────────────────┐   │
   │  │ Register Cattle                        │   │
   │  │ View Telemetry Data                   │   │
   │  │ Receive Health Alerts                 │   │
   │  │ View Market Assessment                │   │
   │  │ View Client Cattle Data               │   │
   │  │ Generate Reports                      │   │
   │  │ Manage Users                          │   │
   │  │ View Audit Logs                       │   │
   │  │ Configure System                      │   │
   │  └──────────────────────────────────────┘   │
   └─────────────────────────────────────────────┘
```
