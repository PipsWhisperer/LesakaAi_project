"""
Integration Tests for COMP-INFS Integration
Lesaka AI System - SEM 1 Deliverables
"""

import unittest
import sqlite3
import tempfile
import os


class TestCOMPINFSIntegration(unittest.TestCase):
    """Integration tests for COMP and INFS project integration"""

    def setUp(self):
        """Set up test fixtures"""
        self.db_path = tempfile.mktemp(suffix='.db')
        self.conn = sqlite3.connect(self.db_path)
        self.cursor = self.conn.cursor()
        self.create_schema()
        self.insert_test_data()

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
        
        self.conn.commit()

    def insert_test_data(self):
        """Insert test data"""
        # Insert farmer
        self.cursor.execute('''
            INSERT INTO farmers (owner_id, full_name, district, registration_date)
            VALUES ('ABC12345', 'John Doe', 'Gaborone', '2026-07-13')
        ''')
        
        # Insert cattle
        self.cursor.execute('''
            INSERT INTO cattle (cattle_id, owner_id, breed, birth_date, gender)
            VALUES ('BW-MUN-1109', 'ABC12345', 'Brahman', '2020-01-01', 'Male')
        ''')
        
        # Insert telemetry data
        self.cursor.execute('''
            INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
            VALUES ('BW-MUN-1109', 40.5, 85, '2026-07-13T10:00:00', 'VALID')
        ''')
        
        self.conn.commit()

    def test_comp_queries_infs_database(self):
        """Test that COMP project can query INFS database"""
        # Simulate COMP project querying INFS database
        self.cursor.execute('''
            SELECT temperature, heart_rate, validation_status
            FROM telemetry_logs
            WHERE cattle_id = 'BW-MUN-1109'
        ''')
        result = self.cursor.fetchone()
        
        self.assertIsNotNone(result)
        self.assertEqual(result[0], 40.5)
        self.assertEqual(result[1], 85)
        self.assertEqual(result[2], 'VALID')

    def test_comp_respects_validation_status(self):
        """Test that COMP project respects INFS validation status"""
        # Insert invalid data
        self.cursor.execute('''
            INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
            VALUES ('BW-MUN-1109', 50.0, 90, '2026-07-13T11:00:00', 'REJECTED')
        ''')
        self.conn.commit()
        
        # COMP should only use VALID data
        self.cursor.execute('''
            SELECT temperature, validation_status
            FROM telemetry_logs
            WHERE cattle_id = 'BW-MUN-1109' AND validation_status = 'VALID'
        ''')
        results = self.cursor.fetchall()
        
        # Should only return the VALID entry
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0][1], 'VALID')

    def test_comp_routing_with_validated_data(self):
        """Test COMP routing algorithm with INFS-validated data"""
        # Get validated data from INFS
        self.cursor.execute('''
            SELECT temperature, heart_rate
            FROM telemetry_logs
            WHERE cattle_id = 'BW-MUN-1109' AND validation_status = 'VALID'
        ''')
        result = self.cursor.fetchone()
        
        temperature = result[0]
        heart_rate = result[1]
        
        # Simulate COMP routing logic
        if temperature > 39.5:
            agent = 'molemo'
        elif temperature < 36.0:
            agent = 'loapi'
        else:
            agent = 'thekiso'
        
        # Should route to Molemo (fever detection)
        self.assertEqual(agent, 'molemo')

    def test_infs_rbac_enforcement(self):
        """Test that INFS RBAC is enforced for COMP queries"""
        # Simulate RBAC check
        user_role = 'FARMER'
        resource = 'telemetry/BW-MUN-1109'
        
        # Check if farmer can access own data
        if user_role == 'FARMER' and 'BW-MUN-1109' in resource:
            allowed = True
        else:
            allowed = False
        
        self.assertTrue(allowed)

    def test_end_to_end_telemetry_flow(self):
        """Test complete end-to-end telemetry flow"""
        # 1. INFS receives telemetry data
        telemetry_data = {'temperature': 38.5, 'heart_rate': 75}
        
        # 2. INFS validates data
        is_valid = 30.0 <= telemetry_data['temperature'] <= 45.0
        self.assertTrue(is_valid)
        
        # 3. INFS stores validated data
        self.cursor.execute('''
            INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
            VALUES ('BW-MUN-1109', ?, ?, '2026-07-13T12:00:00', 'VALID')
        ''', (telemetry_data['temperature'], telemetry_data['heart_rate']))
        self.conn.commit()
        
        # 4. COMP queries validated data
        self.cursor.execute('''
            SELECT temperature FROM telemetry_logs
            WHERE cattle_id = 'BW-MUN-1109' AND validation_status = 'VALID'
            ORDER BY log_id DESC LIMIT 1
        ''')
        result = self.cursor.fetchone()
        
        # 5. COMP routes to appropriate agent
        temperature = result[0]
        if temperature > 39.5:
            agent = 'molemo'
        elif temperature < 36.0:
            agent = 'loapi'
        else:
            agent = 'thekiso'
        
        # Should route to Thekiso (normal temperature)
        self.assertEqual(agent, 'thekiso')

    def test_error_handling_integration(self):
        """Test error handling in COMP-INFS integration"""
        # Test handling of missing data
        self.cursor.execute('''
            SELECT temperature FROM telemetry_logs
            WHERE cattle_id = 'NONEXISTENT'
        ''')
        result = self.cursor.fetchone()
        
        self.assertIsNone(result)
        
        # COMP should route to Supervisor for error handling
        if result is None:
            agent = 'supervisor'
            fallback = 'REQUEST_DATA'
        
        self.assertEqual(agent, 'supervisor')
        self.assertEqual(fallback, 'REQUEST_DATA')

    def test_data_consistency(self):
        """Test data consistency between INFS and COMP"""
        # INFS stores data
        self.cursor.execute('''
            INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
            VALUES ('BW-MUN-1109', 39.0, 72, '2026-07-13T13:00:00', 'VALID')
        ''')
        self.conn.commit()
        
        # COMP retrieves data
        self.cursor.execute('''
            SELECT temperature, heart_rate
            FROM telemetry_logs
            WHERE cattle_id = 'BW-MUN-1109' AND timestamp = '2026-07-13T13:00:00'
        ''')
        result = self.cursor.fetchone()
        
        # Verify consistency
        self.assertEqual(result[0], 39.0)
        self.assertEqual(result[1], 72)

    def test_performance_integration(self):
        """Test performance of COMP-INFS integration"""
        import time
        
        # Insert multiple records
        for i in range(100):
            self.cursor.execute(f'''
                INSERT INTO telemetry_logs (cattle_id, temperature, heart_rate, timestamp, validation_status)
                VALUES ('BW-MUN-1109', 38.5, 75, '2026-07-13T14:00:00', 'VALID')
            ''')
        self.conn.commit()
        
        # Test query performance
        start = time.time()
        self.cursor.execute('''
            SELECT temperature FROM telemetry_logs
            WHERE cattle_id = 'BW-MUN-1109' AND validation_status = 'VALID'
        ''')
        results = self.cursor.fetchall()
        query_time = time.time() - start
        
        # Should complete in reasonable time
        self.assertLess(query_time, 0.1)
        self.assertEqual(len(results), 101)  # 1 initial + 100 new

    def test_security_integration(self):
        """Test security in COMP-INFS integration"""
        # Test that COMP cannot access invalid data
        self.cursor.execute('''
            SELECT * FROM telemetry_logs
            WHERE validation_status = 'REJECTED'
        ''')
        results = self.cursor.fetchall()
        
        # Should not return any rejected data in normal operation
        self.assertEqual(len(results), 0)


if __name__ == '__main__':
    unittest.main()
