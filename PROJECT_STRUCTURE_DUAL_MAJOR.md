# Lesaka AI - Dual Major Project Structure
# INFS 401/402 + COMP 401/402 (Separate but Connected Projects)

## Overview
This document outlines the dual-project structure for the double major in Information Systems (INFS 401/402) and Computer Science (COMP 401/402). Each module has its own project with distinct deliverables, but the projects are strategically connected to demonstrate integration without double-dipping.

## Project Philosophy

### Key Principles
1. **Separate Deliverables**: Each module has its own distinct project, documentation, and assessment criteria
2. **Clear Boundaries**: INFS focuses on data governance; COMP focuses on algorithms
3. **Strategic Integration**: Projects connect at well-defined integration points
4. **No Double-Dipping**: Each project demonstrates unique capabilities for its module
5. **Complementary Value**: Each project enhances the other without overlapping

---

## INFS 401/402 Project: "Lesaka Data Governance Framework"

### Project Focus
**Information Systems Module - Data Governance & Privacy**

### Module Alignment
- **INFS 401 (Semester 1)**: Database design, normalization, data integrity
- **INFS 402 (Semester 2)**: Advanced RBAC, privacy-by-design, data encryption

### Project Scope

#### INFS 401 (Semester 1) - Data Governance Foundation
**Focus Areas:**
- Third Normal Form (3NF) database design
- Data integrity and anomaly prevention
- Database normalization proofs
- Data quality management
- Schema design and documentation

**Deliverables:**
- 3NF database schema design
- Normalization proofs (1NF, 2NF, 3NF)
- Data integrity constraints
- Database documentation
- Data quality validation system
- SRS (Software Requirements Specification) for data governance
- SDS (Software Design Specification) for database layer

**Technical Components:**
- SQLite database with 3NF schema
- Data validation engine
- Schema migration scripts
- Data quality scoring system
- Database backup and restore

#### INFS 402 (Semester 2) - Advanced Privacy & Security
**Focus Areas:**
- Role-Based Access Control (RBAC)
- Privacy-by-Design implementation
- Data encryption at rest
- Audit logging and compliance
- Advanced payload constraints

**Deliverables:**
- RBAC implementation with permission matrix
- Privacy-by-Design documentation
- Data encryption system
- Audit logging framework
- Advanced validation system (Pydantic)
- Security design document
- Compliance report

**Technical Components:**
- RBAC engine with fine-grained permissions
- Encryption module for sensitive data
- Audit logging system
- Advanced validation framework
- Privacy impact assessment

### Repository Structure (INFS)
```
LesakaAi_project/
├── INFS_Project/                    # INFS-specific deliverables
│   ├── database/
│   │   ├── schema_design.sql
│   │   ├── normalization_proofs.md
│   │   ├── migration_scripts/
│   │   └── data_quality/
│   ├── validation/
│   │   ├── data_validator.py
│   │   ├── quality_scorer.py
│   │   └── anomaly_detector.py
│   ├── rbac/
│   │   ├── permission_engine.py
│   │   ├── role_manager.py
│   │   └── audit_logger.py
│   ├── security/
│   │   ├── encryption.py
│   │   ├── privacy_controls.py
│   │   └── compliance_checker.py
│   ├── Documentation/
│   │   ├── INFS_SRS.md
│   │   ├── INFS_SDS.md
│   │   ├── Database_Design.md
│   │   ├── Normalization_Proofs.md
│   │   ├── RBAC_Design.md
│   │   ├── Privacy_Design.md
│   │   └── Security_Documentation.md
│   ├── Testing/
│   │   ├── database_tests/
│   │   ├── validation_tests/
│   │   ├── rbac_tests/
│   │   └── security_tests/
│   └── Dissertation_INFS/
│       ├── chapters/
│       │   ├── 01_introduction.tex
│       │   ├── 02_literature_review.tex
│       │   ├── 03_methodology.tex
│       │   ├── 04_database_design.tex
│       │   ├── 05_implementation.tex
│       │   ├── 06_testing.tex
│       │   ├── 07_results.tex
│       │   ├── 08_discussion.tex
│       │   └── 09_conclusion.tex
│       └── front_matter/
```

---

## COMP 401/402 Project: "Lesaka Multi-Agent Orchestration System"

### Project Focus
**Computer Science Module - Algorithmic Logic & Engineering**

### Module Alignment
- **COMP 401 (Semester 1)**: Algorithm design, multi-agent systems, graph orchestration
- **COMP 402 (Semester 2)**: Async processing, self-healing, thread safety, resilience

### Project Scope

#### COMP 401 (Semester 1) - Algorithmic Foundation
**Focus Areas:**
- Multi-agent system architecture
- Graph-based orchestration algorithms
- Agent specialization and routing
- Algorithm complexity analysis
- State machine design

**Deliverables:**
- Multi-agent system design
- Graph orchestration algorithm
- Agent specialization logic
- Algorithm complexity analysis
- State machine documentation
- SRS (Software Requirements Specification) for algorithmic system
- SDS (Software Design Specification) for orchestration layer

**Technical Components:**
- Multi-agent orchestrator
- Graph-based routing engine
- Agent implementations (Molemo, Loapi, Thekiso)
- State machine manager
- Algorithm performance analyzer

#### COMP 402 (Semester 2) - Advanced Resilience & Concurrency
**Focus Areas:**
- Asynchronous processing (async/await)
- Self-healing mechanisms
- Thread safety under load
- Circuit breaker patterns
- Resilience engineering

**Deliverables:**
- Async implementation with connection pools
- Self-healing framework
- Thread-safe concurrent processing
- Circuit breaker implementation
- Performance benchmarking suite
- Load testing results
- Resilience design document

**Technical Components:**
- Async graph orchestrator
- Self-healing engine with fallbacks
- Thread-safe data structures
- Circuit breaker for external APIs
- Performance monitoring system
- Load testing framework

### Repository Structure (COMP)
```
LesakaAi_project/
├── COMP_Project/                    # COMP-specific deliverables
│   ├── orchestrator/
│   │   ├── graph_orchestrator.py
│   │   ├── agent_manager.py
│   │   ├── routing_engine.py
│   │   └── state_machine.py
│   ├── agents/
│   │   ├── agent_molemo.py
│   │   ├── agent_loapi.py
│   │   ├── agent_thekiso.py
│   │   └── supervisor_agent.py
│   ├── async_engine/
│   │   ├── async_orchestrator.py
│   │   ├── connection_pool.py
│   │   └── concurrent_processor.py
│   ├── resilience/
│   │   ├── self_healing.py
│   │   ├── circuit_breaker.py
│   │   ├── retry_logic.py
│   │   └── health_checker.py
│   ├── threading/
│   │   ├── thread_safe_structures.py
│   │   ├── semaphore_manager.py
│   │   └── load_balancer.py
│   ├── Documentation/
│   │   ├── COMP_SRS.md
│   │   ├── COMP_SDS.md
│   │   ├── Algorithm_Design.md
│   │   ├── Graph_Orchestration.md
│   │   ├── Agent_Architecture.md
│   │   ├── Async_Design.md
│   │   ├── Resilience_Design.md
│   │   └── Thread_Safety_Documentation.md
│   ├── Testing/
│   │   ├── algorithm_tests/
│   │   ├── async_tests/
│   │   ├── resilience_tests/
│   │   ├── load_tests/
│   │   └── thread_safety_tests/
│   └── Dissertation_COMP/
│       ├── chapters/
│       │   ├── 01_introduction.tex
│       │   ├── 02_literature_review.tex
│       │   ├── 03_methodology.tex
│       │   ├── 04_algorithm_design.tex
│       │   ├── 05_implementation.tex
│       │   ├── 06_testing.tex
│       │   ├── 07_results.tex
│       │   ├── 08_discussion.tex
│       │   └── 09_conclusion.tex
│       └── front_matter/
```

---

## Integration Points (Where Projects Connect)

### Integration Point 1: Data Layer
**INFS Provides → COMP Consumes**
- INFS 3NF database schema
- INFS data validation engine
- INFS RBAC permission checks

**COMP Uses → For Orchestration**
- COMP agents read validated data from INFS database
- COMP routing respects INFS RBAC permissions
- COMP telemetry processing uses INFS-validated data

### Integration Point 2: API Layer
**INFS Provides → COMP Consumes**
- INFS secure API endpoints with RBAC
- INFS data access controls
- INFS audit logging

**COMP Uses → For Agent Communication**
- COMP agents call INFS APIs for data access
- COMP respects INFS permission constraints
- COMP operations logged by INFS audit system

### Integration Point 3: Application Layer
**Shared Component (Demonstrates Integration)**
- React frontend (shared between both projects)
- INFS: Data display, user management, privacy controls
- COMP: Agent recommendations, routing visualization, system status

### Integration Point 4: Documentation
**Shared Context (Demonstrates Connection)**
- Both projects reference each other in literature review
- Integration architecture documented in both dissertations
- Cross-referencing in technical documentation

---

## Assessment Strategy

### INFS 401/402 Assessment (100% INFS Focus)
**What INFS Demonstrates:**
- Database design expertise
- Normalization knowledge
- Data governance understanding
- Privacy-by-Design implementation
- RBAC system design
- Security engineering

**No COMP Content in INFS Assessment:**
- No algorithm complexity analysis
- No multi-agent system details
- No async processing implementation
- No thread safety mechanisms

### COMP 401/402 Assessment (100% COMP Focus)
**What COMP Demonstrates:**
- Algorithm design skills
- Multi-agent system architecture
- Graph orchestration logic
- Async programming expertise
- Self-healing mechanisms
- Thread safety implementation

**No INFS Content in COMP Assessment:**
- No database normalization proofs
- No RBAC permission matrix details
- No encryption implementation
- No audit logging system

### Integration Demonstration (Separate from Assessments)
**How Integration is Shown:**
- Architecture diagram showing both systems
- API documentation showing cross-module calls
- Integration testing results
- Shared frontend demonstration
- Cross-referencing in dissertations

---

## Deliverable Mapping

### INFS 401/402 Deliverables
| Semester | Module | Deliverable | Focus |
|----------|--------|-------------|-------|
| Sem 1 | INFS 401 | Project Proposal | Data governance focus |
| Sem 1 | INFS 401 | Literature Review | Database, privacy, RBAC papers |
| Sem 1 | INFS 401 | Requirements | Data requirements, constraints |
| Sem 1 | INFS 401 | Analysis | ERD, data flow, use cases |
| Sem 1 | INFS 401 | Design | Database design, schema |
| Sem 1 | INFS 401 | Prototype | Database prototype, validation UI |
| Sem 1 | INFS 401 | Preliminary Dissertation | Data governance chapters |
| Sem 2 | INFS 402 | Implementation | RBAC, encryption, audit |
| Sem 2 | INFS 402 | Testing | Security tests, validation tests |
| Sem 2 | INFS 402 | Final Dissertation | Complete INFS dissertation |
| Sem 2 | INFS 402 | Presentation | INFS-focused presentation |
| Sem 2 | INFS 402 | Poster | Data governance poster |
| Sem 2 | INFS 402 | Viva | INFS questions |

### COMP 401/402 Deliverables
| Semester | Module | Deliverable | Focus |
|----------|--------|-------------|-------|
| Sem 1 | COMP 401 | Project Proposal | Algorithmic focus |
| Sem 1 | COMP 401 | Literature Review | MAS, algorithms, async papers |
| Sem 1 | COMP 401 | Requirements | Algorithmic requirements |
| Sem 1 | COMP 401 | Analysis | Sequence diagrams, state machines |
| Sem 1 | COMP 401 | Design | Algorithm design, agent architecture |
| Sem 1 | COMP 401 | Prototype | Agent prototype, routing UI |
| Sem 1 | COMP 401 | Preliminary Dissertation | Algorithmic chapters |
| Sem 2 | COMP 402 | Implementation | Async, self-healing, threading |
| Sem 2 | COMP 402 | Testing | Load tests, thread safety tests |
| Sem 2 | COMP 402 | Final Dissertation | Complete COMP dissertation |
| Sem 2 | COMP 402 | Presentation | COMP-focused presentation |
| Sem 2 | COMP 402 | Poster | Algorithmic poster |
| Sem 2 | COMP 402 | Viva | COMP questions |

---

## Anti-Double-Dipping Strategy

### Clear Separation
1. **Separate Codebases**: INFS and COMP have distinct folders
2. **Separate Documentation**: Each project has its own docs
3. **Separate Dissertations**: Two distinct LaTeX dissertations
4. **Separate Presentations**: Module-specific presentations
5. **Separate Posters**: Module-specific posters

### Integration Without Double-Dipping
1. **Architecture Diagrams**: Show both systems but assess separately
2. **API Documentation**: Document integration but assess separately
3. **Shared Frontend**: Shared UI but different features assessed
4. **Cross-References**: Reference each other but distinct content

### Assessment Evidence
1. **Git Commits**: Separate branches for INFS and COMP
2. **Code Reviews**: Separate review processes
3. **Testing**: Separate test suites
4. **Documentation**: Distinct document sets

---

## Next Steps

1. **Restructure Repository**: Create INFS_Project and COMP_Project folders
2. **Move Existing Code**: Organize code into appropriate project folders
3. **Create INFS-Specific Documentation**: Focus on data governance
4. **Create COMP-Specific Documentation**: Focus on algorithms
5. **Define Integration Contracts**: Clear API contracts between projects
6. **Update Semester Plans**: Reflect dual-project approach
7. **Create Separate Dissertations**: Two distinct LaTeX templates
