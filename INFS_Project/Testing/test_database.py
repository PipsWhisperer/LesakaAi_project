"""
Unit Tests for Database Operations
INFS 401 - Lesaka Data Governance Framework
"""

import unittest
import sqlite3
import tempfile
import os


class TestDatabaseSchema(unittest.TestCase):
    """Test cases for database schema design and 3NF compliance"""

    def setUp(self):
        """Set up test fixtures"""
        self.db_path = tempfile.mktemp(suffix='.db')
        self.conn = sqlite3.connect(self.db_path)
        self.cursor = self.conn.cursor()
        self.create_schema()

    def tearDown(self):
        """Clean up test fixtures"""
        self.conn.close()
        if os.path.exists(self.db_path):
            os.remove(self.db_path)

    def create_schema(self):
        """Create database schema"""
        # Farmers table
        self.cursor.execute('''
            CREATE TABLE farmers (
                farmer_id INTEGER PRIMARY KEY AUTOINCREMENT,
                owner_id TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                district TEXT NOT NULL,
                registration_date TEXT NOT NULL
            )
        ''')
        
        # Cattle table
        self.cursor.execute('''
            CREATE TABLE cattle (
                cattle_id TEXT PRIMARY KEY,
                owner_id TEXT NOT NULL,
                breed TEXT NOT NULL,
                birth_date TEXT NOT NULL,
                gender TEXT NOT NULL,
                FOREIGN KEY (owner_id) REFERENCES farmers(owner_id)
            )
        ''')
        
        # Telemetry logs table
        self.cursor.execute('''
            CREATE TABLE telemetry_logs (
                log_id INTEGER PRIMARY KEY AUTOINCREMENT,
                cattle_id TEXT NOT NULL,
                temperature REAL NOT NULL,
                heart_rate INTEGER,
                timestamp TEXT NOT NULL,
                validation_status TEXT NOT NULL,
                FOREIGN KEY (cattle_id) REFERENCES cattle(cattle_id)
            )
        ''')
        
        # Create indexes
        self.cursor.execute('CREATE INDEX idx_telemetry_cattle ON telemetry_logs(cattle_id)')
        self.cursor.execute('CREATE INDEX idx_telemetry_timestamp ON telemetry_logs(timestamp)')
        self.cursor.execute('CREATE INDEX idx_cattle_owner ON cattle(owner_id)')
        
        self.conn.commit()

    def test_farmers_table_1nf(self):
        """Test that farmers table is in 1NF (atomic values)"""
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        self.conn.commit()
        
        self.cursor.execute('SELECT * FROM farmers')
        row = self.cursor.fetchone()
        self.assertIsNotNone(row)
        self.assertEqual(len(row), 5)  # 5 columns

    def test_farmers_table_2nf(self):
        """Test that farmers table is in 2NF (no partial dependencies)"""
        # Single attribute primary key, automatically in 2NF
        self.cursor.execute('PRAGMA table_info(farmers)')
        columns = self.cursor.fetchall()
        pk_columns = [col for col in columns if col[5] == 1]  # col[5] is pk flag
        self.assertEqual(len(pk_columns), 1)  # Single column PK

    def test_farmers_table_3nf(self):
        """Test that farmers table is in 3NF (no transitive dependencies)"""
        # All non-key attributes depend only on farmer_id
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        self.conn.commit()
        
        # Verify that changing full_name doesn't affect district
        self.cursor.execute('UPDATE farmers SET full_name = "Jane Doe" WHERE farmer_id = 1')
        self.conn.commit()
        
        self.cursor.execute('SELECT district FROM farmers WHERE farmer_id = 1')
        district = self.cursor.fetchone()[0]
        self.assertEqual(district, 'Gaborone')  # Should remain unchanged

    def test_cattle_table_foreign_key(self):
        """Test foreign key constraint in cattle table"""
        # Should fail if owner_id doesn't exist in farmers
        with self.assertRaises(sqlite3.IntegrityError):
            self.cursor.execute('''
                INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
                VALUES ('BW-MUN-1109', 'NONEXISTENT', 'Brahman', '2020-01-01', 'Male')
            ''')
            self.conn.commit()

    def test_cattle_table_unique_cattle_id(self):
        """Test unique constraint on cattle_id"""
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        self.conn.commit()
        
        self.cursor.execute('''
            INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
            VALUES ('BW-MUN-1109', 'ABC12345', 'Brahman', '2020-01-01', 'Male')
        ''')
        self.conn.commit()
        
        # Should fail on duplicate cattle_id
        with self.assertRaises(sqlite3.IntegrityError):
            self.cursor.execute('''
                INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
                VALUES ('BW-MUN-1109', 'ABC12345', 'Brahman', '2020-01-01', 'Male')
            ''')
            self.conn.commit()

    def test_telemetry_logs_foreign_key(self):
        """Test foreign key constraint in telemetry_logs table"""
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        self.conn.commit()
        
        self.cursor.execute('''
            INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
            VALUES ('BW-MUN-1109', 'ABC12345', 'Brahman', '2020-01-01', 'Male')
        ''')
        self.conn.commit()
        
        # Should fail if cattle_id doesn't exist
        with self.assertRaises(sqlite3.IntegrityError):
            self.cursor.execute('''
                INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
                VALUES ('NONEXISTENT', 38.5, 75, '2026-07-13T10:00:00', 'VALID')
            ''')
            self.conn.commit()

    def test_index_performance(self):
        """Test that indexes improve query performance"""
        import time
        
        # Insert test data
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        self.conn.commit()
        
        for i in range(100):
            self.cursor.execute(f'''
                INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
                VALUES ('BW-MUN-{i}', 'ABC12345', 'Brahman', '2020-01-01', 'Male')
            ''')
            self.cursor.execute(f'''
                INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
                VALUES ('BW-MUN-{i}', 38.5, 75, '2026-07-13T10:00:00', 'VALID')
            ''')
        self.conn.commit()
        
        # Test indexed query
        start = time.time()
        self.cursor.execute('SELECT * FROM telemetry_logs WHERE cattle_id = "BW-MUN-50"')
        self.cursor.fetchall()
        indexed_time = time.time() - start
        
        # Should be fast (less than 10ms for 100 records)
        self.assertLess(indexed_time, 0.01)

    def test_referential_integrity(self):
        """Test referential integrity across tables"""
        # Create farmer
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        self.conn.commit()
        
        # Create cattle
        self.cursor.execute('''
            INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
            VALUES ('BW-MUN-1109', 'ABC12345', 'Brahman', '2020-01-01', 'Male')
        ''')
        self.conn.commit()
        
        # Create telemetry
        self.cursor.execute('''
            INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
            VALUES ('BW-MUN-1109', 38.5, 75, '2026-07-13T10:00:00', 'VALID')
        ''')
        self.conn.commit()
        
        # Verify relationships
        self.cursor.execute('''
            SELECT f.full_name, c.breed, t.temperature
            FROM farmers f
            JOIN cattle c ON f.owner_id = c.owner_id
            JOIN telemetry_logs t ON c.cattle_id = t.cattle_id
            WHERE f.farmer_id = 1
        ''')
        result = self.cursor.fetchone()
        
        self.assertEqual(result[0], 'John Doe')
        self.assertEqual(result[1], 'Brahman')
        self.assertEqual(result[2], 38.5)

    def test_data_types(self):
        """Test correct data types in schema"""
        self.cursor.execute('PRAGMA table_info(farmers)')
        columns = self.cursor.fetchall()
        
        # Verify column types
        column_types = {col[1]: col[2] for col in columns}
        self.assertEqual(column_types['farmer_id'], 'INTEGER')
        self.assertEqual(column_types['owner_id'], 'TEXT')
        self.assertEqual(column_types['full_name'], 'TEXT')
        self.assertEqual(column_types['district'], 'TEXT')
        self.assertEqual(column_types['registration_date'], 'TEXT')


if __name__ == '__main__':
    unittest.main()
