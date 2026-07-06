-- ==============================================================================
-- LESAKA AI: DATABASE SCHEMA DESIGN (INFS 401)
-- 3NF Normalized Schema for Agricultural Telemetry Data
-- ==============================================================================

-- Table 1: Farmers (Anonymized for Privacy-by-Design)
-- This table stores farmer information with anonymized owner IDs
-- 3NF Compliance: All attributes depend only on farmer_id (PK)
CREATE TABLE IF NOT EXISTS farmers (
    farmer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id TEXT UNIQUE NOT NULL,  -- Anonymized token for privacy
    full_name TEXT,
    district TEXT,
    registration_date TEXT
);

-- Table 2: Cattle (Linked to farmers via owner_id)
-- This table stores cattle information linked to anonymized owners
-- 3NF Compliance: All non-key attributes depend only on cattle_id (PK)
-- Foreign key ensures referential integrity
CREATE TABLE IF NOT EXISTS cattle (
    cattle_id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL,
    breed TEXT,
    birth_date TEXT,
    gender TEXT,
    FOREIGN KEY (owner_id) REFERENCES farmers(owner_id)
);

-- Table 3: Telemetry Logs (Normalized sensor data)
-- This table stores sensor readings linked to specific cattle
-- 3NF Compliance: All non-key attributes depend only on log_id (PK)
-- Foreign keys ensure referential integrity
CREATE TABLE IF NOT EXISTS telemetry_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cattle_id TEXT NOT NULL,
    temperature REAL NOT NULL,
    heart_rate INTEGER,
    timestamp TEXT NOT NULL,
    validation_status TEXT,
    FOREIGN KEY (cattle_id) REFERENCES cattle(cattle_id)
);

-- Indexes for Performance Optimization
-- Added these after noticing slow queries during testing
CREATE INDEX IF NOT EXISTS idx_telemetry_cattle ON telemetry_logs(cattle_id);
CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON telemetry_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_cattle_owner ON cattle(owner_id);

-- ==============================================================================
-- 3NF NORMALIZATION PROOFS
-- ==============================================================================

-- First Normal Form (1NF):
-- - All tables have primary keys
-- - All attributes contain atomic values (no repeating groups)
-- - All rows are unique

-- Second Normal Form (2NF):
-- - All tables are in 1NF
-- - No partial dependencies (all non-key attributes depend on entire PK)
-- - cattle table: breed, birth_date, gender depend on full cattle_id
-- - telemetry_logs: temperature, heart_rate, timestamp depend on full log_id

-- Third Normal Form (3NF):
-- - All tables are in 2NF
-- - No transitive dependencies
-- - farmers: full_name, district, registration_date depend only on farmer_id
-- - cattle: breed, birth_date, gender depend only on cattle_id
-- - telemetry_logs: all fields depend only on log_id

-- ==============================================================================
-- DATA INTEGRITY CONSTRAINTS
-- ==============================================================================

-- Referential Integrity:
-- - Foreign keys ensure no orphaned records
-- - Cannot delete farmer with registered cattle
-- - Cannot delete cattle with telemetry logs

-- Domain Integrity:
-- - Temperature range: 30.0-45.0°C (enforced in application layer)
-- - District validation: Botswana regions only (enforced in application layer)
-- - Owner ID uniqueness: UNIQUE constraint on owner_id

-- Entity Integrity:
-- - Primary keys ensure unique identification
-- - AUTOINCREMENT for sequential IDs
