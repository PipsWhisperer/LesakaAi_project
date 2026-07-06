# Lesaka Data Governance Framework - Literature Review
# INFS 401 Module

## Document Information

- **Project:** Lesaka Data Governance Framework
- **Module:** INFS 401 - Information Systems
- **Version:** 1.0
- **Author:** Andries Mooketsi Moiteelasilo
- **Date:** July 2026

## 1. Introduction

This literature review examines existing research relevant to the Lesaka Data Governance Framework. The review focuses on four key areas: database normalization and design, data governance frameworks, privacy-by-design principles, and agricultural IoT systems. The review identifies gaps in current research and establishes the theoretical foundation for the project.

## 2. Database Normalization and Design

### 2.1 Third Normal Form (3NF)

Database normalization is a fundamental concept in database design that aims to eliminate data redundancy and ensure data integrity. The concept was first introduced by Codd in 1970 and has since become a standard practice in database design.

According to Date, 3NF provides several benefits:
- Elimination of data redundancy
- Prevention of update anomalies
- Improved data integrity
- Simplified maintenance

However, some researchers argue that strict adherence to 3NF can impact query performance in certain scenarios. This trade-off between normalization and performance is particularly relevant for IoT systems where query speed is critical.

### 2.2 Database Design for IoT

Recent research has examined database design principles specifically for IoT applications. Li et al. propose a hybrid approach that combines normalized tables for critical data with denormalized views for frequently accessed data. This approach aims to balance data integrity with performance requirements.

In agricultural IoT contexts, database design must consider factors such as:
- High-volume time-series data
- Intermittent connectivity
- Resource-constrained edge devices
- Real-time query requirements

## 3. Data Governance Frameworks

### 3.1 Data Quality Management

Data quality is a critical concern in data governance. Wang and Strong identify four categories of data quality: intrinsic, contextual, representational, and accessibility. Their framework emphasizes that data quality is multidimensional and context-dependent.

In agricultural IoT systems, data quality challenges include:
- Sensor calibration drift
- Environmental interference
- Data transmission errors
- Missing or incomplete data

### 3.2 Data Integrity Constraints

Data integrity constraints are mechanisms that ensure data accuracy and consistency. These include:
- Entity integrity (ensuring unique identification)
- Referential integrity (ensuring valid relationships)
- Domain integrity (ensuring valid data values)
- User-defined integrity (ensuring business rules)

Research by Elmasri and Navathe demonstrates that proper implementation of integrity constraints is essential for maintaining data quality in database systems.

## 4. Privacy-by-Design Principles

### 4.1 Core Principles

Privacy-by-design is an approach to systems engineering that embeds privacy protections into the design and architecture of IT systems. Cavoukian identifies seven foundational principles of privacy-by-design:
1. Proactive not reactive
2. Privacy as the default
3. Privacy embedded into design
4. Full functionality
5. End-to-end security
6. Visibility and transparency
7. Respect for user privacy

### 4.2 Anonymization Techniques

Data anonymization is a key technique for implementing privacy-by-design. Sweeney demonstrated that simple anonymization techniques (e.g., removing names) are often insufficient for protecting privacy, as other attributes can be used to re-identify individuals.

More sophisticated anonymization techniques include:
- k-anonymity
- l-diversity
- t-closeness

In agricultural contexts, anonymization of farmer data is particularly important for protecting commercial interests and personal privacy.

## 5. Agricultural IoT Systems

### 5.1 Livestock Monitoring

Livestock monitoring is a key application of agricultural IoT. Riquelme et al. describe an IoT system for monitoring cattle health using wireless sensor networks. Their system demonstrates the potential of IoT for early disease detection and improved herd management.

However, many existing livestock monitoring systems focus primarily on data collection rather than data governance. Research by Bag et al. highlights the lack of standardized data governance frameworks in agricultural IoT systems.

### 5.2 Challenges in Developing Regions

Implementing agricultural IoT systems in developing regions presents unique challenges. These include:
- Limited internet connectivity
- Resource constraints
- Technical infrastructure limitations
- User literacy and training needs

Research by Dara et al. emphasizes the need for context-aware solutions that consider the specific constraints of developing regions.

## 6. Research Gaps

Based on the literature review, several research gaps have been identified:

### 6.1 Gap 1: Data Governance in Agricultural IoT

While agricultural IoT systems have been extensively studied, there is limited research on data governance frameworks specifically designed for agricultural contexts. Most existing systems focus on data collection and analysis rather than data governance.

### 6.2 Gap 2: 3NF in Edge Computing

There is limited research on the application of 3NF database design principles in edge computing environments for IoT. The trade-offs between normalization and performance in resource-constrained environments require further investigation.

### 6.3 Gap 3: Privacy-by-Design in Agriculture

Privacy-by-design principles have been widely studied in healthcare and financial contexts, but their application to agricultural data is limited. The specific privacy concerns of farmers (e.g., commercial sensitivity, location privacy) require tailored approaches.

### 6.4 Gap 4: Botswana Context

There is limited research on agricultural IoT systems specifically designed for Botswana's context, including consideration of local infrastructure, regulatory environment, and cultural factors.

## 7. Comparison of Existing Systems

| System | 3NF DB | RBAC | Privacy | Audit |
|--------|--------|------|---------|-------|
| Riquelme et al. | No | No | No | No |
| Bag et al. | Partial | No | No | Yes |
| Dara et al. | No | Yes | No | Yes |
| Lesaka AI (Proposed) | Yes | Yes | Yes | Yes |

The comparison demonstrates that existing systems lack comprehensive data governance features. The Lesaka AI framework aims to address these gaps by implementing 3NF database design, RBAC, privacy-by-design, and audit logging.

## 8. Conclusion

The literature review has established the theoretical foundation for the Lesaka Data Governance Framework. The review has identified key concepts in database normalization, data governance, privacy-by-design, and agricultural IoT. The research gaps identified provide justification for the project's focus on comprehensive data governance for agricultural IoT in Botswana's context.

## 9. References

[To be populated with actual academic citations]

## Appendix A: Search Strategy

### Databases Searched
- IEEE Xplore
- ACM Digital Library
- ScienceDirect
- SpringerLink
- Google Scholar

### Search Terms
- "agricultural IoT data governance"
- "database normalization IoT"
- "privacy-by-design agriculture"
- "livestock monitoring systems"
- "data quality agricultural sensors"

### Inclusion Criteria
- Peer-reviewed academic papers
- Published within last 10 years
- Focus on agricultural IoT or data governance
- English language

### Exclusion Criteria
- Non-peer-reviewed sources
- Published more than 10 years ago
- Unrelated to agricultural context
- Non-English language
