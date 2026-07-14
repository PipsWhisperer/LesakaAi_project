# Lesaka AI System - Class Diagram (INFS 401)

## Classes

### DatabaseEngine
**Attributes:**
- `connection: sqlite3.Connection` - Database connection
- `cursor: sqlite3.Cursor` - Database cursor

**Methods:**
- `connect(database_path: str) -> None`
- `close() -> None`
- `execute_query(query: str, params: tuple) -> List[Dict]`
- `execute_update(query: str, params: tuple) -> int`

### ValidationEngine
**Attributes:**
- `validators: Dict[str, Validator]` - Available validators
- `quality_scorer: QualityScorer` - Quality scoring instance

**Methods:**
- `validate(data: TelemetryData) -> ValidationResult`
- `register_validator(name: str, validator: Validator) -> None`
- `calculate_quality_score(data: TelemetryData) -> float`

### Validator (Abstract Base Class)
**Attributes:**
- `validator_name: str` - Validator identifier
- `error_message: str` - Error message template

**Methods:**
- `validate(value: Any) -> bool` (abstract)
- `get_error_message() -> str`

### TemperatureValidator (extends Validator)
**Attributes:**
- `min_temp: float = 30.0`
- `max_temp: float = 45.0`

**Methods:**
- `validate(value: float) -> bool`
- `get_error_message() -> str`

### DistrictValidator (extends Validator)
**Attributes:**
- `allowed_districts: List[str]` - Valid Botswana districts

**Methods:**
- `validate(value: str) -> bool`
- `get_error_message() -> str`

### OwnerIdValidator (extends Validator)
**Attributes:**
- `existing_ids: Set[str]` - Existing owner IDs

**Methods:**
- `validate(value: str) -> bool`
- `get_error_message() -> str`

### QualityScorer
**Attributes:**
- `completeness_weight: float = 0.3`
- `validity_weight: float = 0.4`
- `consistency_weight: float = 0.3`

**Methods:**
- `calculate_score(data: TelemetryData) -> float`
- `calculate_completeness(data: TelemetryData) -> float`
- `calculate_validity(data: TelemetryData) -> float`
- `calculate_consistency(data: TelemetryData) -> float`

### RBACEngine
**Attributes:**
- `permission_matrix: Dict[Role, Set[Permission]]` - Permission assignments
- `user_roles: Dict[str, Role]` - User role assignments

**Methods:**
- `check_permission(user_id: str, permission: Permission) -> bool`
- `assign_role(user_id: str, role: Role) -> None`
- `get_user_role(user_id: str) -> Role`

### SecurityModule
**Attributes:**
- `audit_logger: AuditLogger` - Audit logging instance
- `encryption_key: str` - Encryption key

**Methods:**
- `log_access(user_id: str, action: str, resource: str) -> None`
- `encrypt_data(data: str) -> str`
- `decrypt_data(encrypted: str) -> str`

### AuditLogger
**Attributes:**
- `log_entries: List[AuditLogEntry]` - Audit log storage

**Methods:**
- `log(user_id: str, action: str, resource: str, success: bool) -> None`
- `get_logs(user_id: str = None) -> List[AuditLogEntry]`
- `export_logs(format: str) -> str`

### Farmer (Database Entity)
**Attributes:**
- `farmer_id: int` - Primary key
- `owner_id: str` - Anonymized token (UNIQUE)
- `full_name: str` - Farmer's full name
- `district: str` - Operational district
- `registration_date: datetime` - Registration timestamp

**Methods:**
- `save() -> None`
- `delete() -> None`
- `to_dict() -> Dict`

### Cattle (Database Entity)
**Attributes:**
- `cattle_id: str` - Primary key
- `owner_id: str` - Foreign key to Farmer
- `breed: str` - Cattle breed
- `birth_date: date` - Date of birth
- `gender: str` - Male/Female

**Methods:**
- `save() -> None`
- `delete() -> None`
- `to_dict() -> Dict`
- `get_owner() -> Farmer`

### TelemetryLog (Database Entity)
**Attributes:**
- `log_id: int` - Primary key
- `cattle_id: str` - Foreign key to Cattle
- `temperature: float` - Temperature reading
- `heart_rate: int` - Heart rate reading
- `timestamp: datetime` - Reading timestamp
- `validation_status: str` - VALID/REJECTED

**Methods:**
- `save() -> None`
- `delete() -> None`
- `to_dict() -> Dict`
- `get_cattle() -> Cattle`

### ValidationResult
**Attributes:**
- `is_valid: bool` - Overall validation status
- `errors: List[str]` - Validation errors
- `quality_score: float` - Data quality score

### AuditLogEntry
**Attributes:**
- `timestamp: datetime` - Log timestamp
- `user_id: str` - User identifier
- `action: str` - Action performed
- `resource: str` - Resource accessed
- `success: bool` - Success/failure status

## Enums

### Role
- ADMIN
- FARMER
- BROKER

### Permission
- READ_ALL_DATA
- READ_OWN_DATA
- WRITE_OWN_DATA
- ACCESS_GPS
- VIEW_AUDIT_LOGS
- MANAGE_USERS

## Relationships

### Inheritance
- TemperatureValidator extends Validator
- DistrictValidator extends Validator
- OwnerIdValidator extends Validator

### Composition
- ValidationEngine contains Validator instances
- ValidationEngine contains QualityScorer
- RBACEngine contains permission matrix
- SecurityModule contains AuditLogger

### Association
- DatabaseEngine manages Farmer, Cattle, TelemetryLog entities
- Cattle belongs to Farmer (many-to-one)
- TelemetryLog belongs to Cattle (many-to-one)
- ValidationEngine validates TelemetryLog data
- RBACEngine controls access to entities

### Dependency
- ValidationEngine depends on DatabaseEngine for data access
- RBACEngine depends on SecurityModule for audit logging

## Class Diagram (ASCII Representation)

```
┌─────────────────┐
│ DatabaseEngine  │
├─────────────────┤
│ - connection    │
│ - cursor       │
├─────────────────┤
│ + connect()    │
│ + close()      │
│ + execute_query()│
│ + execute_update()│
└────────┬────────┘
         │
         │ manages
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
┌───▼────┐ ┌──▼────┐ ┌──▼────┐ ┌──▼────┐
│ Farmer │ │ Cattle│ │Telemetry│ │  ...  │
└────────┘ └───┬───┘ └────────┘ └────────┘
              │
              │ has many
              │
         ┌────▼────┐
         │Telemetry│
         │   Log   │
         └─────────┘

┌─────────────────┐
│ValidationEngine │
├─────────────────┤
│ - validators   │
│ - quality_scorer│
├─────────────────┤
│ + validate()   │
│ + register()   │
│ + calc_score() │
└────────┬────────┘
         │
         │ contains
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
┌───▼─────────▼─┐ ┌──▼────┐ ┌──▼────┐
│   Validator    │ │Quality│ │  ...  │
│  (Abstract)    │ │Scorer │ │       │
├────────────────┤ ├───────┤ └────────┘
│ - validator_name│ │ - weights│
│ - error_msg    │ ├───────┤
├────────────────┤ │ + calc()│
│ + validate()   │ │ + comp()│
│ + get_error()  │ │ + valid()│
└────┬───────────┘ │ + cons()│
     │            └────────┘
     │ extends
     │
┌────┴────┬──────────┐
│         │          │
┌──▼────┐ ┌──▼────┐ ┌──▼────┐
│Temp   │ │District│ │Owner  │
│Valid  │ │Valid  │ │Valid  │
└───────┘ └───────┘ └───────┘

┌─────────────────┐
│   RBACEngine    │
├─────────────────┤
│ - permission_mtx│
│ - user_roles    │
├─────────────────┤
│ + check_perm()  │
│ + assign_role() │
│ + get_role()    │
└─────────────────┘

┌─────────────────┐
│ SecurityModule  │
├─────────────────┤
│ - audit_logger  │
│ - encryption_key│
├─────────────────┤
│ + log_access()  │
│ + encrypt()     │
│ + decrypt()     │
└────────┬────────┘
         │
         │ contains
         │
    ┌────▼────┐
    │AuditLog │
    │  ger    │
    ├─────────┤
    │ - logs  │
    ├─────────┤
    │ + log() │
    │ + get() │
    │ + export()│
    └─────────┘
```
