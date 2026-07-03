# Lesaka AI - Final Year Project Ecosystem Structure

## Overview
This document outlines the complete folder structure and deliverable organization for the Lesaka AI Final Year Project, aligned with COMP401 (Semester 1) and COMP402 (Semester 2) requirements.

## Root Directory Structure

```
LesakaAi_project/
│
├── README.md                          # Professional repository README
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore rules
├── SEMESTER_2_PLAN.md                 # Semester 2 implementation plan
├── FYP_STRUCTURE.md                   # This file - ecosystem structure
│
├── app.py                             # Flask web application
├── lesaka_validation_engine.py        # INFS: 3NF validation engine
├── graph_orchestrator.py              # COMP: Multi-agent orchestrator
├── init_db.py                         # Database initialization
├── requirements.txt                   # Python dependencies
│
├── templates/                         # HTML templates
│   └── dashboard.html
│
├── frontend/                          # React application (Figma export)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── Dissertation/                      # LaTeX dissertation and chapters
│   ├── main.tex                       # Main dissertation file
│   ├── chapters/
│   │   ├── 01_introduction.tex
│   │   ├── 02_literature_review.tex
│   │   ├── 03_methodology.tex
│   │   ├── 04_analysis.tex
│   │   ├── 05_design.tex
│   │   ├── 06_implementation.tex
│   │   ├── 07_testing.tex
│   │   ├── 08_results.tex
│   │   ├── 09_discussion.tex
│   │   └── 10_conclusion.tex
│   ├── front_matter/
│   │   ├── title_page.tex
│   │   ├── declaration.tex
│   │   ├── abstract.tex
│   │   └── acknowledgements.tex
│   ├── back_matter/
│   │   ├── references.bib
│   │   └── appendices/
│   ├── figures/
│   └── tables/
│
├── Research/                          # Literature review and research materials
│   ├── papers/                        # Downloaded research papers
│   ├── literature_review.md          # Literature review document
│   ├── comparison_tables/             # System comparison tables
│   ├── research_gaps.md              # Identified research gaps
│   └── annotated_bibliography.md      # Annotated bibliography
│
├── Meeting_Notes/                    # Supervisor meeting records
│   ├── meeting_001_YYYY-MM-DD.md
│   ├── meeting_002_YYYY-MM-DD.md
│   ├── meeting_003_YYYY-MM-DD.md
│   └── meeting_summary.md             # Summary of all meetings
│
├── Weekly_Progress/                   # Weekly progress tracking
│   ├── week01.md
│   ├── week02.md
│   ├── week03.md
│   └── ... (continues through semester)
│
├── Testing_Evidence/                  # All testing documentation
│   ├── unit_tests/
│   │   ├── test_validation_engine.py
│   │   ├── test_graph_orchestrator.py
│   │   └── test_api_endpoints.py
│   ├── integration_tests/
│   ├── system_tests/
│   ├── performance_tests/
│   ├── test_reports/
│   │   ├── unit_test_report.md
│   │   ├── integration_test_report.md
│   │   └── performance_test_report.md
│   └── coverage_reports/
│
├── Screenshots/                       # System screenshots for documentation
│   ├── ui_screenshots/
│   ├── api_responses/
│   ├── database_schemas/
│   └── architecture_diagrams/
│
├── UML/                               # All UML diagrams
│   ├── use_case_diagram.png
│   ├── activity_diagram.png
│   ├── sequence_diagram.png
│   ├── class_diagram.png
│   ├── erd_diagram.png
│   ├── context_diagram.png
│   ├── dfd_diagram.png
│   ├── deployment_diagram.png
│   └── component_diagram.png
│
├── Poster/                            # Academic poster materials
│   ├── poster.tex                     # LaTeX poster source
│   ├── poster.pdf                     # Final poster
│   ├── poster_images/
│   └── poster_layout_guide.md
│
├── Presentation/                      # Presentation materials
│   ├── slides.pptx                    # Main presentation
│   ├── speaker_notes.md              # Speaker notes
│   ├── demo_video.mp4                 # Demo recording
│   └── presentation_assets/
│
├── Demo_Script/                       # Live demonstration script
│   ├── demo_script.md                 # Step-by-step demo guide
│   ├── demo_scenarios.md              # Demo scenarios to cover
│   └── backup_demos.md                # Alternative demo scenarios
│
├── Viva_Preparation/                  # Viva voce preparation
│   ├── viva_questions.md              # 100+ potential questions
│   ├── technical_questions.md         # Technical-specific questions
│   ├── design_questions.md            # Design-specific questions
│   ├── database_questions.md          # Database-specific questions
│   ├── ai_questions.md                # AI/ML-specific questions
│   ├── trade_offs.md                  # Trade-off discussions
│   └── practice_answers.md            # Practice answers
│
├── Portfolio/                         # Professional portfolio materials
│   ├── project_summary.md
│   ├── technical_highlights.md
│   ├── challenges_solutions.md
│   ├── lessons_learned.md
│   └── future_work.md
│
├── Documentation/                     # Technical documentation
│   ├── SRS.md                         # Software Requirements Specification
│   ├── SDS.md                         # Software Design Specification
│   ├── API_Documentation.md           # API endpoint documentation
│   ├── Database_Documentation.md     # Database schema documentation
│   ├── Installation_Guide.md          # Installation instructions
│   ├── User_Manual.md                 # End-user manual
│   ├── Admin_Manual.md                # Administrator manual
│   ├── Developer_Guide.md             # Developer contribution guide
│   └── Maintenance_Guide.md           # System maintenance guide
│
├── .github/                           # GitHub-specific files
│   ├── workflows/
│   │   ├── python-app.yml
│   │   └── python-publish.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
└── lesaka_edge.db                     # SQLite database (gitignored)
```

## Deliverable Mapping

### COMP401 (Semester 1) Deliverables

| Phase | Deliverable | Location | Status |
|-------|-------------|----------|--------|
| Phase 1 | Project Proposal | `Documentation/Project_Proposal.md` | Pending |
| Phase 2 | Literature Review | `Research/literature_review.md` | Pending |
| Phase 3 | Requirements | `Documentation/SRS.md` | Pending |
| Phase 4 | UML Diagrams | `UML/` | Pending |
| Phase 5 | Design Documentation | `Documentation/SDS.md` | Pending |
| Phase 6 | Prototype | `Screenshots/ui_screenshots/` | Partial |
| Phase 7 | Preliminary Dissertation | `Dissertation/` | Pending |

### COMP402 (Semester 2) Deliverables

| Week | Deliverable | Location | Status |
|------|-------------|----------|--------|
| Week 1-2 | Scope Freeze | `Meeting_Notes/meeting_summary.md` | Pending |
| Week 3 | Implementation Plan | `SEMESTER_2_PLAN.md` | Complete |
| Week 4 | Prototype | `frontend/`, `app.py` | Partial |
| Week 5 | 50% Implementation | Core backend | Partial |
| Week 6 | Internal Demo | `Demo_Script/` | Pending |
| Week 7 | Improvements | Git commits | Ongoing |
| Week 8 | Complete Implementation | Full system | Pending |
| Week 9 | Testing | `Testing_Evidence/` | Partial |
| Week 10 | Draft Dissertation | `Dissertation/` | Pending |
| Week 11 | Poster | `Poster/` | Pending |
| Exam Week | Final Submission | All folders | Pending |

## Documentation Standards

### Code Documentation
- All Python files follow PEP 257 docstring conventions
- Comments explain *why* decisions were made, not *what* code does
- Type hints used where appropriate
- Complex algorithms include inline explanations

### Academic Writing
- LaTeX for all formal documents
- APA 7th edition citation style
- Clear, concise academic English
- Explicit discussion of design choices and trade-offs
- Honest reflection on limitations and challenges

### Git Workflow
- Feature branches for new functionality
- Descriptive commit messages
- Regular commits (not one massive upload)
- Pull requests for code review
- Tags for major milestones

## Success Criteria

### Technical Excellence
- [ ] 80%+ code coverage
- [ ] All UML diagrams completed
- [ ] Comprehensive documentation
- [ ] Working demo with realistic data
- [ ] Professional GitHub repository

### Academic Excellence
- [ ] 3000+ word preliminary dissertation
- [ ] 20-40 papers in literature review
- [ ] Complete SRS and SDS documents
- [ ] Professional poster and presentation
- [ ] Prepared for 100+ viva questions

### Professional Excellence
- [ ] Clean, maintainable code
- [ ] Evidence of iterative development
- [ ] Clear explanation of AI assistance
- [ ] Demonstrated understanding of all components
- [ ] Ready for live demonstration and defence

## Next Steps

1. Create LaTeX dissertation template
2. Set up professional GitHub README
3. Create SRS template
4. Create SDS template
5. Start literature review structure
6. Create meeting notes template
7. Create weekly progress tracker
8. Begin UML diagram creation
