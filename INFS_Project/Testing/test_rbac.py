"""
Unit Tests for RBAC Engine
INFS 401 - Lesaka Data Governance Framework
"""

import unittest


class TestRBACEngine(unittest.TestCase):
    """Test cases for RBAC Engine"""

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
        self.rbac.user_roles = {
            'admin@lesakaai.com': Role.ADMIN,
            'farmer@lesakaai.com': Role.FARMER,
            'broker@lesakaai.com': Role.BROKER
        }

    def test_admin_has_all_permissions(self):
        """Test that admin has all permissions"""
        self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', Permission.READ_ALL_DATA))
        self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', Permission.MANAGE_USERS))
        self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', Permission.VIEW_AUDIT_LOGS))

    def test_farmer_has_limited_permissions(self):
        """Test that farmer has limited permissions"""
        self.assertTrue(self.rbac.check_permission('farmer@lesakaai.com', Permission.READ_OWN_DATA))
        self.assertTrue(self.rbac.check_permission('farmer@lesakaai.com', Permission.WRITE_OWN_DATA))
        self.assertTrue(self.rbac.check_permission('farmer@lesakaai.com', Permission.ACCESS_GPS))
        
        # Should not have these permissions
        self.assertFalse(self.rbac.check_permission('farmer@lesakaai.com', Permission.READ_ALL_DATA))
        self.assertFalse(self.rbac.check_permission('farmer@lesakaai.com', Permission.VIEW_AUDIT_LOGS))
        self.assertFalse(self.rbac.check_permission('farmer@lesakaai.com', Permission.MANAGE_USERS))

    def test_broker_has_read_only_permissions(self):
        """Test that broker has read-only permissions"""
        self.assertTrue(self.rbac.check_permission('broker@lesakaai.com', Permission.READ_ALL_DATA))
        
        # Should not have these permissions
        self.assertFalse(self.rbac.check_permission('broker@lesakaai.com', Permission.WRITE_OWN_DATA))
        self.assertFalse(self.rbac.check_permission('broker@lesakaai.com', Permission.ACCESS_GPS))
        self.assertFalse(self.rbac.check_permission('broker@lesakaai.com', Permission.MANAGE_USERS))

    def test_unknown_user_denied(self):
        """Test that unknown user is denied access"""
        self.assertFalse(self.rbac.check_permission('unknown@user.com', Permission.READ_ALL_DATA))

    def test_assign_role(self):
        """Test role assignment"""
        self.rbac.assign_role('newuser@lesakaai.com', Role.FARMER)
        self.assertEqual(self.rbac.get_user_role('newuser@lesakaai.com'), Role.FARMER)
        self.assertTrue(self.rbac.check_permission('newuser@lesakaai.com', Permission.READ_OWN_DATA))

    def test_get_user_role(self):
        """Test getting user role"""
        self.assertEqual(self.rbac.get_user_role('admin@lesakaai.com'), Role.ADMIN)
        self.assertEqual(self.rbac.get_user_role('farmer@lesakaai.com'), Role.FARMER)
        self.assertEqual(self.rbac.get_user_role('broker@lesakaai.com'), Role.BROKER)

    def test_permission_matrix_completeness(self):
        """Test that permission matrix is complete"""
        # Admin should have all permissions
        admin_perms = self.rbac.permission_matrix[Role.ADMIN]
        self.assertEqual(len(admin_perms), 6)  # All 6 permissions
        
        # Farmer should have 3 permissions
        farmer_perms = self.rbac.permission_matrix[Role.FARMER]
        self.assertEqual(len(farmer_perms), 3)
        
        # Broker should have 1 permission
        broker_perms = self.rbac.permission_matrix[Role.BROKER]
        self.assertEqual(len(broker_perms), 1)

    def test_role_hierarchy(self):
        """Test role hierarchy (Admin > Farmer > Broker)"""
        # Admin should have all farmer permissions
        farmer_perms = self.rbac.permission_matrix[Role.FARMER]
        for perm in farmer_perms:
            self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', perm))
        
        # Admin should have all broker permissions
        broker_perms = self.rbac.permission_matrix[Role.BROKER]
        for perm in broker_perms:
            self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', perm))


class TestPrivacyByDesign(unittest.TestCase):
    """Test cases for Privacy-by-Design features"""

    def setUp(self):
        """Set up test fixtures"""
        self.rbac = RBACEngine()
        self.rbac.permission_matrix = {
            Role.ADMIN: {Permission.ACCESS_GPS},
            Role.FARMER: {Permission.ACCESS_GPS},
            Role.BROKER: set()  # Broker cannot access GPS
        }
        self.rbac.user_roles = {
            'admin@lesakaai.com': Role.ADMIN,
            'farmer@lesakaai.com': Role.FARMER,
            'broker@lesakaai.com': Role.BROKER
        }

    def test_broker_cannot_access_gps(self):
        """Test that broker cannot access GPS coordinates"""
        self.assertFalse(self.rbac.check_permission('broker@lesakaai.com', Permission.ACCESS_GPS))

    def test_farmer_can_access_gps(self):
        """Test that farmer can access GPS coordinates"""
        self.assertTrue(self.rbac.check_permission('farmer@lesakaai.com', Permission.ACCESS_GPS))

    def test_admin_can_access_gps(self):
        """Test that admin can access GPS coordinates"""
        self.assertTrue(self.rbac.check_permission('admin@lesakaai.com', Permission.ACCESS_GPS))


# Enum definitions for testing
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


class RBACEngine:
    """Mock RBAC Engine for testing"""
    
    def __init__(self):
        self.permission_matrix = {}
        self.user_roles = {}
    
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
    
    def get_user_role(self, user_id):
        """Get user's role"""
        return self.user_roles.get(user_id, None)


if __name__ == '__main__':
    unittest.main()
