# Lesaka Data Governance Framework - Software Requirements Specification (SRS)
# INFS 401 Module

## Document Information

- **Project:** Lesaka Data Governance Framework
- **Module:** INFS 401 - Information Systems
- **Version:** 1.0
- **Author:** Andries Mooketsi Moiteelasilo
- **Date:** July 2026

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the Lesaka Data Governance Framework, a system designed to provide comprehensive data governance for agricultural IoT in Botswana. The system focuses on database design, data validation, role-based access control, and privacy protection.

### 1.2 Scope
The system provides:
- 3NF-compliant database schema for agricultural telemetry data
- Data validation engine with quality scoring
- Role-based access control (RBAC) system
- Privacy-by-design features including anonymized farmer IDs
- Audit logging for data access tracking

### 1.3 Definitions
- **3NF:** Third Normal Form - A database design principle that eliminates redundancy
- **RBAC:** Role-Based Access Control - Method of regulating access based on user roles
- **Privacy-by-Design:** An approach that embeds privacy protections into system design
- **Data Governance:** Overall management of data availability, usability, integrity, and security

## 2. Overall Description

### 2.1 Product Perspective
The Lesaka Data Governance Framework is a standalone system that provides data management capabilities for agricultural IoT applications. It integrates with the COMP Multi-Agent Orchestration System through a well-defined API contract.

### 2.2 Product Functions
- Database management with 3NF schema
- Data validation and quality scoring
- User management with RBAC
- Privacy protection through anonymization
- Audit logging for compliance

### 2.3 User Characteristics
- **Farmers:** Register cattle, view data, receive alerts
- **Administrators:** Manage users, view audit logs, configure system
- **Brokers:** View market information (restricted access)

### 2.4 Constraints
- System must run on standard hardware
- Database must be SQLite for edge deployment
- Backend must be Python-based
- Must comply with INFS 401 module requirements

## 3. Functional Requirements

### 3.1 Database Requirements

**DBR-001:** The system shall implement a 3NF-compliant database schema
- Priority: High
- Rationale: Ensures data integrity and eliminates redundancy

**DBR-002:** The system shall enforce referential integrity through foreign key constraints
- Priority: High
- Rationale: Prevents orphaned records and maintains data consistency

**DBR-003:** The system shall prevent data redundancy through normalization
- Priority: High
- Rationale: Eliminates update anomalies and maintenance issues

**DBR-004:** The system shall support data migration and backup
- Priority: Medium
- Rationale: Ensures data portability and disaster recovery

### 3.2 Data Validation Requirements

**DVR-001:** The system shall validate temperature readings (30.0-45.0°C)
- Priority: High
- Rationale: Ensures physiological validity of sensor data

**DVR-002:** The system shall validate district names against Botswana regions
- Priority: High
- Rationale: Ensures data consistency with operational regions

**DVR-003:** The system shall validate data types for all fields
- Priority: High
- Rationale: Prevents data type errors and ensures data quality

**DVR-004:** The system shall provide data quality scoring
- Priority: Medium
- Rationale: Enables monitoring of data quality over time

### 3.3 RBAC Requirements

**RBR-001:** The system shall implement role-based access control
- Priority: High
- Rationale: Ensures appropriate access control for different user types

**RBR-002:** The system shall support three user roles (admin, farmer, broker)
- Priority: High
- Rationale: Provides appropriate access levels for different stakeholders

**RBR-003:** The system shall restrict broker access to GPS coordinates
- Priority: High
- Rationale: Implements privacy-by-design for sensitive location data

**RBR-004:** The system shall log all access attempts
- Priority: High
- Rationale: Provides audit trail for compliance and security

### 3.4 Privacy Requirements

**PRR-001:** The system shall generate anonymized owner IDs for farmers
- Priority: High
- Rationale: Protects farmer privacy through anonymization

**PRR-002:** The system shall separate personal data from telemetry data
- Priority: High
- Rationale: Reduces privacy risk through data separation

**PRR-003:** The system shall implement audit logging for data access
- Priority: High
- Rationale: Provides accountability and compliance tracking

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

**NFR-001:** Database queries shall complete within 50ms (p95)
- Priority: High
- Rationale: Ensures responsive user experience

**NFR-002:** The system shall support 10,000 telemetry records per day
- Priority: Medium
- Rationale: Supports expected data volume

**NFR-003:** Data validation shall complete within 10ms per record
- Priority: Medium
- Rationale: Ensures efficient data processing

### 4.2 Security Requirements

**NFR-004:** The system shall enforce RBAC at all data access points
- Priority: High
- Rationale: Ensures consistent access control

**NFR-005:** The system shall log all data access attempts
- Priority: High
- Rationale: Provides security audit trail

**NFR-006:** The system shall prevent SQL injection through parameterized queries
- Priority: High
- Rationale: Prevents SQL injection attacks

### 4.3 Reliability Requirements

**NFR-007:** The system shall maintain 99.9% data consistency
- Priority: High
- Rationale: Ensures data integrity

**NFR-008:** The system shall recover from database errors gracefully
- Priority: Medium
- Rationale: Ensures system stability

### 4.4 Usability Requirements

**NFR-009:** The system shall provide clear error messages
- Priority: Medium
- Rationale: Improves user experience

**NFR-010:** The system shall document all validation rules
- Priority: Medium
- Rationale: Ensures maintainability

## 5. Business Rules

**BR-001:** All data must pass 3NF validation before storage
- Rationale: Ensures data integrity

**BR-002:** Broker users cannot access GPS coordinates
- Rationale: Implements privacy-by-design

**BR-003:** All data access must be logged for audit trail
- Rationale: Provides accountability

**BR-004:** District must be one of: Orapa, Serowe, Maun, Ghanzi, Francistown, Gaborone, Lobatse
- Rationale: Ensures operational consistency

**BR-005:** Temperature readings outside 30.0-45.0°C shall be rejected
- Rationale: Ensures physiological validity

## 6. Use Cases

### 6.1 Use Case 1: Farmer Registration
- **Actor:** Farmer
- **Precondition:** User is not registered
- **Main Flow:**
  1. User navigates to registration page
  2. User enters personal details and district
  3. System validates district against allowed regions
  4. System generates anonymized owner ID
  5. System stores farmer information in 3NF-compliant database
  6. System confirms successful registration
- **Postcondition:** User is registered with anonymized owner ID
- **Alternative Flow:** Invalid district → System rejects registration with error message

### 6.2 Use Case 2: Data Validation
- **Actor:** Validation Engine
- **Precondition:** Telemetry data is received
- **Main Flow:**
  1. System receives telemetry data
  2. System validates temperature range (30.0-45.0°C)
  3. System validates data types
  4. System calculates data quality score
  5. System stores valid data with quality score
  6. System rejects invalid data with reason
- **Postcondition:** Data is validated and stored or rejected with reason

### 6.3 Use Case 3: RBAC Enforcement
- **Actor:** User (any role)
- **Precondition:** User attempts to access data
- **Main Flow:**
  1. User requests access to data
  2. System checks user role
  3. System checks permission matrix for role
  4. System grants or denies access based on permissions
  5. System logs access attempt
- **Postcondition:** Access is granted or denied with audit log
- **Alternative Flow:** Broker requests GPS → System denies access

## 7. Data Requirements

### 7.1 Data Dictionary

| Table | Field | Type | Description |
|-------|-------|------|-------------|
| farmers | farmer_id | INTEGER | Unique identifier |
| farmers | owner_id | TEXT | Anonymized token |
| farmers | full_name | TEXT | Farmer's full name |
| farmers | district | TEXT | Operational district |
| farmers | registration_date | TEXT | Registration timestamp |
| cattle | cattle_id | TEXT | Unique cattle identifier |
| cattle | owner_id | TEXT | Reference to farmers |
| cattle | breed | TEXT | Cattle breed |
| cattle | birth_date | TEXT | Date of birth |
| cattle | gender | TEXT | Male/Female |
| telemetry_logs | log_id | INTEGER | Log identifier |
| telemetry_logs | cattle_id | TEXT | Reference to cattle |
| telemetry_logs | temperature | REAL | Temperature reading |
| telemetry_logs | heart_rate | INTEGER | Heart rate reading |
| telemetry_logs | timestamp | TEXT | Reading timestamp |
| telemetry_logs | validation_status | TEXT | VALID/REJECTED |

## 8. Interface Requirements

### 8.1 User Interfaces
- Farmer registration interface
- Cattle management interface
- Data validation dashboard
- Audit log viewer

### 8.2 Software Interfaces
- API for COMP project integration
- Database interface for data access
- Validation engine interface

## 9. Verification Requirements

### 9.1 Testing Requirements
- Unit testing for all components
- Integration testing for component interactions
- System testing for end-to-end functionality
- Validation testing against INFS 401 requirements

### 9.2 Acceptance Criteria
- All functional requirements met
- All non-functional requirements met
- 3NF compliance verified
- RBAC implementation verified
- Privacy features verified

## Appendix A: Requirements Traceability Matrix

| Requirement ID | Design Component | Test Case | Status |
|---------------|-----------------|-----------|--------|
| DBR-001 | Database Schema | TC-DB-001 | Pending |
| DVR-001 | Validation Engine | TC-VAL-001 | Pending |
| RBR-001 | RBAC System | TC-RBAC-001 | Pending |
| PRR-001 | Privacy Features | TC-PRIV-001 | Pending |
