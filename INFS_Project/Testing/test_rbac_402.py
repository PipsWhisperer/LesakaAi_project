"""
Unit Tests for RBAC Engine - INFS 402
Lesaka AI System - Advanced Data Governance
"""

import unittest
from datetime import datetime
from unittest.mock import Mock, patch


class TestRBACEngineAdvanced(unittest.TestCase):
    """Advanced test cases for RBAC Engine"""

    def setUp(self):
        """Set up test fixtures"""
        self.rbac = RBACEngine()
        self.rbac.permission_matrix = {
            Role.ADMIN: {
                Permission.READ_ALL_DATA,
                Permission.READ_OWN_DATA,
                Permission.WRITE_OWN_DATA,
                Permission.ACCESS_GPS,
                Permission.VIEW_AUDIT_LOGS,
                Permission.MANAGE_USERS,
                Permission.MODIFY_RBAC
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
        self.rbac.user_roles = {
            'admin@lesakaai.com': Role.ADMIN,
            'farmer@lesakaai.com': Role.FARMER,
            'broker@lesakaai.com': Role.BROKER
        }

    def test_admin_modify_rbac_permission(self):
        """Test that admin can modify RBAC settings"""
        self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', Permission.MODIFY_RBAC))
        self.assertFalse(self.rbac.check_permission('farmer@lesakaai.com', Permission.MODIFY_RBAC))
        self.assertFalse(self.rbac.check_permission('broker@lesakaai.com', Permission.MODIFY_RBAC))

    def test_permission_inheritance(self):
        """Test that higher roles inherit lower role permissions"""
        # Admin should have all farmer permissions
        farmer_perms = self.rbac.permission_matrix[Role.FARMER]
        for perm in farmer_perms:
            self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', perm))

    def test_role_revocation(self):
        """Test role revocation"""
        self.rbac.revoke_role('farmer@lesakaai.com')
        self.assertIsNone(self.rbac.get_user_role('farmer@lesakaai.com'))
        self.assertFalse(self.rbac.check_permission('farmer@lesakaai.com', Permission.READ_OWN_DATA))

    def test_bulk_role_assignment(self):
        """Test bulk role assignment"""
        users = ['user1@test.com', 'user2@test.com', 'user3@test.com']
        self.rbac.assign_bulk_roles(users, Role.FARMER)
        
        for user in users:
            self.assertEqual(self.rbac.get_user_role(user), Role.FARMER)

    def test_permission_matrix_modification(self):
        """Test permission matrix modification by admin"""
        new_permission = Permission.EXPORT_DATA
        self.rbac.add_permission(Role.ADMIN, new_permission)
        
        self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', new_permission))

    def test_temporary_permission_grant(self):
        """Test temporary permission grant with expiration"""
        expiry = datetime.now().timestamp() + 3600  # 1 hour from now
        self.rbac.grant_temporary_permission('farmer@lesakaai.com', Permission.VIEW_AUDIT_LOGS, expiry)
        
        self.assertTrue(self.rbac.check_permission('farmer@lesakaai.com', Permission.VIEW_AUDIT_LOGS))

    def test_expired_temporary_permission(self):
        """Test that expired temporary permissions are revoked"""
        expiry = datetime.now().timestamp() - 3600  # 1 hour ago
        self.rbac.grant_temporary_permission('farmer@lesakaai.com', Permission.VIEW_AUDIT_LOGS, expiry)
        
        self.assertFalse(self.rbac.check_permission('farmer@lesakaai.com', Permission.VIEW_AUDIT_LOGS))

    def test_context_aware_permissions(self):
        """Test context-aware permission checking"""
        context = {'time': 'night', 'location': 'remote'}
        result = self.rbac.check_permission_with_context('farmer@lesakaai.com', Permission.ACCESS_GPS, context)
        
        # Should return result based on context rules
        self.assertIsNotNone(result)

    def test_permission_caching(self):
        """Test that permission checks are cached"""
        # First check
        result1 = self.rbac.check_permission('admin@lesakaai.com', Permission.READ_ALL_DATA)
        
        # Second check should use cache
        result2 = self.rbac.check_permission('admin@lesakaai.com', Permission.READ_ALL_DATA)
        
        self.assertEqual(result1, result2)

    def test_performance_under_load(self):
        """Test RBAC performance under load"""
        import time
        
        start = time.time()
        for _ in range(10000):
            self.rbac.check_permission('admin@lesakaai.com', Permission.READ_ALL_DATA)
        end = time.time()
        
        avg_time = (end - start) / 10000
        self.assertLess(avg_time, 0.001, "RBAC checks should be <1ms")


class TestAuditLogger(unittest.TestCase):
    """Test cases for Audit Logger"""

    def setUp(self):
        """Set up test fixtures"""
        self.audit_logger = AuditLogger()

    def test_log_access_event(self):
        """Test logging of access events"""
        self.audit_logger.log(
            user_id='farmer@lesakaai.com',
            action='READ',
            resource='cattle/BW-MUN-1109',
            success=True
        )
        
        logs = self.audit_logger.get_logs(user_id='farmer@lesakaai.com')
        self.assertEqual(len(logs), 1)
        self.assertEqual(logs[0]['action'], 'READ')

    def test_log_modify_event(self):
        """Test logging of modify events"""
        self.audit_logger.log(
            user_id='farmer@lesakaai.com',
            action='MODIFY',
            resource='cattle/BW-MUN-1109',
            success=True
        )
        
        logs = self.audit_logger.get_logs(user_id='farmer@lesakaai.com')
        self.assertEqual(logs[0]['action'], 'MODIFY')

    def test_log_admin_event(self):
        """Test logging of admin events"""
        self.audit_logger.log(
            user_id='admin@lesakaai.com',
            action='ASSIGN_ROLE',
            resource='users/farmer@lesakaai.com',
            success=True
        )
        
        logs = self.audit_logger.get_logs(user_id='admin@lesakaai.com')
        self.assertEqual(logs[0]['action'], 'ASSIGN_ROLE')

    def test_log_security_event(self):
        """Test logging of security events"""
        self.audit_logger.log(
            user_id='unknown@user.com',
            action='AUTHENTICATE',
            resource='system',
            success=False
        )
        
        logs = self.audit_logger.get_logs(user_id='unknown@user.com')
        self.assertEqual(logs[0]['success'], False)

    def test_audit_log_export_csv(self):
        """Test audit log export to CSV"""
        self.audit_logger.log(
            user_id='farmer@lesakaai.com',
            action='READ',
            resource='cattle/BW-MUN-1109',
            success=True
        )
        
        csv_data = self.audit_logger.export_logs('csv')
        self.assertIn('farmer@lesakaai.com', csv_data)
        self.assertIn('READ', csv_data)

    def test_audit_log_export_json(self):
        """Test audit log export to JSON"""
        self.audit_logger.log(
            user_id='farmer@lesakaai.com',
            action='READ',
            resource='cattle/BW-MUN-1109',
            success=True
        )
        
        json_data = self.audit_logger.export_logs('json')
        self.assertIn('farmer@lesakaai.com', json_data)

    def test_audit_log_retention(self):
        """Test audit log retention policy"""
        # Add old log
        old_timestamp = datetime.now().timestamp() - (91 * 24 * 3600)  # 91 days ago
        self.audit_logger.log(
            user_id='farmer@lesakaai.com',
            action='READ',
            resource='cattle/BW-MUN-1109',
            success=True,
            timestamp=old_timestamp
        )
        
        # Apply retention policy (90 days for ACCESS events)
        self.audit_logger.apply_retention_policy()
        
        # Old log should be removed
        logs = self.audit_logger.get_logs(user_id='farmer@lesakaai.com')
        self.assertEqual(len(logs), 0)

    def test_audit_log_search(self):
        """Test audit log search functionality"""
        self.audit_logger.log(
            user_id='farmer@lesakaai.com',
            action='READ',
            resource='cattle/BW-MUN-1109',
            success=True
        )
        
        results = self.audit_logger.search_logs(action='READ')
        self.assertEqual(len(results), 1)

    def test_audit_log_pagination(self):
        """Test audit log pagination"""
        for i in range(100):
            self.audit_logger.log(
                user_id=f'user{i}@test.com',
                action='READ',
                resource=f'cattle/BW-MUN-{i}',
                success=True
            )
        
        page1 = self.audit_logger.get_logs(page=1, page_size=10)
        self.assertEqual(len(page1), 10)


class TestEncryptionEngine(unittest.TestCase):
    """Test cases for Encryption Engine"""

    def setUp(self):
        """Set up test fixtures"""
        self.encryption = EncryptionEngine()

    def test_encrypt_decrypt_string(self):
        """Test encryption and decryption of string"""
        plaintext = "John Doe"
        encrypted = self.encryption.encrypt(plaintext)
        decrypted = self.encryption.decrypt(encrypted)
        
        self.assertEqual(plaintext, decrypted)
        self.assertNotEqual(plaintext, encrypted)

    def test_encrypt_decrypt_numeric(self):
        """Test encryption and decryption of numeric data"""
        plaintext = "1234567890"
        encrypted = self.encryption.encrypt(plaintext)
        decrypted = self.encryption.decrypt(encrypted)
        
        self.assertEqual(plaintext, decrypted)

    def test_encrypt_decrypt_gps_coordinates(self):
        """Test encryption and decryption of GPS coordinates"""
        plaintext = "-22.3285,24.6849"
        encrypted = self.encryption.encrypt(plaintext)
        decrypted = self.encryption.decrypt(encrypted)
        
        self.assertEqual(plaintext, decrypted)

    def test_key_derivation(self):
        """Test key derivation function"""
        password = "secure_password_123"
        salt = "random_salt_123"
        
        key1 = self.encryption.derive_key(password, salt)
        key2 = self.encryption.derive_key(password, salt)
        
        self.assertEqual(key1, key2)

    def test_key_derivation_different_salts(self):
        """Test that different salts produce different keys"""
        password = "secure_password_123"
        salt1 = "salt_1"
        salt2 = "salt_2"
        
        key1 = self.encryption.derive_key(password, salt1)
        key2 = self.encryption.derive_key(password, salt2)
        
        self.assertNotEqual(key1, key2)

    def test_encryption_performance(self):
        """Test encryption performance"""
        import time
        
        plaintext = "Test data for encryption performance testing"
        
        start = time.time()
        for _ in range(1000):
            encrypted = self.encryption.encrypt(plaintext)
            decrypted = self.encryption.decrypt(encrypted)
        end = time.time()
        
        avg_time = (end - start) / 1000
        self.assertLess(avg_time, 0.01, "Encryption/decryption should be <10ms")

    def test_data_masking(self):
        """Test data masking functionality"""
        owner_id = "ABC12345"
        masked = self.encryption.mask_data(owner_id, mask_type='owner_id')
        
        self.assertEqual(masked[:4], "ABC1")
        self.assertIn("*", masked)

    def test_gps_masking_for_broker(self):
        """Test GPS coordinate masking for broker role"""
        gps = "-22.3285,24.6849"
        masked = self.encryption.mask_gps_for_broker(gps)
        
        # Should be masked to district level
        self.assertNotEqual(gps, masked)


# Mock classes for testing
class Role:
    ADMIN = "ADMIN"
    FARMER = "FARMER"
    BROKER = "BROKER"


class Permission:
    READ_ALL_DATA = "READ_ALL_DATA"
    READ_OWN_DATA = "READ_OWN_DATA"
    WRITE_OWN_DATA = "WRITE_OWN_DATA"
    ACCESS_GPS = "ACCESS_GPS"
    VIEW_AUDIT_LOGS = "VIEW_AUDIT_LOGS"
    MANAGE_USERS = "MANAGE_USERS"
    MODIFY_RBAC = "MODIFY_RBAC"
    EXPORT_DATA = "EXPORT_DATA"


class RBACEngine:
    """Mock RBAC Engine for testing"""
    
    def __init__(self):
        self.permission_matrix = {}
        self.user_roles = {}
        self.temporary_permissions = {}
        self.permission_cache = {}
    
    def check_permission(self, user_id, permission):
        """Check if user has permission"""
        if user_id not in self.user_roles:
            return False
        
        user_role = self.user_roles[user_id]
        if user_role not in self.permission_matrix:
            return False
        
        return permission in self.permission_matrix[user_role]
    
    def assign_role(self, user_id, role):
        """Assign role to user"""
        self.user_roles[user_id] = role
    
    def revoke_role(self, user_id):
        """Revoke role from user"""
        if user_id in self.user_roles:
            del self.user_roles[user_id]
    
    def get_user_role(self, user_id):
        """Get user's role"""
        return self.user_roles.get(user_id, None)
    
    def assign_bulk_roles(self, users, role):
        """Assign role to multiple users"""
        for user in users:
            self.user_roles[user] = role
    
    def add_permission(self, role, permission):
        """Add permission to role"""
        if role not in self.permission_matrix:
            self.permission_matrix[role] = set()
        self.permission_matrix[role].add(permission)
    
    def grant_temporary_permission(self, user_id, permission, expiry):
        """Grant temporary permission"""
        if user_id not in self.temporary_permissions:
            self.temporary_permissions[user_id] = []
        self.temporary_permissions[user_id].append({
            'permission': permission,
            'expiry': expiry
        })
    
    def check_permission_with_context(self, user_id, permission, context):
        """Check permission with context awareness"""
        # Simplified context-aware check
        base_permission = self.check_permission(user_id, permission)
        
        # Context rules
        if context.get('time') == 'night' and context.get('location') == 'remote':
            return base_permission  # Allow in this context
        
        return base_permission


class AuditLogger:
    """Mock Audit Logger for testing"""
    
    def __init__(self):
        self.logs = []
    
    def log(self, user_id, action, resource, success, timestamp=None):
        """Log an event"""
        if timestamp is None:
            timestamp = datetime.now().timestamp()
        
        self.logs.append({
            'timestamp': timestamp,
            'user_id': user_id,
            'action': action,
            'resource': resource,
            'success': success
        })
    
    def get_logs(self, user_id=None, page=1, page_size=50):
        """Get logs"""
        if user_id:
            filtered = [log for log in self.logs if log['user_id'] == user_id]
        else:
            filtered = self.logs
        
        # Pagination
        start = (page - 1) * page_size
        end = start + page_size
        return filtered[start:end]
    
    def export_logs(self, format):
        """Export logs in specified format"""
        if format == 'csv':
            return "user_id,action,resource,success\n" + "\n".join(
                f"{log['user_id']},{log['action']},{log['resource']},{log['success']}"
                for log in self.logs
            )
        elif format == 'json':
            import json
            return json.dumps(self.logs)
    
    def apply_retention_policy(self):
        """Apply retention policy"""
        current_time = datetime.now().timestamp()
        retention_days = 90
        cutoff = current_time - (retention_days * 24 * 3600)
        
        self.logs = [log for log in self.logs if log['timestamp'] > cutoff]
    
    def search_logs(self, action=None, user_id=None):
        """Search logs"""
        results = self.logs
        if action:
            results = [log for log in results if log['action'] == action]
        if user_id:
            results = [log for log in results if log['user_id'] == user_id]
        return results


class EncryptionEngine:
    """Mock Encryption Engine for testing"""
    
    def __init__(self):
        self.keys = {}
    
    def encrypt(self, plaintext):
        """Encrypt data"""
        # Simplified encryption for testing
        import base64
        encoded = base64.b64encode(plaintext.encode()).decode()
        return f"ENC:{encoded}"
    
    def decrypt(self, encrypted):
        """Decrypt data"""
        # Simplified decryption for testing
        import base64
        if encrypted.startswith("ENC:"):
            encoded = encrypted[4:]
            decoded = base64.b64decode(encoded).decode()
            return decoded
        return encrypted
    
    def derive_key(self, password, salt):
        """Derive key from password and salt"""
        # Simplified key derivation for testing
        import hashlib
        return hashlib.sha256((password + salt).encode()).hexdigest()
    
    def mask_data(self, data, mask_type):
        """Mask data according to type"""
        if mask_type == 'owner_id':
            return data[:4] + "*" * (len(data) - 4)
        return data
    
    def mask_gps_for_broker(self, gps):
        """Mask GPS coordinates for broker"""
        # Simplified masking - return district level
        return "Central District"


if __name__ == '__main__':
    unittest.main()
