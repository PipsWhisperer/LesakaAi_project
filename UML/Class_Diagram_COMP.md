# Lesaka AI System - Class Diagram (COMP 401)

## Classes

### GraphOrchestrator
**Attributes:**
- `graph: NetworkX.DiGraph` - The routing graph
- `state: StateMachine` - Current state machine instance

**Methods:**
- `route_telemetry(data: TelemetryData, cattle_id: str) -> AgentResponse`
- `validate_context(cattle_id: str) -> bool`
- `get_current_state() -> State`

### StateMachine
**Attributes:**
- `current_state: State` - Current system state
- `transition_table: Dict[State, Dict[Condition, State]]` - State transition rules

**Methods:**
- `transition(condition: Condition) -> State`
- `get_state() -> State`
- `reset() -> None`

### Agent (Abstract Base Class)
**Attributes:**
- `agent_id: str` - Unique agent identifier
- `specialization: str` - Agent specialization

**Methods:**
- `process(data: TelemetryData) -> AgentResponse` (abstract)
- `validate_input(data: TelemetryData) -> bool`

### MolemoAgent (extends Agent)
**Specialization:** Biomedical analysis for fever detection

**Attributes:**
- `fever_threshold: float = 39.5`
- `critical_threshold: float = 41.0`

**Methods:**
- `process(data: TelemetryData) -> AgentResponse`
- `detect_fever(temperature: float) -> Severity`
- `generate_recommendation(severity: Severity) -> str`

### LoapiAgent (extends Agent)
**Specialization:** Environmental analysis for cold stress

**Attributes:**
- `cold_threshold: float = 36.0`
- `severe_threshold: float = 34.0`

**Methods:**
- `process(data: TelemetryData) -> AgentResponse`
- `detect_cold_stress(temperature: float) -> Severity`
- `generate_recommendation(severity: Severity) -> str`

### ThekisoAgent (extends Agent)
**Specialization:** Market assessment for liquidation timing

**Attributes:**
- `optimal_temp_min: float = 36.0`
- `optimal_temp_max: float = 39.5`
- `optimal_hr_min: int = 60`
- `optimal_hr_max: int = 80`

**Methods:**
- `process(data: TelemetryData) -> AgentResponse`
- `assess_market_readiness(data: TelemetryData) -> MarketGrade`
- `calculate_estimated_value(grade: MarketGrade) -> float`

### SupervisorAgent (extends Agent)
**Specialization:** Error recovery and system stability

**Attributes:**
- `fallback_strategies: Dict[ErrorType, FallbackAction]`
- `error_log: List[ErrorLogEntry]`

**Methods:**
- `process(error: Error) -> RecoveryResponse`
- `determine_fallback(error_type: ErrorType) -> FallbackAction`
- `log_error(error: Error, action: FallbackAction) -> None`
- `execute_recovery(action: FallbackAction) -> RecoveryResponse`

### TelemetryData
**Attributes:**
- `cattle_id: str`
- `temperature: float`
- `heart_rate: int`
- `timestamp: datetime`
- `validation_status: str`

### AgentResponse
**Attributes:**
- `agent_id: str`
- `severity: Severity`
- `recommendation: str`
- `action_required: bool`
- `timestamp: datetime`

### Error
**Attributes:**
- `error_type: ErrorType`
- `error_message: str`
- `cattle_id: str`
- `timestamp: datetime`

### RecoveryResponse
**Attributes:**
- `fallback_action: FallbackAction`
- `recovery_message: str`
- `success: bool`

### ErrorLogEntry
**Attributes:**
- `timestamp: datetime`
- `cattle_id: str`
- `error_type: ErrorType`
- `error_message: str`
- `fallback_action: FallbackAction`
- `recovery_status: str`

## Enums

### State
- NORMAL
- FEVER
- COLD_STRESS
- ERROR

### Severity
- NORMAL
- HIGH
- CRITICAL
- SEVERE

### MarketGrade
- A
- B
- C
- D

### ErrorType
- NO_DATA_FOUND
- CONTEXT_ANOMALY
- PROCESSING_ERROR
- UNKNOWN_ERROR

### FallbackAction
- REQUEST_DATA
- VALIDATE_CONTEXT
- RETRY_SAFE_MODE
- ESCALATE

### Condition
- TEMP_HIGH
- TEMP_LOW
- TEMP_NORMAL
- ERROR_DETECTED

## Relationships

### Inheritance
- MolemoAgent extends Agent
- LoapiAgent extends Agent
- ThekisoAgent extends Agent
- SupervisorAgent extends Agent

### Composition
- GraphOrchestrator contains StateMachine
- GraphOrchestrator uses Agent instances
- SupervisorAgent contains ErrorLogEntry list

### Association
- GraphOrchestrator routes to Agent
- Agent processes TelemetryData
- Agent returns AgentResponse
- SupervisorAgent handles Error

## Class Diagram (ASCII Representation)

```
┌─────────────────────┐
│  GraphOrchestrator  │
├─────────────────────┤
│ - graph: DiGraph    │
│ - state: StateMachine│
├─────────────────────┤
│ + route_telemetry() │
│ + validate_context()│
│ + get_current_state()│
└──────────┬──────────┘
           │
           │ uses
           │
    ┌──────┴──────┬──────────────┬──────────────┐
    │             │              │              │
┌───▼────┐   ┌───▼────┐   ┌───▼────┐   ┌───▼────┐
│Molemo  │   │ Loapi  │   │Thekiso │   │Supervisor│
│Agent   │   │ Agent  │   │ Agent  │   │  Agent  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
     │             │              │              │
     │             │              │              │
     └─────────────┴──────────────┘              │
                    │ extends                     │
                    │                             │
              ┌─────▼─────┐                      │
              │  Agent    │◄─────────────────────┘
              │(Abstract) │
              ├───────────┤
              │ - agent_id│
              │ - spec    │
              ├───────────┤
              │ + process()│
              │ + validate()│
              └───────────┘

┌──────────────┐     ┌──────────────┐
│StateMachine  │     │TelemetryData │
├──────────────┤     ├──────────────┤
│ - current    │     │ - cattle_id  │
│ - transitions│     │ - temperature│
├──────────────┤     │ - heart_rate │
│ + transition()│     │ - timestamp  │
│ + get_state()│     │ - validation │
│ + reset()    │     └──────────────┘
└──────────────┘

┌──────────────┐     ┌──────────────┐
│AgentResponse │     │    Error     │
├──────────────┤     ├──────────────┤
│ - agent_id   │     │ - error_type │
│ - severity   │     │ - message    │
│ - recommend  │     │ - cattle_id  │
│ - action_req │     │ - timestamp  │
│ - timestamp  │     └──────────────┘
└──────────────┘

┌──────────────┐
│RecoveryResponse│
├──────────────┤
│ - fallback   │
│ - message    │
│ - success    │
└──────────────┘
```
