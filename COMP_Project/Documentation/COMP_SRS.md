# Lesaka Multi-Agent Orchestration System - Software Requirements Specification (SRS)
# COMP 401 Module

## Document Information

- **Project:** Lesaka Multi-Agent Orchestration System
- **Module:** COMP 401 - Computer Science
- **Version:** 1.0
- **Author:** Andries Mooketsi Moiteelasilo
- **Date:** July 2026

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the Lesaka Multi-Agent Orchestration System, a system designed to provide intelligent routing of agricultural telemetry data in Botswana. The system focuses on graph-based orchestration, agent specialization, and self-healing mechanisms.

### 1.2 Scope
The system provides:
- Graph-based routing algorithm for telemetry data
- Three specialized agents (Molemo, Loapi, Thekiso) with domain-specific analysis
- Self-healing mechanism with supervisor agent fallback
- State machine design for deterministic routing
- Integration with INFS data governance framework

### 1.3 Definitions
- **MAS:** Multi-Agent System - System composed of multiple interacting autonomous agents
- **Graph Orchestration:** Using graph theory to model agent interactions and routing
- **State Machine:** Mathematical model of computation that defines behavior based on states
- **Self-Healing:** Ability of a system to recover from failures without human intervention
- **Agent Specialization:** Agents with expertise in specific domains

## 2. Overall Description

### 2.1 Product Perspective
The Lesaka Multi-Agent Orchestration System is a standalone system that provides intelligent routing and analysis capabilities for agricultural IoT applications. It integrates with the INFS Data Governance Framework through a well-defined API contract.

### 2.2 Product Functions
- Graph-based routing of telemetry data to specialized agents
- Biomedical analysis through Agent Molemo
- Environmental analysis through Agent Loapi
- Market assessment through Agent Thekiso
- Self-healing through Supervisor agent
- State machine for deterministic routing

### 2.3 User Characteristics
- **System:** Automated routing and analysis
- **Administrators:** Monitor system performance, view logs
- **INFS System:** Provides validated telemetry data

### 2.4 Constraints
- System must run on standard hardware
- Backend must be Python-based
- Graph library must be NetworkX or equivalent
- Must comply with COMP 401 module requirements

## 3. Functional Requirements

### 3.1 Graph Orchestration Requirements

**GOR-001:** The system shall implement a graph-based routing algorithm for telemetry data
- Priority: High
- Rationale: Enables intelligent routing decisions

**GOR-002:** The system shall route data based on temperature thresholds
- Priority: High
- Rationale: Ensures appropriate agent selection

**GOR-003:** The system shall support state machine transitions
- Priority: High
- Rationale: Provides deterministic routing behavior

**GOR-004:** The system shall validate context before routing
- Priority: Medium
- Rationale: Ensures routing validity

### 3.2 Agent Requirements

**AR-001:** The system shall implement Agent Molemo for biomedical analysis
- Priority: High
- Rationale: Provides fever detection capabilities

**AR-002:** The system shall implement Agent Loapi for environmental analysis
- Priority: High
- Rationale: Provides cold stress detection capabilities

**AR-003:** The system shall implement Agent Thekiso for market assessment
- Priority: High
- Rationale: Provides market timing capabilities

**AR-004:** The system shall implement Supervisor agent for error recovery
- Priority: High
- Rationale: Provides self-healing capabilities

### 3.3 Self-Healing Requirements

**SHR-001:** The system shall detect processing errors
- Priority: High
- Rationale: Enables error recovery

**SHR-002:** The system shall route to supervisor on error
- Priority: High
- Rationale: Provides fallback mechanism

**SHR-003:** The system shall implement fallback strategies
- Priority: High
- Rationale: Ensures system resilience

**SHR-004:** The system shall log all errors for audit
- Priority: Medium
- Rationale: Provides error tracking

### 3.4 Integration Requirements

**IR-001:** The system shall consume data from INFS database
- Priority: High
- Rationale: Provides validated telemetry data

**IR-002:** The system shall respect INFS RBAC permissions
- Priority: High
- Rationale: Ensures compliance with data governance

**IR-003:** The system shall handle INFS validation status
- Priority: High
- Rationale: Uses only validated data

**IR-004:** The system shall provide standardized error responses
- Priority: Medium
- Rationale: Ensures consistent error handling

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

**NFR-001:** Routing decisions shall complete within 100ms (p95)
- Priority: High
- Rationale: Ensures real-time decision-making

**NFR-002:** Agent processing shall complete within 50ms per request
- Priority: High
- Rationale: Ensures efficient agent operation

**NFR-003:** The system shall support 1000 routing requests per minute
- Priority: Medium
- Rationale: Supports expected data volume

### 4.2 Algorithmic Requirements

**NFR-004:** Routing algorithm shall have O(n) or better complexity
- Priority: High
- Rationale: Ensures efficient routing

**NFR-005:** State machine shall have O(1) transition complexity
- Priority: High
- Rationale: Ensures efficient state transitions

**NFR-006:** Agent selection shall be deterministic
- Priority: High
- Rationale: Ensures predictable behavior

### 4.3 Reliability Requirements

**NFR-007:** The system shall maintain 99.9% routing accuracy
- Priority: High
- Rationale: Ensures correct routing decisions

**NFR-008:** The system shall recover from errors within 5 seconds
- Priority: Medium
- Rationale: Ensures quick error recovery

### 4.4 Usability Requirements

**NFR-009:** The system shall provide clear routing decisions
- Priority: Medium
- Rationale: Improves system transparency

**NFR-010:** The system shall document all algorithmic decisions
- Priority: Medium
- Rationale: Ensures maintainability

## 5. Business Rules

**BR-001:** Temperature >39.5°C routes to Molemo (fever detection)
- Rationale: Implements biomedical routing logic

**BR-002:** Temperature <36.0°C routes to Loapi (cold stress)
- Rationale: Implements environmental routing logic

**BR-003:** Normal range (36.0-39.5°C) routes to Thekiso (market)
- Rationale: Implements market routing logic

**BR-004:** Errors route to Supervisor (fallback)
- Rationale: Implements self-healing logic

**BR-005:** Missing data routes to Supervisor (no data found)
- Rationale: Handles data unavailability

## 6. Use Cases

### 6.1 Use Case 1: Fever Detection Routing
- **Actor:** Graph Orchestrator
- **Precondition:** Telemetry data with high temperature
- **Main Flow:**
  1. System receives telemetry data from INFS database
  2. System validates context
  3. System checks temperature threshold
  4. Temperature >39.5°C triggers fever routing
  5. System routes to Agent Molemo
  6. Agent Molemo processes and returns recommendation
- **Postcondition:** Fever alert generated

### 6.2 Use Case 2: Error Recovery
- **Actor:** Graph Orchestrator
- **Precondition:** Processing error occurs
- **Main Flow:**
  1. System detects processing error
  2. System routes to Supervisor agent
  3. Supervisor agent implements fallback strategy
  4. System logs error for audit
  5. System returns neutral response
- **Postcondition:** Error handled gracefully

### 6.3 Use Case 3: Market Assessment
- **Actor:** Graph Orchestrator
- **Precondition:** Telemetry data with normal temperature
- **Main Flow:**
  1. System receives telemetry data from INFS database
  2. System validates context
  3. System checks temperature threshold
  4. Temperature in normal range triggers market routing
  5. System routes to Agent Thekiso
  6. Agent Thekiso processes and returns market assessment
- **Postcondition:** Market assessment generated

## 7. Data Requirements

### 7.1 Data Dictionary

| Data Element | Type | Source | Description |
|-------------|------|--------|-------------|
| cattle_id | TEXT | INFS Database | Cattle identifier |
| temperature | REAL | INFS Database | Temperature reading |
| heart_rate | INTEGER | INFS Database | Heart rate reading |
| validation_status | TEXT | INFS Database | VALID/REJECTED |
| routing_decision | TEXT | System | Selected agent |
| agent_response | TEXT | Agent | Agent analysis result |
| error_type | TEXT | System | Error classification |

## 8. Interface Requirements

### 8.1 Software Interfaces
- INFS database interface for data retrieval
- Agent interface for processing requests
- Supervisor interface for error recovery

### 8.2 API Interfaces
- `GET /api/route/{cattle_id}` - Route telemetry data
- `POST /api/agent/process` - Process agent request
- `GET /api/status` - System status

## 9. Verification Requirements

### 9.1 Testing Requirements
- Unit testing for all components
- Integration testing for component interactions
- System testing for end-to-end functionality
- Algorithmic testing for routing logic
- Validation testing against COMP 401 requirements

### 9.2 Acceptance Criteria
- All functional requirements met
- All non-functional requirements met
- Graph orchestration verified
- Agent specialization verified
- Self-healing verified
- Algorithm complexity verified

## Appendix A: Requirements Traceability Matrix

| Requirement ID | Design Component | Test Case | Status |
|---------------|-----------------|-----------|--------|
| GOR-001 | Graph Orchestrator | TC-GOR-001 | Pending |
| AR-001 | Agent Molemo | TC-AG-001 | Pending |
| SHR-001 | Supervisor Agent | TC-SH-001 | Pending |
| IR-001 | Integration Layer | TC-IR-001 | Pending |
