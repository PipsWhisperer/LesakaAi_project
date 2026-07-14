# Lesaka AI System - Sequence Diagram

## Scenario 1: Fever Detection Flow

```
Farmer          System         Orchestrator      MolemoAgent      Database
  │                │                  │                │               │
  │─View Telemetry─>│                  │                │               │
  │                │─Get Data────────>│                │               │
  │                │                  │─Query─────────>│               │
  │                │                  │                │─Select───────>│
  │                │                  │                │<─Result───────│
  │                │                  │<─Telemetry─────│               │
  │                │                  │                │               │
  │                │                  │─Route─────────>│               │
  │                │                  │                │               │
  │                │                  │                │─Analyze──────>│
  │                │                  │                │               │
  │                │                  │<─Fever Alert───│               │
  │                │<─Alert──────────│                │               │
  │<─Display───────│                  │                │               │
```

## Scenario 2: Cold Stress Detection Flow

```
Farmer          System         Orchestrator      LoapiAgent       Database
  │                │                  │                │               │
  │─View Telemetry─>│                  │                │               │
  │                │─Get Data────────>│                │               │
  │                │                  │─Query─────────>│               │
  │                │                  │                │─Select───────>│
  │                │                  │                │<─Result───────│
  │                │                  │<─Telemetry─────│               │
  │                │                  │                │               │
  │                │                  │─Route─────────>│               │
  │                │                  │                │               │
  │                │                  │                │─Analyze──────>│
  │                │                  │                │               │
  │                │                  │<─Cold Alert────│               │
  │                │<─Alert──────────│                │               │
  │<─Display───────│                  │                │               │
```

## Scenario 3: Market Assessment Flow

```
Farmer          System         Orchestrator      ThekisoAgent     Database
  │                │                  │                │               │
  │─View Market────>│                  │                │               │
  │                │─Get Data────────>│                │               │
  │                │                  │─Query─────────>│               │
  │                │                  │                │─Select───────>│
  │                │                  │                │<─Result───────│
  │                │                  │<─Telemetry─────│               │
  │                │                  │                │               │
  │                │                  │─Route─────────>│               │
  │                │                  │                │               │
  │                │                  │                │─Assess───────>│
  │                │                  │                │               │
  │                │                  │<─Market Grade──│               │
  │                │<─Grade──────────│                │               │
  │<─Display───────│                  │                │               │
```

## Scenario 4: Error Recovery Flow

```
System         Orchestrator      SupervisorAgent    Database
  │                  │                  │               │
  │─Process Data────>│                  │               │
  │                  │─Validate────────>│               │
  │                  │                  │               │
  │                  │<─Error──────────│               │
  │                  │                  │               │
  │                  │─Handle Error───>│               │
  │                  │                  │               │
  │                  │                  │─Log Error────>│
  │                  │                  │               │
  │                  │                  │─Recover──────>│
  │                  │                  │               │
  │                  │<─Fallback───────│               │
  │<─Safe Response──│                  │               │
```

## Scenario 5: Data Validation Flow (INFS)

```
Sensor        ValidationEngine    TemperatureValidator    Database
  │                  │                      │               │
  │─Send Data───────>│                      │               │
  │                  │                      │               │
  │                  │─Validate Temp───────>│               │
  │                  │                      │               │
  │                  │<─Valid──────────────│               │
  │                  │                      │               │
  │                  │─Calculate Score────>│               │
  │                  │                      │               │
  │                  │<─Quality Score─────│               │
  │                  │                      │               │
  │                  │─Store Valid Data──>│               │
  │                  │                      │               │
  │<─Confirmation────│                      │               │
```

## Scenario 6: RBAC Access Control Flow

```
User          RBACEngine        SecurityModule      Database
  │                 │                    │               │
  │─Request Access──>│                    │               │
  │                 │                    │               │
  │                 │─Check Role────────>│               │
  │                 │                    │               │
  │                 │<─Role──────────────│               │
  │                 │                    │               │
  │                 │─Check Permission──>│               │
  │                 │                    │               │
  │                 │<─Allowed/Denied───│               │
  │                 │                    │               │
  │                 │─Log Access────────>│               │
  │                 │                    │               │
  │<─Grant/Deny─────│                    │               │
```

## Scenario 7: Complete Telemetry Processing Flow

```
Sensor    ValidationEngine    Orchestrator    Agent    Database    Farmer
  │               │                  │           │          │          │
  │─Telemetry────>│                  │           │          │          │
  │               │                  │           │          │          │
  │               │─Validate────────>│           │          │          │
  │               │                  │           │          │          │
  │               │<─Valid──────────│           │          │          │
  │               │                  │           │          │          │
  │               │─Store───────────>│           │          │          │
  │               │                  │           │          │          │
  │<─Ack──────────│                  │           │          │          │
  │               │                  │           │          │          │
  │               │                  │─Route────>│          │          │
  │               │                  │           │          │          │
  │               │                  │           │─Process─>│          │
  │               │                  │           │          │          │
  │               │                  │           │<─Result─│          │
  │               │                  │           │          │          │
  │               │                  │<─Alert────│          │          │
  │               │                  │           │          │          │
  │               │                  │─Notify────────────────────────>│
  │               │                  │           │          │          │
  │               │                  │           │          │<─Ack────│
```

## Legend

- **→**: Synchronous message
- **→>**: Asynchronous message
- **←**: Return message
- **--**: Activation bar
