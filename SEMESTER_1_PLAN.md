# Lesaka AI - Semester 1 Excellence Plan (Dual Major)
# INFS 401 (Data Governance) + COMP 401 (Algorithmic Logic)

## Overview
This document outlines the comprehensive plan for Semester 1 for a double major in Information Systems (INFS 401) and Computer Science (COMP 401). These are two separate 4-credit modules with distinct projects that strategically connect without double-dipping.

## Project Structure

### INFS 401 Project: "Lesaka Data Governance Framework"
**Separate Project with INFS-Specific Deliverables**
- Focus: Database design, normalization, data integrity
- Repository: INFS_Project/ folder
- Dissertation: Dissertation_INFS/
- Assessment: 100% INFS focus (no COMP content)

### COMP 401 Project: "Lesaka Multi-Agent Orchestration System"
**Separate Project with COMP-Specific Deliverables**
- Focus: Algorithm design, multi-agent systems, graph orchestration
- Repository: COMP_Project/ folder
- Dissertation: Dissertation_COMP/
- Assessment: 100% COMP focus (no INFS content)

### Integration Strategy
Projects connect at well-defined integration points:
- INFS provides validated data → COMP consumes for orchestration
- INFS provides secure APIs → COMP respects RBAC permissions
- Shared frontend demonstrates integration without double-dipping
- Cross-referencing in documentation shows connection

---

## Phase 1: Project Proposals (Week 1-2)

### 1.1 INFS 401 Project Proposal
**Title:** Lesaka Data Governance Framework: 3NF Database Design and Privacy Protection for Agricultural IoT

**INFS-Specific Focus:**
- Database design and normalization
- Data integrity and quality management
- Privacy-by-Design principles
- Data governance framework

**INFS Objectives:**
1. Design and implement a 3NF database schema for livestock telemetry data
2. Develop data validation and quality scoring mechanisms
3. Implement role-based access control for privacy protection
4. Create data governance documentation and compliance framework
5. Validate database integrity through comprehensive testing

**INFS Scope:**
- In-scope: 3NF database, data validation, RBAC, privacy controls
- Out-of-scope: Multi-agent systems, algorithm design, async processing

**INFS Technologies:**
- Python 3.10+, SQLite, Pydantic, Flask (API layer only)

### 1.2 COMP 401 Project Proposal
**Title:** Lesaka Multi-Agent Orchestration System: Graph-Based Routing for Agricultural Telemetry

**COMP-Specific Focus:**
- Multi-agent system architecture
- Graph-based orchestration algorithms
- Agent specialization and routing
- Algorithm complexity analysis

**COMP Objectives:**
1. Design and implement a multi-agent orchestration system
2. Develop graph-based routing algorithms for telemetry data
3. Implement specialized agents (Molemo, Loapi, Thekiso)
4. Analyze algorithm complexity and performance
5. Validate orchestration logic through comprehensive testing

**COMP Scope:**
- In-scope: Multi-agent system, graph orchestration, agent algorithms
- Out-of-scope: Database design, normalization, RBAC implementation

**COMP Technologies:**
- Python 3.10+, NetworkX (graph library), Flask (API layer only)

### 1.3 Integration Proposal (Shared)
**How Projects Connect:**
- INFS provides validated data → COMP consumes for orchestration
- INFS provides secure APIs → COMP respects permissions
- Shared frontend demonstrates integration
- Cross-referencing in documentation

### 1.4 Deliverables
- [ ] INFS 401 Project Proposal (2000-3000 words) - Data governance focus
- [ ] COMP 401 Project Proposal (2000-3000 words) - Algorithmic focus
- [ ] Integration Architecture Document (shared)
- [ ] Gantt chart timeline (both projects)
- [ ] Technology justification (separate for each project)

---

## Phase 2: Literature Reviews (Week 3-4)

### 2.1 INFS 401 Literature Review
**INFS-Specific Focus Areas:**
- Database normalization and design
- Data integrity and quality management
- Privacy-by-Design principles
- Role-Based Access Control (RBAC)
- Data governance frameworks

**INFS Paper Categories (20-25 papers):**
- Database normalization (5-7 papers)
- Data integrity in IoT (5-7 papers)
- Privacy-by-Design (5-7 papers)
- RBAC implementations (3-4 papers)
- Agricultural data governance (2-3 papers)

### 2.2 COMP 401 Literature Review
**COMP-Specific Focus Areas:**
- Multi-agent system architectures
- Graph-based orchestration algorithms
- Agent specialization and routing
- Algorithm complexity analysis
- State machine design

**COMP Paper Categories (20-25 papers):**
- Multi-agent systems (6-8 papers)
- Graph algorithms (5-7 papers)
- Agent routing (4-5 papers)
- Algorithm complexity (3-4 papers)
- Agricultural MAS (2-3 papers)

### 2.3 Shared Context Papers (2-3 papers)
- IoT in agriculture (both projects reference)
- Botswana agricultural context (both projects reference)

### 2.4 Deliverables
- [ ] INFS 401 Literature Review (3000-4000 words) - Data governance focus
- [ ] COMP 401 Literature Review (3000-4000 words) - Algorithmic focus
- [ ] INFS Annotated Bibliography (20-25 papers)
- [ ] COMP Annotated Bibliography (20-25 papers)
- [ ] INFS Comparison Tables (database systems)
- [ ] COMP Comparison Tables (MAS systems)
- [ ] References in APA 7th edition format (separate for each)

---

## Phase 3: Requirements (Week 5-6)

### 3.1 INFS 401 Requirements
**INFS Functional Requirements:**
- [ ] INFR-001: Database schema design with 3NF compliance
- [ ] INFR-002: Data validation and quality scoring
- [ ] INFR-003: User registration with anonymized IDs
- [ ] INFR-004: Role-based access control implementation
- [ ] INFR-005: Data integrity constraints
- [ ] INFR-006: Audit logging for data access

**INFS Non-Functional Requirements:**
- [ ] INNFR-001: Database performance (<50ms query time)
- [ ] INNFR-002: Data consistency guarantee
- [ ] INNFR-003: Privacy protection compliance
- [ ] INNFR-004: Data quality threshold (95%+ valid)

**INFS Business Rules:**
- [ ] INBR-001: All data must pass 3NF validation
- [ ] INBR-002: Broker role cannot access sensitive fields
- [ ] INBR-003: All data access must be logged
- [ ] INBR-004: Data quality must meet minimum thresholds

### 3.2 COMP 401 Requirements
**COMP Functional Requirements:**
- [ ] CFR-001: Multi-agent system architecture
- [ ] CFR-002: Graph-based routing algorithm
- [ ] CFR-003: Agent Molemo (fever detection)
- [ ] CFR-004: Agent Loapi (environmental analysis)
- [ ] CFR-005: Agent Thekiso (market assessment)
- [ ] CFR-006: Supervisor agent (fallback)

**COMP Non-Functional Requirements:**
- [ ] CNFR-001: Routing latency (<100ms)
- [ ] CNFR-002: Algorithm efficiency (O(n) or better)
- [ ] CNFR-003: Agent specialization accuracy (95%+)
- [ ] CNFR-004: State machine reliability

**COMP Business Rules:**
- [ ] CBR-001: Temperature >39.5°C routes to Molemo
- [ ] CBR-002: Temperature <36.0°C routes to Loapi
- [ ] CBR-003: Normal range routes to Thekiso
- [ ] CBR-004: Errors route to Supervisor

### 3.3 Integration Requirements (Shared)
- [ ] IR-001: COMP consumes INFS-validated data
- [ ] IR-002: COMP respects INFS RBAC permissions
- [ ] IR-003: Shared API contract between projects
- [ ] IR-004: Common data format for exchange

### 3.4 Deliverables
- [ ] INFS 401 SRS (Software Requirements Specification) - Data governance focus
- [ ] COMP 401 SRS (Software Requirements Specification) - Algorithmic focus
- [ ] Integration Requirements Document (shared)
- [ ] INFS Use Cases (data-focused)
- [ ] COMP Use Cases (algorithm-focused)

---

## Phase 4: Analysis (Week 7-8)

### 4.1 INFS 401 Analysis
**INFS UML Diagrams:**
- [ ] INFS Use Case Diagram (data-focused use cases)
- [ ] INFS Activity Diagram (data validation workflows)
- [ ] INFS Sequence Diagram (database operations)
- [ ] INFS Class Diagram (database entities)
- [ ] INFS ERD (Entity Relationship Diagram - 3NF schema)
- [ ] INFS Context Diagram (data governance context)
- [ ] INFS DFD (Data Flow Diagram - data flows)

**INFS Data Analysis:**
- [ ] Data volume estimation
- [ ] Data quality requirements
- [ ] Data retention policies
- [ ] Privacy impact analysis

### 4.2 COMP 401 Analysis
**COMP UML Diagrams:**
- [ ] COMP Use Case Diagram (agent-focused use cases)
- [ ] COMP Activity Diagram (agent routing workflows)
- [ ] COMP Sequence Diagram (agent orchestration)
- [ ] COMP Class Diagram (agent classes)
- [ ] COMP State Diagram (state machine)
- [ ] COMP Context Diagram (orchestration context)
- [ ] COMP Component Diagram (agent components)

**COMP Algorithm Analysis:**
- [ ] Algorithm complexity analysis
- [ ] Routing efficiency analysis
- [ ] Agent specialization analysis
- [ ] State machine analysis

### 4.3 Integration Analysis (Shared)
- [ ] Integration Architecture Diagram
- [ ] API Contract Diagram
- [ ] Data Exchange Diagram
- [ ] Security Boundary Diagram

### 4.4 Deliverables
- [ ] INFS 401 Analysis Document (7 UML diagrams + data analysis)
- [ ] COMP 401 Analysis Document (7 UML diagrams + algorithm analysis)
- [ ] Integration Analysis Document (shared diagrams)
- [ ] Updated INFS SRS with analysis findings
- [ ] Updated COMP SRS with analysis findings

---

## Phase 5: Design (Week 9-10)

### 5.1 INFS 401 Design
**INFS Database Design:**
- [ ] 3NF schema design (farmers, cattle, telemetry_logs)
- [ ] Normalization proofs (1NF, 2NF, 3NF)
- [ ] Index design for performance
- [ ] Foreign key constraints
- [ ] Data integrity rules

**INFS Data Validation Design:**
- [ ] Validation engine architecture
- [ ] Quality scoring algorithm
- [ ] Anomaly detection logic
- [ ] Data reconciliation design

**INFS RBAC Design:**
- [ ] Role hierarchy design
- [ ] Permission matrix
- [ ] Access control policies
- [ ] Audit logging design

**INFS Security Design:**
- [ ] Encryption strategy
- [ ] Privacy controls design
- [ ] Compliance framework
- [ ] Data retention policies

### 5.2 COMP 401 Design
**COMP Multi-Agent Design:**
- [ ] Agent architecture (Molemo, Loapi, Thekiso, Supervisor)
- [ ] Agent specialization logic
- [ ] Agent communication protocols
- [ ] Agent state management

**COMP Graph Orchestration Design:**
- [ ] Directed Cyclic Graph design
- [ ] Routing algorithm design
- [ ] Node and edge definitions
- [ ] State machine design

**COMP Algorithm Design:**
- [ ] Routing algorithm (complexity analysis)
- [ ] Agent selection algorithm
- [ ] Fallback algorithm
- [ ] Performance optimization

**COMP Integration Design:**
- [ ] API contract with INFS
- [ ] Data consumption design
- [ ] Permission respect design
- [ ] Error handling design

### 5.3 Integration Design (Shared)
- [ ] Integration architecture
- [ ] API contract specification
- [ ] Data exchange format
- [ ] Security boundary design

### 5.4 Deliverables
- [ ] INFS 401 SDS (Software Design Specification) - Data governance focus
- [ ] COMP 401 SDS (Software Design Specification) - Algorithmic focus
- [ ] INFS Database Design Document (with normalization proofs)
- [ ] COMP Algorithm Design Document (with complexity analysis)
- [ ] Integration Design Document (shared)

---

## Phase 6: Prototypes (Week 11-12)

### 6.1 INFS 401 Prototype
**INFS UI Prototyping:**
- [ ] Data validation UI prototype
- [ ] RBAC management UI prototype
- [ ] Database management UI prototype
- [ ] Privacy controls UI prototype

**INFS Wireframes:**
- [ ] Database schema visualization
- [ ] Data validation workflow
- [ ] User role management flow
- [ ] Privacy settings interface

### 6.2 COMP 401 Prototype
**COMP UI Prototyping:**
- [ ] Agent orchestration UI prototype
- [ ] Routing visualization prototype
- [ ] Agent status dashboard prototype
- [ ] State machine visualization

**COMP Wireframes:**
- [ ] Agent routing flow
- [ ] Graph visualization
- [ ] Agent communication diagram
- [ ] State transition diagram

### 6.3 Integration Prototype (Shared)
- [ ] Shared frontend prototype
- [ ] Integration dashboard
- [ ] Cross-module data flow visualization
- [ ] API interaction prototype

### 6.4 Deliverables
- [ ] INFS 401 Prototype Document (data governance UI)
- [ ] COMP 401 Prototype Document (algorithmic UI)
- [ ] Integration Prototype Document (shared UI)
- [ ] Wireframes for both projects
- [ ] Figma design files (shared frontend)

---

## Phase 7: Preliminary Dissertations (Week 13-14)

### 7.1 INFS 401 Preliminary Dissertation
**INFS Dissertation Structure:**
- [ ] Cover Page (INFS 401 title)
- [ ] Declaration
- [ ] Abstract (data governance focus)
- [ ] Acknowledgements
- [ ] Table of Contents

**INFS Chapter Content:**
- [ ] Chapter 1: Introduction (data governance context)
- [ ] Chapter 2: Literature Review (database, privacy, RBAC papers)
- [ ] Chapter 3: Methodology (data governance methodology)
- [ ] Chapter 4: Analysis (data requirements, ERD, data flow)
- [ ] Chapter 5: Design (database design, validation design, RBAC design)
- [ ] Chapter 6: Progress (INFS implementation progress)
- [ ] Chapter 7: Challenges (data governance challenges)
- [ ] Chapter 8: Future Work (INFS Semester 2 plans)
- [ ] References (INFS-specific bibliography)

### 7.2 COMP 401 Preliminary Dissertation
**COMP Dissertation Structure:**
- [ ] Cover Page (COMP 401 title)
- [ ] Declaration
- [ ] Abstract (algorithmic focus)
- [ ] Acknowledgements
- [ ] Table of Contents

**COMP Chapter Content:**
- [ ] Chapter 1: Introduction (algorithmic context)
- [ ] Chapter 2: Literature Review (MAS, algorithms, graph papers)
- [ ] Chapter 3: Methodology (algorithmic methodology)
- [ ] Chapter 4: Analysis (algorithmic requirements, state diagrams, component diagrams)
- [ ] Chapter 5: Design (agent design, graph design, algorithm design)
- [ ] Chapter 6: Progress (COMP implementation progress)
- [ ] Chapter 7: Challenges (algorithmic challenges)
- [ ] Chapter 8: Future Work (COMP Semester 2 plans)
- [ ] References (COMP-specific bibliography)

### 7.3 Integration Documention (Shared)
- [ ] Integration Architecture Document
- [ ] Cross-referencing between dissertations
- [ ] Shared context in both introductions

### 7.4 Deliverables
- [ ] INFS 401 Preliminary Dissertation (LaTeX) - Data governance focus
- [ ] COMP 401 Preliminary Dissertation (LaTeX) - Algorithmic focus
- [ ] Integration Documentation (shared)
- [ ] Both dissertations ready for supervisor review

---

## Assessment Criteria Alignment

### INFS 401 (Semester 1) - 100% INFS Focus
**Data Governance Assessment:**
- [ ] Complete 3NF schema design with normalization proofs
- [ ] Data integrity and quality management system
- [ ] RBAC implementation with permission matrix
- [ ] Privacy-by-Design documentation
- [ ] Database performance and optimization

**No COMP Content in INFS Assessment:**
- No multi-agent system details
- No graph orchestration algorithms
- No agent specialization logic
- No state machine design

### COMP 401 (Semester 1) - 100% COMP Focus
**Algorithmic Assessment:**
- [ ] Multi-agent system architecture design
- [ ] Graph-based routing algorithm with complexity analysis
- [ ] Agent specialization and communication protocols
- [ ] State machine design and documentation
- [ ] Algorithm performance analysis

**No INFS Content in COMP Assessment:**
- No database normalization proofs
- No RBAC permission matrix details
- No data validation engine details
- No privacy controls implementation

---

## Success Metrics

### INFS 401 Success Metrics
- [ ] Complete 3NF database schema with normalization proofs
- [ ] 7 INFS UML diagrams completed
- [ ] 20-25 INFS literature review papers
- [ ] INFS SRS document (comprehensive)
- [ ] INFS SDS document (comprehensive)
- [ ] INFS preliminary dissertation (all chapters)

### COMP 401 Success Metrics
- [ ] Complete multi-agent system design
- [ ] 7 COMP UML diagrams completed
- [ ] 20-25 COMP literature review papers
- [ ] COMP SRS document (comprehensive)
- [ ] COMP SDS document (comprehensive)
- [ ] COMP preliminary dissertation (all chapters)

### Integration Success Metrics
- [ ] Integration architecture documented
- [ ] API contract defined
- [ ] Shared frontend prototype created
- [ ] Cross-referencing in both dissertations

---

## Timeline Summary

| Phase | Duration | INFS 401 Deliverables | COMP 401 Deliverables | Shared |
|-------|----------|----------------------|----------------------|--------|
| Phase 1 | Week 1-2 | INFS Project Proposal | COMP Project Proposal | Integration Architecture |
| Phase 2 | Week 3-4 | INFS Literature Review | COMP Literature Review | Context Papers |
| Phase 3 | Week 5-6 | INFS SRS | COMP SRS | Integration Requirements |
| Phase 4 | Week 7-8 | INFS Analysis (7 UML) | COMP Analysis (7 UML) | Integration Analysis |
| Phase 5 | Week 9-10 | INFS SDS | COMP SDS | Integration Design |
| Phase 6 | Week 11-12 | INFS Prototype | COMP Prototype | Shared Frontend |
| Phase 7 | Week 13-14 | INFS Dissertation | COMP Dissertation | Cross-referencing |

---

## Resources Needed

### Academic Resources
- [ ] Access to IEEE Xplore, ACM Digital Library
- [ ] Google Scholar access
- [ ] Library resources
- [ ] Supervisor guidance

### Development Tools
- [ ] LaTeX editor (Overleaf or local)
- [ ] UML diagramming tool (Draw.io, Lucidchart)
- [ ] Figma account
- [ ] Git/GitHub

### Documentation Tools
- [ ] Reference management (Zotero, Mendeley)
- [ ] Document templates
- [ ] Citation management

---

## Risk Mitigation

### Academic Risks
- **Risk:** Literature review scope too broad
  - **Mitigation:** Focus on specific domains, use inclusion criteria
- **Risk:** UML diagram complexity
  - **Mitigation:** Start with simple diagrams, iterate
- **Risk:** Dissertation timeline pressure
  - **Mitigation:** Start writing early, maintain consistent progress

### Technical Risks
- **Risk:** Design changes during implementation
  - **Mitigation:** Thorough analysis phase, freeze design before implementation
- **Risk:** Technology learning curve
  - **Mitigation:** Allocate time for learning, use tutorials

---

## Conclusion

This Semester 1 plan provides a structured approach to completing INFS 401 and COMP 401 requirements as separate but connected projects. The plan ensures:

- **Clear Separation**: Each module has distinct deliverables and assessment focus
- **Strategic Integration**: Projects connect at well-defined integration points
- **No Double-Dipping**: Each project demonstrates unique capabilities
- **Comprehensive Coverage**: Both modules receive full attention

**Key to Success:** Consistent weekly progress on both projects, clear documentation of separation, strategic integration planning, and regular supervisor feedback for both modules.

---

## Next Steps

1. Create INFS_Project/ and COMP_Project/ folder structures
2. Start INFS 401 Project Proposal (data governance focus)
3. Start COMP 401 Project Proposal (algorithmic focus)
4. Schedule supervisor meetings for both proposals
5. Begin literature searches for both modules
6. Set up development tools and documentation templates for both projects
