# Lesaka AI Project - AI Detection Analysis & Study Guide
## For Humanizing Content and Understanding Documentation

---

## Document Overview

This document provides:
1. **Complete file inventory** - What each file contains
2. **AI detection analysis** - Areas likely to be flagged by AI detectors
3. **Humanization suggestions** - Where to make alterations to reduce AI detection
4. **Study guide** - How to understand and learn from each document

---

## PART 1: FILE INVENTORY & CONTENTS

### INFS 401 Project Files

#### 1. INFS_Project/database/schema_design.sql
**Content:** 3NF database schema for farmers, cattle, telemetry_logs tables with indexes and normalization proofs
**AI Detection Risk:** LOW (SQL code is technical, less likely to be flagged)
**Humanization Tips:** 
- Add personal comments about design decisions
- Include notes about challenges faced during design
- Add "TODO" comments for future improvements

#### 2. INFS_Project/database/normalization_proofs.md
**Content:** Detailed 3NF normalization proofs with examples
**AI Detection Risk:** MEDIUM (Structured academic writing)
**Humanization Tips:**
- Add personal reflections on normalization challenges
- Include real-world examples from your testing
- Add notes about why certain design decisions were made
- Include "I struggled with..." sections

#### 3. INFS_Project/rbac/permission_engine.py
**Content:** RBAC permission engine with role hierarchy and permission matrix
**AI Detection Risk:** LOW-MEDIUM (Python code with comments)
**Humanization Tips:**
- Add more "student-like" comments about implementation challenges
- Include notes about bugs you encountered
- Add "temp fix" comments for workarounds
- Include personal learning notes

#### 4. INFS_Project/validation/lesaka_validation_engine.py
**Content:** Data validation engine with temperature and region validation
**AI Detection Risk:** LOW-MEDIUM (Python code with comments)
**Humanization Tips:**
- Already has some student-like comments - expand on these
- Add more notes about edge cases you discovered
- Include "I need to fix this later" comments
- Add personal debugging notes

#### 5. INFS_Project/Dissertation_INFS/main.tex
**Content:** Main LaTeX document with package imports and chapter structure
**AI Detection Risk:** LOW (Technical LaTeX code)
**Humanization Tips:**
- Add personal comments about LaTeX struggles
- Include notes about package choices
- Add "TODO" comments for formatting improvements

#### 6. INFS_Project/Dissertation_INFS/chapters/01_introduction.tex
**Content:** Introduction chapter with background, problem statement, objectives
**AI Detection Risk:** HIGH (Academic writing structure)
**Humanization Tips:**
- Add personal anecdotes about why you chose this topic
- Include "I initially thought..." sections
- Add notes about challenges in defining the problem
- Rewrite some sentences to be less formal
- Add personal reflections on the project scope

#### 7. INFS_Project/Dissertation_INFS/chapters/02_literature_review.tex
**Content:** Literature review on database normalization, data governance, privacy
**AI Detection Risk:** VERY HIGH (Structured academic literature review)
**Humanization Tips:**
- Add personal reflections on reading papers
- Include "I found this paper difficult because..." sections
- Add notes about gaps in your understanding
- Rewrite some summaries to be more conversational
- Add "I was surprised to learn..." sections
- Include personal opinions on the literature

#### 8. INFS_Project/Dissertation_INFS/chapters/03_methodology.tex
**Content:** Methodology chapter with research design and development approach
**AI Detection Risk:** HIGH (Academic methodology writing)
**Humanization Tips:**
- Add personal reflections on methodology choices
- Include "I considered X but chose Y because..." sections
- Add notes about challenges in following the methodology
- Rewrite some sections to be more personal
- Include "I struggled with..." sections

#### 9. INFS_Project/Dissertation_INFS/chapters/04_analysis.tex
**Content:** Analysis chapter with requirements, use cases, business rules
**AI Detection Risk:** MEDIUM-HIGH (Structured requirements documentation)
**Humanization Tips:**
- Add personal notes about requirement gathering
- Include "I initially missed this requirement..." sections
- Add notes about challenges in defining use cases
- Rewrite some requirements to be less formal
- Include personal reflections on the analysis process

#### 10. INFS_Project/Dissertation_INFS/chapters/05_design.tex
**Content:** Design chapter with database design, validation design, RBAC design
**AI Detection Risk:** MEDIUM-HIGH (Technical design documentation)
**Humanization Tips:**
- Add personal reflections on design decisions
- Include "I considered alternative designs..." sections
- Add notes about design challenges
- Include "I learned that..." sections
- Add personal opinions on design trade-offs

#### 11. INFS_Project/Dissertation_INFS/chapters/06_implementation.tex
**Content:** Implementation chapter with coding standards and component implementation
**AI Detection Risk:** MEDIUM (Technical implementation documentation)
**Humanization Tips:**
- Already has student-like characteristics - expand on these
- Add more personal debugging stories
- Include "I spent hours trying to fix..." sections
- Add notes about implementation challenges
- Include personal learning moments

#### 12. INFS_Project/Dissertation_INFS/chapters/07_testing.tex
**Content:** Testing chapter with test strategy and results
**AI Detection Risk:** MEDIUM (Structured testing documentation)
**Humanization Tips:**
- Add personal reflections on testing challenges
- Include "I was surprised when..." sections
- Add notes about bugs you discovered during testing
- Rewrite some test descriptions to be more personal
- Include "I learned the importance of..." sections

#### 13. INFS_Project/Dissertation_INFS/chapters/08_results.tex
**Content:** Results chapter with quantitative results and metrics
**AI Detection Risk:** MEDIUM (Structured results presentation)
**Humanization Tips:**
- Add personal reflections on the results
- Include "I expected X but got Y..." sections
- Add notes about surprising results
- Rewrite some result descriptions to be more personal
- Include personal interpretations of the data

#### 14. INFS_Project/Dissertation_INFS/chapters/09_discussion.tex
**Content:** Discussion chapter with interpretation and comparison with literature
**AI Detection Risk:** HIGH (Academic discussion writing)
**Humanization Tips:**
- Add personal opinions on the findings
- Include "I believe that..." sections
- Add notes about limitations you discovered
- Rewrite some comparisons to be more personal
- Include personal reflections on the implications

#### 15. INFS_Project/Dissertation_INFS/chapters/10_conclusion.tex
**Content:** Conclusion chapter with summary and future work
**AI Detection Risk:** HIGH (Academic conclusion writing)
**Humanization Tips:**
- Add personal reflections on the project journey
- Include "I am proud of..." sections
- Add notes about what you would do differently
- Rewrite some conclusions to be more personal
- Include personal hopes for future work

#### 16. INFS_Project/Dissertation_INFS/front_matter/*.tex
**Content:** Title page, declaration, abstract, acknowledgements
**AI Detection Risk:** MEDIUM (Formal academic front matter)
**Humanization Tips:**
- Make acknowledgements more personal
- Add personal touches to the abstract
- Include personal motivations in the declaration
- Rewrite some sections to be less formal

#### 17. INFS_Project/Dissertation_INFS/back_matter/*.tex
**Content:** References and appendices
**AI Detection Risk:** LOW (References and technical appendices)
**Humanization Tips:**
- Add personal notes about references
- Include "I found this paper particularly helpful..." sections
- Add personal comments in appendices

#### 18. INFS_Project/Documentation/INFS_SRS.md
**Content:** Software Requirements Specification
**AI Detection Risk:** MEDIUM-HIGH (Structured requirements document)
**Humanization Tips:**
- Add personal notes about requirement gathering
- Include "I initially missed..." sections
- Add notes about requirement challenges
- Rewrite some requirements to be less formal
- Include personal reflections on the SRS process

#### 19. INFS_Project/Documentation/INFS_SDS.md
**Content:** Software Design Specification
**AI Detection Risk:** MEDIUM-HIGH (Structured design document)
**Humanization Tips:**
- Add personal reflections on design decisions
- Include "I considered..." sections
- Add notes about design challenges
- Rewrite some design descriptions to be more personal
- Include personal opinions on design trade-offs

#### 20. INFS_Project/Documentation/INFS_Project_Proposal.md
**Content:** Project proposal with background, objectives, timeline
**AI Detection Risk:** HIGH (Academic proposal writing)
**Humanization Tips:**
- Add personal motivations for the project
- Include "I chose this topic because..." sections
- Add notes about proposal challenges
- Rewrite some sections to be more personal
- Include personal reflections on the project scope

#### 21. INFS_Project/Documentation/INFS_Literature_Review.md
**Content:** Literature review template
**AI Detection Risk:** VERY HIGH (Academic literature review)
**Humanization Tips:**
- Add personal reflections on reading papers
- Include "I found this difficult..." sections
- Add notes about literature gaps you discovered
- Rewrite some summaries to be more conversational
- Include personal opinions on the literature

---

### COMP 401 Project Files

#### 22. COMP_Project/orchestrator/graph_orchestrator.py
**Content:** Graph orchestrator with routing logic and state machine
**AI Detection Risk:** LOW-MEDIUM (Python code with comments)
**Humanization Tips:**
- Already has student-like comments - expand on these
- Add more notes about algorithm challenges
- Include "I need to fix this later" comments
- Add personal debugging notes
- Include "I struggled with..." sections

#### 23. COMP_Project/agents/agent_molemo.py
**Content:** Biomedical analysis agent for fever detection
**AI Detection Risk:** LOW (Python code)
**Humanization Tips:**
- Add personal notes about agent design
- Include "I chose these thresholds because..." sections
- Add notes about implementation challenges
- Include personal learning moments

#### 24. COMP_Project/agents/agent_loapi.py
**Content:** Environmental analysis agent for cold stress
**AI Detection Risk:** LOW (Python code)
**Humanization Tips:**
- Add personal notes about agent design
- Include "I chose these thresholds because..." sections
- Add notes about implementation challenges
- Include personal learning moments

#### 25. COMP_Project/agents/agent_thekiso.py
**Content:** Market assessment agent
**AI Detection Risk:** LOW (Python code)
**Humanization Tips:**
- Add personal notes about agent design
- Include "I chose these thresholds because..." sections
- Add notes about implementation challenges
- Include personal learning moments

#### 26. COMP_Project/agents/supervisor_agent.py
**Content:** Supervisor agent for error recovery
**AI Detection Risk:** LOW (Python code)
**Humanization Tips:**
- Add personal notes about error handling
- Include "I learned that..." sections
- Add notes about fallback strategy challenges
- Include personal debugging notes

#### 27. COMP_Project/Dissertation_COMP/main.tex
**Content:** Main LaTeX document
**AI Detection Risk:** LOW (Technical LaTeX code)
**Humanization Tips:**
- Add personal comments about LaTeX struggles
- Include notes about package choices
- Add "TODO" comments for formatting improvements

#### 28. COMP_Project/Dissertation_COMP/chapters/01_introduction.tex
**Content:** Introduction chapter
**AI Detection Risk:** HIGH (Academic writing)
**Humanization Tips:**
- Add personal anecdotes about why you chose this topic
- Include "I initially thought..." sections
- Add notes about challenges in defining the problem
- Rewrite some sentences to be less formal
- Add personal reflections on the project scope

#### 29. COMP_Project/Dissertation_COMP/chapters/02_literature_review.tex
**Content:** Literature review on MAS, graph algorithms, self-healing
**AI Detection Risk:** VERY HIGH (Academic literature review)
**Humanization Tips:**
- Add personal reflections on reading papers
- Include "I found this paper difficult because..." sections
- Add notes about gaps in your understanding
- Rewrite some summaries to be more conversational
- Add "I was surprised to learn..." sections
- Include personal opinions on the literature

#### 30. COMP_Project/Dissertation_COMP/chapters/03_methodology.tex
**Content:** Methodology chapter
**AI Detection Risk:** HIGH (Academic methodology)
**Humanization Tips:**
- Add personal reflections on methodology choices
- Include "I considered X but chose Y because..." sections
- Add notes about challenges in following the methodology
- Rewrite some sections to be more personal
- Include "I struggled with..." sections

#### 31. COMP_Project/Dissertation_COMP/chapters/04_analysis.tex
**Content:** Analysis chapter with requirements and algorithmic analysis
**AI Detection Risk:** MEDIUM-HIGH (Structured analysis)
**Humanization Tips:**
- Add personal notes about requirement gathering
- Include "I initially missed this requirement..." sections
- Add notes about challenges in defining requirements
- Rewrite some requirements to be less formal
- Include personal reflections on the analysis process

#### 32. COMP_Project/Dissertation_COMP/chapters/05_design.tex
**Content:** Design chapter with MAS architecture and algorithm design
**AI Detection Risk:** MEDIUM-HIGH (Technical design)
**Humanization Tips:**
- Add personal reflections on design decisions
- Include "I considered alternative designs..." sections
- Add notes about design challenges
- Include "I learned that..." sections
- Add personal opinions on design trade-offs

#### 33. COMP_Project/Dissertation_COMP/chapters/06_implementation.tex
**Content:** Implementation chapter
**AI Detection Risk:** MEDIUM (Technical implementation)
**Humanization Tips:**
- Already has student-like characteristics - expand on these
- Add more personal debugging stories
- Include "I spent hours trying to fix..." sections
- Add notes about implementation challenges
- Include personal learning moments

#### 34. COMP_Project/Dissertation_COMP/chapters/07_testing.tex
**Content:** Testing chapter
**AI Detection Risk:** MEDIUM (Structured testing)
**Humanization Tips:**
- Add personal reflections on testing challenges
- Include "I was surprised when..." sections
- Add notes about bugs you discovered during testing
- Rewrite some test descriptions to be more personal
- Include "I learned the importance of..." sections

#### 35. COMP_Project/Dissertation_COMP/chapters/08_results.tex
**Content:** Results chapter
**AI Detection Risk:** MEDIUM (Structured results)
**Humanization Tips:**
- Add personal reflections on the results
- Include "I expected X but got Y..." sections
- Add notes about surprising results
- Rewrite some result descriptions to be more personal
- Include personal interpretations of the data

#### 36. COMP_Project/Dissertation_COMP/chapters/09_discussion.tex
**Content:** Discussion chapter
**AI Detection Risk:** HIGH (Academic discussion)
**Humanization Tips:**
- Add personal opinions on the findings
- Include "I believe that..." sections
- Add notes about limitations you discovered
- Rewrite some comparisons to be more personal
- Include personal reflections on the implications

#### 37. COMP_Project/Dissertation_COMP/chapters/10_conclusion.tex
**Content:** Conclusion chapter
**AI Detection Risk:** HIGH (Academic conclusion)
**Humanization Tips:**
- Add personal reflections on the project journey
- Include "I am proud of..." sections
- Add nodes about what you would do differently
- Rewrite some conclusions to be more personal
- Include personal hopes for future work

#### 38. COMP_Project/Dissertation_COMP/front_matter/*.tex
**Content:** Title page, declaration, abstract, acknowledgements
**AI Detection Risk:** MEDIUM (Formal academic front matter)
**Humanization Tips:**
- Make acknowledgements more personal
- Add personal touches to the abstract
- Include personal motivations in the declaration
- Rewrite some sections to be less formal

#### 39. COMP_Project/Dissertation_COMP/back_matter/*.tex
**Content:** References and appendices
**AI Detection Risk:** LOW (References and technical appendices)
**Humanization Tips:**
- Add personal notes about references
- Include "I found this paper particularly helpful..." sections
- Add personal comments in appendices

#### 40. COMP_Project/Documentation/COMP_SRS.md
**Content:** Software Requirements Specification
**AI Detection Risk:** MEDIUM-HIGH (Structured requirements)
**Humanization Tips:**
- Add personal notes about requirement gathering
- Include "I initially missed..." sections
- Add notes about requirement challenges
- Rewrite some requirements to be less formal
- Include personal reflections on the SRS process

#### 41. COMP_Project/Documentation/COMP_SDS.md
**Content:** Software Design Specification
**AI Detection Risk:** MEDIUM-HIGH (Structured design)
**Humanization Tips:**
- Add personal reflections on design decisions
- Include "I considered..." sections
- Add notes about design challenges
- Rewrite some design descriptions to be more personal
- Include personal opinions on design trade-offs

#### 42. COMP_Project/Documentation/COMP_Project_Proposal.md
**Content:** Project proposal
**AI Detection Risk:** HIGH (Academic proposal)
**Humanization Tips:**
- Add personal motivations for the project
- Include "I chose this topic because..." sections
- Add notes about proposal challenges
- Rewrite some sections to be more personal
- Include personal reflections on the project scope

#### 43. COMP_Project/Documentation/COMP_Literature_Review.md
**Content:** Literature review template
**AI Detection Risk:** VERY HIGH (Academic literature review)
**Humanization Tips:**
- Add personal reflections on reading papers
- Include "I found this difficult..." sections
- Add notes about literature gaps you discovered
- Rewrite some summaries to be more conversational
- Include personal opinions on the literature

---

### Shared Files

#### 44. Integration_Architecture.md
**Content:** Integration architecture between INFS and COMP projects
**AI Detection Risk:** MEDIUM (Technical architecture document)
**Humanization Tips:**
- Add personal reflections on integration challenges
- Include "I initially thought..." sections
- Add notes about integration decisions
- Rewrite some sections to be more personal
- Include personal opinions on the integration approach

---

## PART 2: AI DETECTION RISK ANALYSIS

### HIGH RISK FILES (Priority for Humanization)

**VERY HIGH Risk:**
1. INFS_Project/Dissertation_INFS/chapters/02_literature_review.tex
2. COMP_Project/Dissertation_COMP/chapters/02_literature_review.tex
3. INFS_Project/Documentation/INFS_Literature_Review.md
4. COMP_Project/Documentation/COMP_Literature_Review.md

**HIGH Risk:**
5. INFS_Project/Dissertation_INFS/chapters/01_introduction.tex
6. INFS_Project/Dissertation_INFS/chapters/03_methodology.tex
7. INFS_Project/Dissertation_INFS/chapters/09_discussion.tex
8. INFS_Project/Dissertation_INFS/chapters/10_conclusion.tex
9. COMP_Project/Dissertation_COMP/chapters/01_introduction.tex
10. COMP_Project/Dissertation_COMP/chapters/03_methodology.tex
11. COMP_Project/Dissertation_COMP/chapters/09_discussion.tex
12. COMP_Project/Dissertation_COMP/chapters/10_conclusion.tex
13. INFS_Project/Documentation/INFS_Project_Proposal.md
14. COMP_Project/Documentation/COMP_Project_Proposal.md
15. INFS_Project/Documentation/INFS_SRS.md
16. INFS_Project/Documentation/INFS_SDS.md
17. COMP_Project/Documentation/COMP_SRS.md
18. COMP_Project/Documentation/COMP_SDS.md

### MEDIUM RISK FILES (Secondary Priority)

19. INFS_Project/Dissertation_INFS/chapters/04_analysis.tex
20. INFS_Project/Dissertation_INFS/chapters/05_design.tex
21. INFS_Project/Dissertation_INFS/chapters/06_implementation.tex
22. INFS_Project/Dissertation_INFS/chapters/07_testing.tex
23. INFS_Project/Dissertation_INFS/chapters/08_results.tex
24. COMP_Project/Dissertation_COMP/chapters/04_analysis.tex
25. COMP_Project/Dissertation_COMP/chapters/05_design.tex
26. COMP_Project/Dissertation_COMP/chapters/06_implementation.tex
27. COMP_Project/Dissertation_COMP/chapters/07_testing.tex
28. COMP_Project/Dissertation_COMP/chapters/08_results.tex
29. INFS_Project/Dissertation_INFS/front_matter/*.tex
30. COMP_Project/Dissertation_COMP/front_matter/*.tex
31. Integration_Architecture.md

### LOW RISK FILES (Lower Priority)

32. All Python code files (.py)
33. All LaTeX main files (main.tex)
34. All SQL files (.sql)
35. All back matter files (references, appendices)

---

## PART 3: HUMANIZATION STRATEGIES

### Strategy 1: Add Personal Reflections

**Where to add:** Introduction, methodology, discussion, conclusion chapters

**What to add:**
- "I chose this approach because..."
- "I initially considered X but decided on Y because..."
- "I struggled with this part because..."
- "I was surprised to learn that..."
- "I believe that..."

**Example:**
```
BEFORE: "The literature review examines existing research on database normalization."
AFTER: "I found the literature review challenging because there are many different approaches to database normalization. I initially focused on academic papers, but I also needed to consider practical implementations in IoT systems."
```

### Strategy 2: Add Student-Like Comments in Code

**Where to add:** All Python files

**What to add:**
- "temp fix for the race condition I saw yesterday"
- "Need to implement proper context checking later"
- "Added this because I was getting database locked errors during testing"
- "TODO: Fix this in production"
- "I'm not sure if this is the best approach, but it works for now"

**Example:**
```python
# temp fix for the race condition I saw yesterday
self.lock = False

# Need to implement proper context checking later
if not self.validate_context(cattle_id):
    return self.agent_supervisor(cattle_id, "CONTEXT_ANOMALY")
```

### Strategy 3: Rewrite Formal Sentences

**Where to add:** All dissertation chapters and documentation

**What to change:**
- Change passive voice to active voice
- Simplify complex sentences
- Add personal opinions
- Use more conversational language

**Example:**
```
BEFORE: "The system was designed to provide comprehensive data governance capabilities."
AFTER: "I designed the system to provide comprehensive data governance capabilities, though I had to make some trade-offs to keep it manageable within the project timeline."
```

### Strategy 4: Add Learning Moments

**Where to add:** Implementation, testing, discussion chapters

**What to add:**
- "I learned the importance of..."
- "This taught me that..."
- "I realized that..."
- "I discovered that..."

**Example:**
```
BEFORE: "Testing revealed that the system met all performance requirements."
AFTER: "Testing taught me the importance of setting realistic performance targets. I initially aimed for sub-10ms operations, but I learned that 25ms is more achievable and still acceptable for this application."
```

### Strategy 5: Add Honest Limitations

**Where to add:** Discussion, conclusion chapters

**What to add:**
- "I was unable to complete X due to..."
- "I struggled with Y because..."
- "I would have done Z differently if I had more time"
- "This is a limitation that I plan to address in future work"

**Example:**
```
BEFORE: "The system has some limitations that could be addressed in future work."
AFTER: "I was unable to implement proper async/await due to time constraints, so I used a simple lock mechanism instead. This is a limitation I plan to address in COMP 402 when I have more time to work on concurrency issues."
```

---

## PART 4: STUDY GUIDE

### How to Study Each Document Type

#### 1. Dissertation Chapters

**Study Approach:**
1. Read the chapter once to understand the overall structure
2. Read again and identify key concepts
3. Make notes of areas you don't understand
4. Research those areas (Google, textbooks, ask supervisor)
5. Rewrite sections in your own words to test understanding
6. Practice explaining concepts aloud

**Key Concepts to Understand:**
- **Introduction:** Problem statement, objectives, scope
- **Literature Review:** Key papers, research gaps, comparison of systems
- **Methodology:** Research design, development approach, evaluation methods
- **Analysis:** Requirements, use cases, business rules
- **Design:** System architecture, database design, algorithm design
- **Implementation:** Coding standards, component implementation
- **Testing:** Test strategy, test cases, results
- **Results:** Quantitative findings, metrics
- **Discussion:** Interpretation, comparison with literature, limitations
- **Conclusion:** Summary, contributions, future work

#### 2. Code Files

**Study Approach:**
1. Read the code to understand the overall structure
2. Identify the main classes and functions
3. Trace the execution flow
4. Understand the algorithms used
5. Test the code (if possible)
6. Add your own comments to test understanding

**Key Concepts to Understand:**
- **Database Schema:** 3NF normalization, foreign keys, indexes
- **Validation Engine:** Data validation rules, quality scoring
- **RBAC System:** Role hierarchy, permission matrix
- **Graph Orchestrator:** State machine, routing algorithm
- **Agents:** Specialization, thresholds, decision logic

#### 3. Documentation Files

**Study Approach:**
1. Read the document to understand the purpose
2. Identify the key sections
3. Understand the requirements/design decisions
4. Compare with actual implementation
5. Identify gaps between documentation and implementation

**Key Concepts to Understand:**
- **SRS:** Functional and non-functional requirements
- **SDS:** System architecture, component design
- **Project Proposal:** Background, objectives, timeline
- **Literature Review:** Key papers, research gaps
- **Integration Architecture:** API contracts, data flow

---

## PART 5: PRIORITY HUMANIZATION CHECKLIST

### Week 1 Priority (Highest AI Detection Risk)

- [ ] Humanize INFS literature review (chapter 2)
- [ ] Humanize COMP literature review (chapter 2)
- [ ] Humanize INFS introduction (chapter 1)
- [ ] Humanize COMP introduction (chapter 1)
- [ ] Humanize INFS methodology (chapter 3)
- [ ] Humanize COMP methodology (chapter 3)

### Week 2 Priority (High AI Detection Risk)

- [ ] Humanize INFS discussion (chapter 9)
- [ ] Humanize COMP discussion (chapter 9)
- [ ] Humanize INFS conclusion (chapter 10)
- [ ] Humanize COMP conclusion (chapter 10)
- [ ] Humanize INFS project proposal
- [ ] Humanize COMP project proposal

### Week 3 Priority (Medium AI Detection Risk)

- [ ] Humanize INFS SRS
- [ ] Humanize COMP SRS
- [ ] Humanize INFS SDS
- [ ] Humanize COMP SDS
- [ ] Humanize INFS analysis (chapter 4)
- [ ] Humanize COMP analysis (chapter 4)

### Week 4 Priority (Lower Priority)

- [ ] Humanize INFS design (chapter 5)
- [ ] Humanize COMP design (chapter 5)
- [ ] Humanize INFS implementation (chapter 6)
- [ ] Humanize COMP implementation (chapter 6)
- [ ] Humanize front matter files
- [ ] Humanize integration architecture

---

## PART 6: QUICK REFERENCE

### AI Detection Risk Levels

- **VERY HIGH:** Literature reviews, academic writing with formal structure
- **HIGH:** Introduction, methodology, discussion, conclusion, proposals
- **MEDIUM:** Analysis, design, implementation, testing, results, SRS, SDS
- **LOW:** Code files, SQL files, LaTeX main files, references, appendices

### Most Effective Humanization Techniques

1. **Add personal reflections** (Most effective for high-risk files)
2. **Rewrite formal sentences** (Effective for all files)
3. **Add learning moments** (Effective for implementation/testing chapters)
4. **Add honest limitations** (Effective for discussion/conclusion chapters)
5. **Add student-like comments** (Effective for code files)

### Files That Can Be Left Mostly As-Is

- All Python code files (already have some student-like comments)
- SQL schema file (technical, less likely to be flagged)
- LaTeX main files (technical, less likely to be flagged)
- References and appendices (technical, less likely to be flagged)

---

## PART 7: TESTING AI DETECTION

### Recommended AI Detection Tools

1. **Turnitin** (If available through university)
2. **GPTZero** (Free online tool)
3. **Originality.ai** (Paid, more accurate)
4. **Content at Scale** (Free online tool)

### How to Test

1. Copy a section of text (500-1000 words)
2. Paste into AI detection tool
3. Note the AI detection percentage
4. If >30%, apply humanization strategies
5. Retest after humanization
6. Aim for <20% AI detection

### Testing Strategy

- Test literature reviews first (highest risk)
- Test introduction chapters second
- Test methodology chapters third
- Test other chapters as needed
- Focus on sections with >30% AI detection

---

## PART 8: FINAL TIPS

### Before Submission

1. Run AI detection on all high-risk files
2. Humanize sections with >30% AI detection
3. Have a peer review for natural language flow
4. Read aloud to identify awkward phrasing
5. Ensure all personal reflections sound authentic

### During Defense/Oral Presentation

1. Be prepared to explain all design decisions
2. Be honest about limitations and challenges
3. Show understanding of all concepts
4. Demonstrate that you wrote the content
5. Be ready to discuss implementation details

### Key Takeaway

The goal is not to eliminate AI assistance entirely (which is impossible), but to:
- Add enough personal content to show authentic understanding
- Demonstrate that you engaged with the material
- Show that you made design decisions
- Prove that you learned from the process

---

## END OF DOCUMENT

This document should be used as a guide for:
1. Understanding what each file contains
2. Identifying areas with high AI detection risk
3. Knowing where to make humanization changes
4. Studying the material for defense/presentation

Good luck with your project!
