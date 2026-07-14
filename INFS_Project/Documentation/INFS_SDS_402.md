# Lesaka Data Governance Framework - Software Design Specification
# INFS 402 Module: Advanced Data Governance and Security

## Student Information

- **Name:** Andries Mooketsi Moiteelasilo
- **Student ID:** 20001371
- **Module:** INFS 402 - Information Systems and Data Management
- **Supervisor:** Dr. Sarah Johnson
- **Date:** July 2026

## 1. Introduction

### 1.1 Purpose

This document provides the software design specification for the INFS 402 component of the Lesaka AI system. The INFS 402 module extends the foundational data governance framework established in INFS 401 by implementing advanced security mechanisms, comprehensive audit logging, and role-based access control (RBAC) systems that align with international data protection standards including GDPR and the Botswana Data Protection Act.

### 1.2 Scope

The INFS 402 implementation focuses on three core areas:

1. **Role-Based Access Control (RBAC):** A hierarchical permission system that enforces the principle of least privilege across all system operations
2. **Audit Logging:** Comprehensive logging of all system access, modifications, and administrative actions for compliance and forensic analysis
3. **Data Encryption:** Implementation of encryption-at-rest and encryption-in-transit mechanisms to protect sensitive agricultural and farmer data

### 1.3 System Context

The INFS 402 module operates as a security layer between the INFS 401 data validation engine and the COMP 401/402 multi-agent orchestrator. All data access requests must pass through the RBAC engine, and all modifications are logged through the audit logging system before being persisted to the database.

## 2. RBAC Design

### 2.1 Role Hierarchy

The system implements a three-tier role hierarchy that reflects the operational requirements of Botswana's agricultural sector:

```
┌─────────────────────────────────────┐
│           ADMIN                      │
│  (Full system access and control)   │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────┐  ┌─────▼──────┐
│   FARMER    │  │   BROKER   │
│ (Own data)  │  │ (Read-only)│
└─────────────┘  └────────────┘
```

### 2.2 Permission Matrix

The permission matrix defines the specific capabilities available to each role:

| Permission | ADMIN | FARMER | BROKER |
|------------|-------|--------|--------|
| READ_ALL_DATA | ✓ | ✗ | ✓ |
| READ_OWN_DATA | ✓ | ✓ | ✓ |
| WRITE_OWN_DATA | ✓ | ✓ | ✗ |
| ACCESS_GPS | ✓ | ✓ | ✗ |
| VIEW_AUDIT_LOGS | ✓ | ✗ | ✗ |
| MANAGE_USERS | ✓ | ✗ | ✗ |
| MODIFY_RBMAC | ✓ | ✗ | ✗ |

### 2.3 RBAC Engine Architecture

The RBAC engine consists of three primary components:

#### 2.3.1 Permission Checker

The permission checker validates user requests against the permission matrix before allowing access to system resources. The checker operates in O(1) time complexity through hash-based lookups.

#### 2.3.2 Role Manager

The role manager handles role assignment, modification, and revocation. All role changes require administrative privileges and are automatically logged to the audit trail.

#### 2.3.3 Context Validator

The context validator ensures that data access requests are contextually appropriate. For example, a broker can view cattle health data but cannot access GPS coordinates, ensuring privacy-by-design compliance.

### 2.4 RBAC Implementation

```python
class RBACEngine:
    def __init__(self):
        self.permission_matrix = {
            Role.ADMIN: {
                Permission.READ_ALL_DATA,
                Permission.READ_OWN_DATA,
                Permission.WRITE_OWN_DATA,
                Permission.ACCESS_GPS,
                Permission.VIEW_AUDIT_LOGS,
                Permission.MANAGE_USERS
            },
            Role.FARMER: {
                Permission.READ_OWN_DATA,
                Permission.WRITE_OWN_DATA,
                Permission.ACCESS_GPS
            },
            Role.BROKER: {
                Permission.READ_ALL_DATA
            }
        }
        self.user_roles = {}
    
    def check_permission(self, user_id: str, permission: Permission) -> bool:
        if user_id not in self.user_roles:
            return False
        
        user_role = self.user_roles[user_id]
        if user_role not in self.permission_matrix:
            return False
        
        return permission in self.permission_matrix[user_role]
```

## 3. Audit Logging Design

### 3.1 Audit Data Model

The audit logging system captures the following information for all auditable events:

| Field | Type | Description |
|-------|------|-------------|
| audit_id | INTEGER | Primary key |
| timestamp | DATETIME | Event timestamp (UTC) |
| user_id | TEXT | User identifier |
| action | TEXT | Action performed |
| resource | TEXT | Resource accessed/modified |
| ip_address | TEXT | Client IP address |
| user_agent | TEXT | Client user agent |
| success | BOOLEAN | Operation success status |
| details | TEXT | Additional context (JSON) |

### 3.2 Audit Event Types

The system categorizes audit events into four types:

1. **ACCESS Events:** Read operations on system resources
2. **MODIFY Events:** Write operations that change system state
3. **ADMIN Events:** Administrative actions (user management, role changes)
4. **SECURITY Events:** Failed authentication attempts, permission denials

### 3.3 Audit Logger Architecture

The audit logger implements an asynchronous write-ahead logging pattern to ensure that audit records are persisted even if the primary operation fails.

#### 3.3.1 Synchronous Audit Path

For critical operations, the audit logger uses a synchronous write path:

```
Operation Request → Permission Check → Audit Write → Operation Execution
```

#### 3.3.2 Asynchronous Audit Path

For high-volume operations, the audit logger uses an asynchronous queue:

```
Operation Request → Permission Check → Operation Execution → Audit Queue → Async Write
```

### 3.4 Audit Log Retention

Audit logs are retained according to the following policy:

- **ACCESS Events:** 90 days
- **MODIFY Events:** 365 days
- **ADMIN Events:** 365 days
- **SECURITY Events:** 730 days (2 years)

### 3.5 Audit Log Export

The system provides audit log export functionality in the following formats:

- CSV (for spreadsheet analysis)
- JSON (for programmatic processing)
- PDF (for formal reporting)

## 4. Data Encryption Design

### 4.1 Encryption-at-Rest

All sensitive data stored in the SQLite database is encrypted using AES-256-GCM encryption. The encryption keys are managed through a key derivation function (KDF) based on the user's master password.

#### 4.1.1 Encrypted Fields

The following database fields are encrypted:

- Farmers: full_name, owner_id
- Cattle: cattle_id (partial), gps_coordinates
- Telemetry: location_data

#### 4.1.2 Key Management

Encryption keys are derived using PBKDF2 with the following parameters:

- Salt: 128-bit random salt per database
- Iterations: 100,000
- Key length: 256 bits
- Hash function: SHA-256

### 4.2 Encryption-in-Transit

All communication between the frontend and backend is secured using TLS 1.3. The system enforces the following cipher suites:

- TLS_AES_256_GCM_SHA384
- TLS_CHACHA20_POLY1305_SHA256
- TLS_AES_128_GCM_SHA256

### 4.3 Data Masking

For display purposes, sensitive data is masked according to the following rules:

- Owner ID: First 4 characters visible, rest masked (e.g., "ABC1****")
- GPS Coordinates: Truncated to district level for brokers
- Phone Numbers: Last 4 digits visible (e.g., "+267 **** 1234")

## 5. Security Architecture

### 5.1 Defense in Depth

The system implements a defense-in-depth security architecture with multiple layers of protection:

1. **Network Layer:** TLS encryption, IP whitelisting
2. **Application Layer:** RBAC, input validation, rate limiting
3. **Data Layer:** Encryption-at-rest, audit logging
4. **Physical Layer:** Secure key storage, backup encryption

### 5.2 Threat Model

The system addresses the following threat categories:

| Threat | Mitigation |
|--------|------------|
| Unauthorized Access | RBAC, multi-factor authentication |
| Data Exfiltration | Encryption, audit logging |
| Insider Threat | Least privilege, audit trails |
| Data Tampering | Cryptographic integrity checks |
| Denial of Service | Rate limiting, caching |

### 5.3 Compliance

The system is designed to comply with:

- **GDPR:** Right to be forgotten, data portability, consent management
- **Botswana Data Protection Act:** Local data storage, privacy principles
- **ISO 27001:** Information security management

## 6. Integration with INFS 401

### 6.1 Data Flow

The INFS 402 security layer intercepts all data operations before they reach the INFS 401 validation engine:

```
Request → RBAC Check → Audit Log → Validation Engine → Database
```

### 6.2 API Integration

The INFS 402 module exposes the following API endpoints:

- `POST /api/authenticate` - User authentication
- `POST /api/authorize` - Permission check
- `GET /api/audit/logs` - Audit log retrieval (admin only)
- `POST /api/audit/export` - Audit log export (admin only)

### 6.3 Database Integration

The audit logs are stored in a separate database table (`audit_logs`) to ensure isolation from operational data. This separation allows for independent backup and retention policies.

## 7. Performance Considerations

### 7.1 RBAC Performance

The RBAC engine uses hash-based permission lookups, resulting in O(1) time complexity for permission checks. Permission matrices are cached in memory to avoid repeated database queries.

### 7.2 Audit Logging Performance

Asynchronous audit logging ensures that audit write operations do not block the main application flow. The audit queue is implemented using a bounded queue with overflow protection.

### 7.3 Encryption Performance

Encryption operations are performed at the application layer to minimize database load. Encryption keys are cached in memory with automatic rotation policies.

## 8. Error Handling

### 8.1 Permission Denied Errors

When a permission check fails, the system returns a 403 Forbidden response with the following information:

- User ID
- Requested permission
- Resource
- Timestamp

### 8.2 Audit Logging Errors

If audit logging fails, the system implements a fallback mechanism:

1. Write to local file system
2. Alert administrators
3. Queue for retry

### 8.3 Encryption Errors

Encryption errors are treated as critical failures:

1. Operation is aborted
2. Error is logged
3. Administrator is alerted
4. System enters safe mode

## 9. Testing Strategy

### 9.1 Unit Tests

Unit tests cover:

- Permission matrix validation
- Role assignment and revocation
- Audit log creation and retrieval
- Encryption and decryption operations
- Key derivation functions

### 9.2 Integration Tests

Integration tests verify:

- RBAC integration with INFS 401 validation engine
- Audit logging across all system operations
- Encryption of sensitive data fields
- End-to-end security workflows

### 9.3 Security Tests

Security tests include:

- Penetration testing
- SQL injection prevention
- Cross-site scripting (XSS) prevention
- Authentication bypass attempts

## 10. Deployment Considerations

### 10.1 Key Management

Encryption keys must be:

- Generated using cryptographically secure random number generators
- Stored in hardware security modules (HSM) where available
- Rotated according to organizational policy
- Backed up securely with offline storage

### 10.2 Audit Log Backup

Audit logs must be:

- Backed up daily
- Stored in immutable storage (WORM)
- Retained according to the retention policy
- Protected with write-once, read-many (WORM) storage

### 10.3 Monitoring

The system should monitor:

- Failed authentication attempts
- Permission denials
- Audit log write failures
- Encryption key expiration

## 11. Future Enhancements

### 11.1 Multi-Factor Authentication

Future versions will implement multi-factor authentication using:

- SMS-based OTP
- Time-based OTP (TOTP)
- Hardware tokens

### 11.2 Attribute-Based Access Control (ABAC)

The RBAC system will be extended to support attribute-based access control, allowing for more fine-grained permissions based on:

- Time of day
- Geographic location
- Device trust level

### 11.3 Blockchain Audit Trail

Future versions may implement a blockchain-based audit trail to ensure tamper-proof audit records.

## 12. Conclusion

The INFS 402 module provides a comprehensive security framework for the Lesaka AI system. By implementing RBAC, comprehensive audit logging, and data encryption, the system ensures that sensitive agricultural data is protected according to international standards while maintaining operational efficiency and usability for farmers, brokers, and administrators in Botswana.
