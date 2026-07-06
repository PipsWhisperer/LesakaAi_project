# Lesaka AI Integration Architecture
# INFS 401 and COMP 401 Integration

## Document Information

- **Project:** Lesaka AI - Dual Major Project
- **Modules:** INFS 401 (Information Systems) and COMP 401 (Computer Science)
- **Version:** 1.0
- **Author:** Andries Mooketsi Moiteelasilo
- **Date:** July 2026

## 1. Overview

This document describes the integration architecture between the Lesaka Data Governance Framework (INFS 401) and the Lesaka Multi-Agent Orchestration System (COMP 401). The integration ensures that the two projects work together seamlessly while maintaining clear separation of concerns to avoid "double-dipping" on assessment criteria.

## 2. Integration Philosophy

### 2.1 Separation of Concerns

The integration is designed with clear separation of concerns:

- **INFS 401:** Data governance, database design, validation, RBAC, privacy
- **COMP 401:** Graph orchestration, agent specialization, self-healing, algorithms

### 2.2 No Double-Dipping

The integration ensures that:
- INFS 401 is assessed solely on data governance features
- COMP 401 is assessed solely on algorithmic and orchestration features
- Shared integration points are documented but not used for assessment in either module

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Lesaka AI System                       │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
┌───────▼────────┐              ┌────────▼────────┐
│ INFS 401       │              │ COMP 401        │
│ Data Governance│              │ Orchestration   │
└───────┬────────┘              └────────┬────────┘
        │                                 │
        │         ┌───────────────────────┘
        │         │
        ▼         ▼
┌─────────────────────────┐
│   Shared Database      │
│   (SQLite - 3NF Schema) │
└─────────────────────────┘
```

### 3.2 Component Interaction

```
┌──────────────────┐
│  COMP Orchestrator│
└────────┬─────────┘
         │
         │ 1. Query Telemetry
         ▼
┌──────────────────┐
│  INFS Database   │
│  (3NF Schema)    │
└────────┬─────────┘
         │
         │ 2. Return Validated Data
         ▼
┌──────────────────┐
│  COMP Orchestrator│
└────────┬─────────┘
         │
         │ 3. Route to Agent
         ▼
┌──────────────────┐
│  COMP Agents     │
│  (Molemo, Loapi, │
│   Thekiso)       │
└──────────────────┘
```

## 4. Integration Points

### 4.1 Database Layer Integration

**Purpose:** COMP 401 consumes validated data from INFS 401 database

**Implementation:**
- COMP 401 queries INFS database for telemetry data
- COMP 401 respects INFS validation status
- COMP 401 does not modify INFS database schema

**API Contract:**
```python
# COMP 401 queries INFS database
def get_telemetry(cattle_id):
    # Query INFS database for validated telemetry
    # Returns: {temperature, heart_rate, validation_status}
    pass
```

**Assessment Note:** This integration is documented for completeness but is not assessed in either module. INFS 401 is assessed on database design, not data consumption. COMP 401 is assessed on orchestration algorithms, not database queries.

### 4.2 Validation Layer Integration

**Purpose:** COMP 401 uses only INFS-validated data

**Implementation:**
- COMP 401 checks validation_status before processing
- COMP 401 rejects data marked as REJECTED
- COMP 401 routes invalid data to Supervisor agent

**API Contract:**
```python
# COMP 401 checks validation status
def check_validation_status(data):
    if data['validation_status'] == 'REJECTED':
        return False
    return True
```

**Assessment Note:** This integration is documented for completeness but is not assessed in either module. INFS 401 is assessed on validation engine design, not validation consumption. COMP 401 is assessed on error handling, not validation logic.

### 4.3 Security Layer Integration

**Purpose:** COMP 401 respects INFS RBAC permissions

**Implementation:**
- COMP 401 checks user role before data access
- COMP 401 respects field-level restrictions (e.g., GPS for)
- COMP 401 does not implement RBAC (INFS responsibility)

**API Contract:**
```python
# COMP 401 checks permissions
def check_permission(user_role, resource_type):
    # Query INFS RBAC system
    # Returns: {allowed, reason}
    pass
```

**Assessment Note:** This integration is documented for completeness but is not assessed in either module. INFS 401 is assessed on RBAC implementation, not RBAC consumption. COMP 401 is assessed on orchestration, not permission checking.

## 5. Data Flow

### 5.1 Telemetry Processing Flow

```
1. Sensor Data → INFS Validation Engine
2. INFS Validation → Database Storage (3NF)
3. COMP Orchestrator → Query Database
4. COMP Orchestrator → Route to Agent
5. COMP Agent → Process and Return Result
6. COMP Orchestrator → Return Result
```

### 5.2 Error Handling Flow

```
1. Error Detected → COMP Orchestrator
2. COMP Orchestrator → Route to Supervisor
3. Supervisor → Fallback Strategy
4. Supervisor → Return Neutral Response
5. COMP Orchestrator → Log Error
```

## 6. API Contract Specification

### 6.1 Data Retrieval API

**Endpoint:** `GET /api/telemetry/{cattle_id}`

**Request:**
```
GET /api/telemetry/CATTLE_001
```

**Response:**
```json
{
  "cattle_id": "CATTLE_001",
  "temperature": 38.5,
  "heart_rate": 75,
  "validation_status": "VALID",
  "timestamp": "2026-07-06T10:30:00Z"
}
```

**Error Response:**
```json
{
  "error": "CATTLE_NOT_FOUND",
  "message": "Cattle ID not found in database"
}
```

### 6.2 Permission Check API

**Endpoint:** `POST /api/check_permission`

**Request:**
```json
{
  "user_role": "broker",
  "resource_type": "gps_coordinates"
}
```

**Response:**
```json
{
  "allowed": false,
  "reason": "Broker role does not have GPS access"
}
```

## 7. Assessment Boundaries

### 7.1 INFS 401 Assessment Scope

**INFS 401 is assessed on:**
- Database schema design (3NF normalization)
- Data validation engine implementation
- RBAC system implementation
- Privacy-by-design features
- Data integrity constraints

**INFS 401 is NOT assessed on:**
- Graph orchestration algorithms
- Multi-agent system design
- Agent specialization
- Self-healing mechanisms
- State machine design

### 7.2 COMP 401 Assessment Scope

**COMP 401 is assessed on:**
- Graph orchestration algorithm design
- Multi-agent system architecture
- Agent specialization implementation
- Self-healing mechanisms
- State machine design
- Algorithm complexity analysis

**COMP 401 is NOT assessed on:**
- Database schema design
- Data validation logic
- RBAC implementation
- Privacy features
- Data integrity constraints

### 7.3 Shared Integration (Not Assessed)

The following integration points are documented but not assessed in either module:
- Database query interface
- Validation status checking
- Permission checking
- Error handling between systems

These integration points are necessary for system operation but are not used for assessment to ensure clear module boundaries.

## 8. Deployment Architecture

### 8.1 Development Deployment

```
┌─────────────────────────────────┐
│  Development Machine             │
│  - INFS Project (Local)         │
│  - COMP Project (Local)         │
│  - Shared Database (Local)      │
└─────────────────────────────────┘
```

### 8.2 Production Deployment (Future)

```
┌─────────────────────────────────┐
│  Edge Device (Farm Location)    │
│  - INFS Database (SQLite)       │
│  - COMP Orchestrator (Python)   │
│  - COMP Agents (Python)         │
└─────────────────────────────────┘
```

## 9. Communication Protocols

### 9.1 Inter-Process Communication

**Method:** Direct Python function calls (same process)

**Rationale:** Simplifies development and testing

**Future Enhancement:** REST API for distributed deployment

### 9.2 Data Serialization

**Format:** JSON

**Rationale:** Human-readable, widely supported

**Schema:** Defined in API Contract section

## 10. Error Handling

### 10.1 Database Errors

**Error Type:** Connection failure, query failure

**Handling:** COMP 401 routes to Supervisor agent

**Logging:** Logged by both INFS and COMP systems

### 10.2 Validation Errors

**Error Type:** Data validation failure

**Handling:** INFS 401 rejects data, COMP 401 routes to Supervisor

**Logging:** Logged by INFS validation engine

### 10.3 Permission Errors

**Error Type:** Access denied

**Handling:** COMP 401 respects denial, returns error

**Logging:** Logged by INFS RBAC system

## 11. Performance Considerations

### 11.1 Database Query Performance

**Target:** <50ms per query (INFS 401 responsibility)

**Optimization:** Indexes on frequently queried columns

**Monitoring:** Logged by INFS system

### 11.2 Orchestration Performance

**Target:** <100ms per routing decision (COMP 401 responsibility)

**Optimization:** O(1) routing algorithm

**Monitoring:** Logged by COMP system

### 11.3 End-to-End Performance

**Target:** <200ms for complete telemetry processing

**Breakdown:**
- Database query: <50ms
- Orchestration: <100ms
- Agent processing: <50ms

## 12. Security Considerations

### 12.1 Data Access Control

**Responsibility:** INFS 401 RBAC system

**COMP 401 Role:** Respect INFS permissions

**Audit:** Logged by INFS system

### 12.2 Data Integrity

**Responsibility:** INFS 401 validation engine

**COMP 401 Role:** Use only validated data

**Audit:** Logged by INFS system

### 12.3 Privacy Protection

**Responsibility:** INFS 401 privacy features

**COMP 401 Role:** Respect field-level restrictions

**Audit:** Logged by INFS system

## 13. Testing Strategy

### 13.1 Integration Testing

**Scope:** Test interaction between INFS and COMP systems

**Test Cases:**
- Data retrieval from INFS database
- Validation status checking
- Permission checking
- Error handling

**Responsibility:** Both INFS and COMP teams

### 13.2 Module-Specific Testing

**INFS 401 Testing:**
- Database schema validation
- Data validation testing
- RBAC testing
- Privacy feature testing

**COMP 401 Testing:**
- Routing algorithm testing
- Agent testing
- Self-healing testing
- State machine testing

## 14. Documentation Strategy

### 14.1 Separate Documentation

**INFS 401 Documentation:**
- INFS_SRS.md
- INFS_SDS.md
- INFS_Project_Proposal.md
- INFS_Literature_Review.md

**COMP 401 Documentation:**
- COMP_SRS.md
- COMP_SDS.md
- COMP_Project_Proposal.md
- COMP_Literature_Review.md

### 14.2 Shared Documentation

**Integration_Architecture.md:** This document

**Purpose:** Document integration points for completeness

**Assessment Note:** This document is not used for assessment in either module

## 15. Future Enhancements

### 15.1 Distributed Deployment

**Enhancement:** Deploy INFS and COMP on separate devices

**Impact:** Requires REST API implementation

**Timeline:** COMP 402 (Semester 2)

### 15.2 Advanced Integration

**Enhancement:** Event-driven architecture with message queues

**Impact:** Improved scalability and fault tolerance

**Timeline:** COMP 402 (Semester 2)

### 15.3 Enhanced Security

**Enhancement:** Mutual authentication between systems

**Impact:** Improved security for distributed deployment

**Timeline:** INFS 402 (Semester 2)

## 16. Conclusion

The integration architecture ensures that the INFS 401 and COMP 401 projects work together seamlessly while maintaining clear separation of concerns. The integration points are documented for completeness but are not used for assessment in either module, ensuring that each module is assessed solely on its specific learning outcomes.

The architecture provides a solid foundation for continued development and deployment in Botswana's agricultural sector, with clear paths for future enhancement in Semester 2.
