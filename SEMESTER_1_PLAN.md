# Lesaka AI - Semester 1 Excellence Plan (INFS 401 + COMP 401)

## Overview
This document outlines the comprehensive plan for Semester 1, covering INFS 401 (Information Systems) and COMP 401 (Computer Science) requirements. The plan follows the official COMP401 module structure with 7 phases.

## Module Alignment

### INFS 401 (Information Systems - Semester 1)
**Focus:** Data Governance & Storage
- Third Normal Form (3NF) database validation
- Data integrity and anomaly prevention
- Database design and normalization

### COMP 401 (Computer Science - Semester 1)
**Focus:** Algorithmic Logic & Engineering
- Multi-agent graph orchestration
- Agent-based routing systems
- Algorithmic design and implementation

---

## Phase 1: Project Proposal (Week 1-2)

### 1.1 Proposal Document
- [ ] Write project title and background
- [ ] Define problem statement clearly
- [ ] Articulate motivation for the project
- [ ] State primary aim
- [ ] List specific objectives (5-7 objectives)
- [ ] Define project scope (in-scope and out-of-scope)
- [ ] List technologies to be used
- [ ] Identify potential risks
- [ ] Create timeline/Gantt chart

### 1.2 Proposal Content Structure
**Title:** Lesaka AI: Autonomous Telemetry & Governance Framework for Botswana's Agricultural Sector

**Background:**
- Botswana's agricultural sector importance
- Current challenges in livestock management
- IoT opportunities in agriculture
- Gap in existing solutions

**Problem:**
- Lack of real-time health monitoring
- Delayed disease detection
- Poor data governance
- Limited decision support

**Motivation:**
- Economic impact of livestock losses
- Food security concerns
- Technology adoption potential
- Academic contribution

**Aim:**
Develop an autonomous telemetry and governance framework for livestock management in Botswana.

**Objectives:**
1. Design and implement a 3NF database schema for livestock telemetry data
2. Develop a multi-agent orchestration system for autonomous diagnostic routing
3. Implement role-based access control mechanisms for privacy protection
4. Create a user-friendly web interface for data visualization and management
5. Validate the system through comprehensive testing and evaluation
6. Document the system according to academic standards
7. Prepare for live demonstration and viva voce

**Scope:**
- In-scope: 3NF database, multi-agent system, RBAC, web interface, testing
- Out-of-scope: Hardware sensors, mobile app, ML models, blockchain

**Technologies:**
- Python 3.10+, Flask, SQLite, React 18+, Vite, Tailwind CSS

**Risks:**
- Technical: Database performance, integration complexity
- Project: Time constraints, limited testing environments
- Academic: Scope creep, documentation quality

### 1.3 Deliverables
- [ ] Project proposal document (2000-3000 words)
- [ ] Gantt chart timeline
- [ ] Technology justification document
- [ ] Risk assessment matrix

---

## Phase 2: Literature Review (Week 3-4)

### 2.1 Literature Search
- [ ] Search academic databases (IEEE Xplore, ACM Digital Library, Google Scholar)
- [ ] Find 20-40 relevant papers
- [ ] Focus on: IoT in agriculture, livestock monitoring, data governance, multi-agent systems
- [ ] Include recent papers (2018-2026)

### 2.2 Paper Categories
**IoT in Agriculture (8-10 papers):**
- Smart farming systems
- Livestock monitoring
- Sensor networks in agriculture
- Edge computing in agriculture

**Data Governance (5-7 papers):**
- Database normalization
- Privacy-by-design principles
- RBAC implementations
- Data integrity in IoT

**Multi-Agent Systems (5-7 papers):**
- Agent architectures
- Graph-based orchestration
- Self-healing systems
- Distributed decision-making

**Botswana Context (2-4 papers):**
- Agricultural challenges in Botswana
- Technology adoption in developing regions
- Rural connectivity issues

### 2.3 Comparison Tables
- [ ] Create table comparing existing livestock monitoring systems
- [ ] Compare features: 3NF, RBAC, multi-agent, self-healing
- [ ] Identify gaps in current solutions
- [ ] Highlight Lesaka AI advantages

### 2.4 Research Gaps
- [ ] Identify what's missing in existing literature
- [ ] Define how Lesaka AI addresses these gaps
- [ ] Justify the novelty of the approach

### 2.5 Deliverables
- [ ] Literature review document (3000-4000 words)
- [ ] Annotated bibliography (20-40 papers)
- [ ] Comparison tables
- [ ] Research gaps analysis
- [ ] References in APA 7th edition format

---

## Phase 3: Requirements (Week 5-6)

### 3.1 Functional Requirements
**User Management (FR-001 to FR-004):**
- [ ] FR-001: User registration with personal details
- [ ] FR-002: Anonymized owner ID generation
- [ ] FR-003: Multiple user roles support
- [ ] FR-004: Role-based access control

**Cattle Management (FR-005 to FR-008):**
- [ ] FR-005: Cattle registration
- [ ] FR-006: Cattle information storage
- [ ] FR-007: Cattle list viewing
- [ ] FR-008: Cattle search and filtering

**Telemetry Management (FR-009 to FR-012):**
- [ ] FR-009: Telemetry data ingestion
- [ ] FR-010: Temperature validation (30.0-45.0°C)
- [ ] FR-011: Validated data storage
- [ ] FR-012: Telemetry history access

**Agent Orchestration (FR-013 to FR-016):**
- [ ] FR-013: Telemetry routing to agents
- [ ] FR-014: Agent Molemo implementation
- [ ] FR-015: Agent Loapi implementation
- [ ] FR-016: Agent Thekiso implementation

### 3.2 Non-Functional Requirements
**Performance (NFR-001 to NFR-003):**
- [ ] NFR-001: API response <200ms (p95)
- [ ] NFR-002: Support 1000 concurrent users
- [ ] NFR-003: Handle 10,000 telemetry records/day

**Security (NFR-004 to NFR-006):**
- [ ] NFR-004: Data encryption at rest
- [ ] NFR-005: Secure authentication
- [ ] NFR-006: Audit logging

**Reliability (NFR-007 to NFR-009):**
- [ ] NFR-007: 99.9% uptime
- [ ] NFR-008: Self-healing mechanisms
- [ ] NFR-009: 30-second failure recovery

**Usability (NFR-010 to NFR-012):**
- [ ] NFR-010: Intuitive web interface
- [ ] NFR-011: Mobile device support
- [ ] NFR-012: Clear error messages

### 3.3 Business Rules
- [ ] BR-001: Only registered farmers can register cattle
- [ ] BR-002: Temperature range validation
- [ ] BR-003: Broker GPS access restriction
- [ ] BR-004: Botswana district validation
- [ ] BR-005: Unique cattle ID requirement

### 3.4 Assumptions
- [ ] Users have basic computer literacy
- [ ] Internet connectivity available (may be intermittent)
- [ ] Sensors provide data in expected format
- [ ] Farmers register with accurate information

### 3.5 Constraints
**Technical Constraints:**
- [ ] Standard hardware only
- [ ] SQLite database required
- [ ] React frontend required
- [ ] Python backend required

**Time Constraints:**
- [ ] Academic semester timeline
- [ ] Testing before submission
- [ ] Documentation finalization

**Resource Constraints:**
- [ ] Single developer
- [ ] Limited real-world testing
- [ ] Budget constraints

### 3.6 Use Cases
- [ ] Use Case 1: Farmer Registration
- [ ] Use Case 2: Telemetry Ingestion
- [ ] Use Case 3: Cattle Health Monitoring
- [ ] Use Case 4: RBAC Enforcement
- [ ] Use Case 5: Agent Routing

### 3.7 Deliverables
- [ ] Software Requirements Specification (SRS)
- [ ] Functional requirements document
- [ ] Non-functional requirements document
- [ ] Business rules document
- [ ] Use case diagrams and descriptions

---

## Phase 4: Analysis (Week 7-8)

### 4.1 UML Diagrams

**Use Case Diagram:**
- [ ] Identify actors (Farmer, Veterinarian, Broker, Admin, Sensor)
- [ ] Define use cases for each actor
- [ ] Show relationships between actors and use cases
- [ ] Include include/extend relationships

**Activity Diagram:**
- [ ] Farmer registration workflow
- [ ] Telemetry ingestion workflow
- [ ] Agent routing workflow
- [ ] Cattle health monitoring workflow

**Sequence Diagram:**
- [ ] Farmer registration sequence
- [ ] Telemetry ingestion sequence
- [ ] Agent orchestration sequence
- [ ] RBAC enforcement sequence

**Class Diagram:**
- [ ] Database entity classes
- [ ] Business logic classes
- [ ] API controller classes
- [ ] Frontend component classes

**ERD (Entity Relationship Diagram):**
- [ ] Farmers table
- [ ] Cattle table
- [ ] Telemetry logs table
- [ ] Relationships and cardinalities

**Context Diagram:**
- [ ] System boundary
- [ ] External entities
- [ ] Data flows
- [ ] System interactions

**DFD (Data Flow Diagram):**
- [ ] Level 0 DFD (context)
- [ ] Level 1 DFD (major processes)
- [ ] Level 2 DFD (detailed processes)

**Deployment Diagram:**
- [ ] Hardware components
- [ ] Software components
- [ ] Network connections
- [ ] Deployment architecture

### 4.2 Data Analysis
- [ ] Data volume estimation
- [ ] Data flow analysis
- [ ] Data storage requirements
- [ ] Data retention policies

### 4.3 Deliverables
- [ ] Complete UML diagram set (8 diagrams)
- [ ] Data analysis document
- [ ] System analysis report
- [ ] Updated SRS with analysis findings

---

## Phase 5: Design (Week 9-10)

### 5.1 System Architecture
- [ ] High-level architecture design
- [ ] Three-tier architecture (Presentation, Application, Data)
- [ ] Component architecture
- [ ] Technology stack justification

### 5.2 Database Design
**Schema Design:**
- [ ] Farmers table (3NF compliant)
- [ ] Cattle table (3NF compliant)
- [ ] Telemetry logs table (3NF compliant)
- [ ] Additional tables if needed

**3NF Compliance:**
- [ ] Verify First Normal Form (atomic values)
- [ ] Verify Second Normal Form (no partial dependencies)
- [ ] Verify Third Normal Form (no transitive dependencies)

**Indexes and Constraints:**
- [ ] Primary keys
- [ ] Foreign keys
- [ ] Unique constraints
- [ ] Indexes for performance

### 5.3 API Design
**RESTful Endpoints:**
- [ ] GET / (dashboard)
- [ ] POST /api/register_farmer
- [ ] POST /api/ingest_telemetry
- [ ] GET /api/cattle_list/<owner_id>
- [ ] GET /api/telemetry_history/<cattle_id>

**Data Validation:**
- [ ] Temperature range validation
- [ ] District validation
- [ ] Required field validation
- [ ] Data type validation

### 5.4 Multi-Agent System Design
**Agent Architecture:**
- [ ] Agent Molemo (biomedical analysis)
- [ ] Agent Loapi (environmental analysis)
- [ ] Agent Thekiso (market assessment)
- [ ] Supervisor node (fallback)

**Graph-Based Orchestration:**
- [ ] Directed Cyclic Graph design
- [ ] Node definitions
- [ ] Edge definitions
- [ ] Routing logic

**Self-Healing Design:**
- [ ] Exception handling strategy
- [ ] Fallback mechanisms
- [ ] State cleanup
- [ ] Recovery procedures

### 5.5 Security Design
**Authentication:**
- [ ] Session-based authentication
- [ ] Token generation
- [ ] Session timeout

**Authorization:**
- [ ] Role definitions (admin, farmer, broker)
- [ ] Permission matrix
- [ ] Access control at endpoint level
- [ ] Field-level restrictions

**Privacy Protection:**
- [ ] Anonymized owner IDs
- [ ] Data separation
- [ ] Audit logging
- [ ] Secure storage

### 5.6 Frontend Design
**Component Architecture:**
- [ ] Header component
- [ ] Dashboard component
- [ ] Cattle List component
- [ ] Billing component
- [ ] Live Map component

**State Management:**
- [ ] Local state (useState)
- [ ] API integration
- [ ] Error handling
- [ ] Loading states

**Responsive Design:**
- [ ] Desktop layout
- [ ] Tablet layout
- [ ] Mobile layout

### 5.7 Deployment Design
**Development Environment:**
- [ ] Local development setup
- [ ] Virtual environment
- [ ] SQLite database
- [ ] React development server

**Production Considerations:**
- [ ] PostgreSQL migration
- [ ] Docker containerization
- [ ] Nginx reverse proxy
- [ ] Cloud hosting options

### 5.8 Deliverables
- [ ] Software Design Specification (SDS)
- [ ] Database schema documentation
- [ ] API documentation
- [ ] Security design document
- [ ] Frontend design document
- [ ] Deployment design document

---

## Phase 6: Prototype (Week 11-12)

### 6.1 UI Prototyping
**Wireframes:**
- [ ] Low-fidelity wireframes (paper sketches)
- [ ] High-fidelity wireframes (digital)
- [ ] Navigation flow
- [ ] User journey mapping

**Figma Integration:**
- [ ] Import Figma design
- [ ] Customize for Botswana context
- [ ] Apply Pula currency
- [ ] Update user name

### 6.2 Navigation Design
- [ ] Main navigation structure
- [ ] Sidebar navigation
- [ ] Mobile navigation
- [ ] Breadcrumb navigation

### 6.3 Component Prototyping
- [ ] Header component prototype
- [ ] Dashboard component prototype
- [ ] Cattle List component prototype
- [ ] Billing component prototype

### 6.4 Interactive Prototype
- [ ] Clickable prototype
- [ ] User flow testing
- [ ] Feedback collection
- [ ] Iteration based on feedback

### 6.5 Deliverables
- [ ] Wireframe document
- [ ] Figma design files
- [ ] Interactive prototype
- [ ] User testing report
- [ ] Design iteration log

---

## Phase 7: Preliminary Dissertation (Week 13-14)

### 7.1 Dissertation Structure
**Cover Page:**
- [ ] Title
- [ ] Author name
- [ ] Institution
- [ ] Date

**Declaration:**
- [ ] Original work declaration
- [ ] No plagiarism statement
- [ ] Signatures

**Abstract:**
- [ ] 200-300 word summary
- [ ] Problem statement
- [ ] Methodology
- [ ] Key findings
- [ ] Keywords

**Acknowledgements:**
- [ ] Supervisor
- [ ] Institution
- [ ] Family
- [ ] Colleagues

**Table of Contents:**
- [ ] Main chapters
- [ ] Figures
- [ ] Tables

### 7.2 Chapter Content
**Chapter 1: Introduction**
- [ ] Background
- [ ] Problem statement
- [ ] Motivation
- [ ] Aim and objectives
- [ ] Scope
- [ ] Technologies
- [ ] Risks
- [ ] Dissertation structure

**Chapter 2: Literature Review**
- [ ] IoT in agriculture
- [ ] Data governance
- [ ] Multi-agent systems
- [ ] Comparison tables
- [ ] Research gaps

**Chapter 3: Methodology**
- [ ] Research design
- [ ] Development approach
- [ ] Data collection
- [ ] Evaluation methods
- [ ] Ethical considerations

**Chapter 4: Analysis**
- [ ] Functional requirements
- [ ] Non-functional requirements
- [ ] Business rules
- [ ] Use cases
- [ ] UML diagrams

**Chapter 5: Design**
- [ ] System architecture
- [ ] Database design
- [ ] API design
- [ ] Multi-agent design
- [ ] Security design

**Chapter 6: Progress**
- [ ] Implementation progress
- [ ] Challenges encountered
- [ ] Solutions applied
- [ ] Current status

**Chapter 7: Challenges**
- [ ] Technical challenges
- [ ] Project challenges
- [ ] Lessons learned

**Chapter 8: Future Work**
- [ ] Semester 2 plans
- [ ] Long-term vision
- [ ] Enhancement opportunities

**References:**
- [ ] APA 7th edition format
- [ ] 20-40 references
- [ ] Proper citation

### 7.3 LaTeX Formatting
- [ ] LaTeX template setup
- [ ] Chapter integration
- [ ] Figure insertion
- [ ] Table formatting
- [ ] Citation management

### 7.4 Deliverables
- [ ] Preliminary dissertation (LaTeX)
- [ ] All chapters completed
- [ ] Proper formatting
- [ ] References included
- [ ] Ready for supervisor review

---

## Assessment Criteria Alignment

### INFS 401 (Semester 1) - 50%
**3NF Database Validation:**
- [ ] Complete 3NF schema design
- [ ] Normalization proofs
- [ ] Data integrity constraints
- [ ] Anomaly prevention mechanisms

**Data Governance:**
- [ ] Database design documentation
- [ ] Data integrity validation
- [ ] Schema normalization evidence

### COMP 401 (Semester 1) - 50%
**Multi-Agent Orchestration:**
- [ ] Agent architecture design
- [ ] Graph-based routing logic
- [ ] Agent specialization
- [ ] Algorithm documentation

**System Design:**
- [ ] Complete UML diagram set
- [ ] System architecture documentation
- [ ] API design specification
- [ ] Security design

---

## Success Metrics

### Technical Metrics
- [ ] Complete 3NF database schema
- [ ] 8 UML diagrams completed
- [ ] 20-40 literature review papers
- [ ] Complete SRS and SDS documents
- [ ] Preliminary dissertation (all chapters)

### Academic Metrics
- [ ] Project proposal (2000-3000 words)
- [ ] Literature review (3000-4000 words)
- [ ] SRS document (comprehensive)
- [ ] SDS document (comprehensive)
- [ ] Preliminary dissertation (ready for review)

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1 | Week 1-2 | Project proposal, Gantt chart |
| Phase 2 | Week 3-4 | Literature review, annotated bibliography |
| Phase 3 | Week 5-6 | SRS document, requirements |
| Phase 4 | Week 7-8 | UML diagrams, analysis |
| Phase 5 | Week 9-10 | SDS document, design |
| Phase 6 | Week 11-12 | UI prototypes, Figma integration |
| Phase 7 | Week 13-14 | Preliminary dissertation |

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

This Semester 1 plan provides a structured approach to completing INFS 401 and COMP 401 requirements. The plan follows the official COMP401 module structure with 7 phases, ensuring all academic deliverables are completed to a high standard.

**Key to Success:** Consistent weekly progress, early literature review start, thorough analysis phase, and regular supervisor feedback.

---

## Next Steps

1. Start Phase 1: Project Proposal immediately
2. Schedule supervisor meeting for proposal approval
3. Begin literature search for Phase 2
4. Set up development tools and documentation templates
