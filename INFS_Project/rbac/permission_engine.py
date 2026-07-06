# ==============================================================================
# LESAKA AI: RBAC PERMISSION ENGINE (INFS 402)
# Role-Based Access Control with fine-grained permissions
# ==============================================================================

class RBACPermissionEngine:
    def __init__(self):
        # Role hierarchy: admin > farmer > broker
        self.role_hierarchy = {
            'admin': 3,
            'farmer': 2,
            'broker': 1
        }
        
        # Permission matrix - what each role can access
        self.permissions = {
            'admin': {
                'read_all': True,
                'write_all': True,
                'delete_all': True,
                'access_gps': True,
                'view_audit_logs': True,
                'manage_users': True
            },
            'farmer': {
                'read_own': True,
                'write_own': True,
                'access_gps': True,
                'view_audit_logs': False,
                'manage_users': False
            },
            'broker': {
                'read_market': True,
                'access_gps': False,  # Privacy-by-design restriction
                'view_audit_logs': False,
                'manage_users': False
            }
        }
    
    def check_permission(self, user_role, action, resource_type):
        """
        Check if user role has permission for specific action on resource type
        Returns: (allowed: bool, reason: str)
        """
        # Validate role exists
        if user_role not in self.permissions:
            return False, f"Unknown role: {user_role}"
        
        role_perms = self.permissions[user_role]
        
        # Check specific permission
        permission_key = f"{action}_{resource_type}"
        
        # Handle special cases
        if resource_type == 'gps' and action == 'access':
            if user_role == 'broker':
                return False, "Broker role cannot access GPS coordinates (privacy restriction)"
            return True, "GPS access granted"
        
        # Check permission matrix
        if permission_key in role_perms:
            if role_perms[permission_key]:
                return True, f"{action} on {resource_type} granted"
            else:
                return False, f"{action} on {resource_type} denied for role {user_role}"
        
        # Default deny
        return False, f"Permission {permission_key} not defined for role {user_role}"
    
    def check_role_hierarchy(self, requesting_role, target_role):
        """
        Check if requesting role has higher or equal hierarchy level
        Used for role management operations
        """
        req_level = self.role_hierarchy.get(requesting_role, 0)
        target_level = self.role_hierarchy.get(target_role, 0)
        
        return req_level >= target_level
    
    def log_access_attempt(self, user_role, action, resource_type, allowed):
        """
        Log access attempt for audit trail
        This is a placeholder - would integrate with audit logging system
        """
        status = "GRANTED" if allowed else "DENIED"
        print(f"[RBAC] Access attempt: {user_role} | {action} | {resource_type} | {status}")
        # In production, this would write to audit log table
        return True


# --- DEMO ---
if __name__ == "__main__":
    engine = RBACPermissionEngine()
    
    # Test broker GPS restriction
    result, reason = engine.check_permission('broker', 'access', 'gps')
    print(f"Broker GPS access: {result} - {reason}")
    
    # Test farmer GPS access
    result, reason = engine.check_permission('farmer', 'access', 'gps')
    print(f"Farmer GPS access: {result} - {reason}")
    
    # Test admin full access
    result, reason = engine.check_permission('admin', 'write', 'all')
    print(f"Admin write access: {result} - {reason}")
