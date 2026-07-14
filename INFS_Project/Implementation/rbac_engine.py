"""
RBAC Engine Implementation - INFS 402
Lesaka AI System - Advanced Data Governance
"""

import threading
from datetime import datetime
from typing import Set, Dict, Optional
from enum import Enum


class Role(Enum):
    """User roles in the system"""
    ADMIN = "ADMIN"
    FARMER = "FARMER"
    BROKER = "BROKER"


class Permission(Enum):
    """System permissions"""
    READ_ALL_DATA = "READ_ALL_DATA"
    READ_OWN_DATA = "READ_OWN_DATA"
    WRITE_OWN_DATA = "WRITE_OWN_DATA"
    ACCESS_GPS = "ACCESS_GPS"
    VIEW_AUDIT_LOGS = "VIEW_AUDIT_LOGS"
    MANAGE_USERS = "MANAGE_USERS"
    MODIFY_RBAC = "MODIFY_RBAC"
    EXPORT_DATA = "EXPORT_DATA"


class RBACEngine:
    """
    Role-Based Access Control Engine
    
    Implements hierarchical permission system with principle of least privilege.
    All permission checks are O(1) through hash-based lookups.
    """
    
    def __init__(self):
        """Initialize RBAC engine with default permission matrix"""
        self.permission_matrix = {
            Role.ADMIN: {
                Permission.READ_ALL_DATA,
                Permission.READ_OWN_DATA,
                Permission.WRITE_OWN_DATA,
                Permission.ACCESS_GPS,
                Permission.VIEW_AUDIT_LOGS,
                Permission.MANAGE_USERS,
                Permission.MODIFY_RBAC,
                Permission.EXPORT_DATA
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
        
        self.user_roles: Dict[str, Role] = {}
        self.temporary_permissions: Dict[str, list] = {}
        self.permission_cache: Dict[str, Dict[Permission, bool]] = {}
        self.lock = threading.RLock()
    
    def check_permission(self, user_id: str, permission: Permission) -> bool:
        """
        Check if user has specific permission
        
        Args:
            user_id: User identifier
            permission: Permission to check
            
        Returns:
            True if user has permission, False otherwise
        """
        with self.lock:
            # Check cache first
            cache_key = f"{user_id}:{permission.value}"
            if cache_key in self.permission_cache:
                return self.permission_cache[cache_key]
            
            # Check temporary permissions
            if user_id in self.temporary_permissions:
                for temp_perm in self.temporary_permissions[user_id]:
                    if temp_perm['permission'] == permission:
                        if datetime.now().timestamp() < temp_perm['expiry']:
                            result = True
                            self.permission_cache[cache_key] = result
                            return result
                        else:
                            # Remove expired permission
                            self.temporary_permissions[user_id].remove(temp_perm)
            
            # Check regular permissions
            if user_id not in self.user_roles:
                result = False
            else:
                user_role = self.user_roles[user_id]
                if user_role not in self.permission_matrix:
                    result = False
                else:
                    result = permission in self.permission_matrix[user_role]
            
            self.permission_cache[cache_key] = result
            return result
    
    def assign_role(self, user_id: str, role: Role) -> None:
        """
        Assign role to user
        
        Args:
            user_id: User identifier
            role: Role to assign
        """
        with self.lock:
            self.user_roles[user_id] = role
            # Clear cache for this user
            self._clear_user_cache(user_id)
    
    def revoke_role(self, user_id: str) -> None:
        """
        Revoke role from user
        
        Args:
            user_id: User identifier
        """
        with self.lock:
            if user_id in self.user_roles:
                del self.user_roles[user_id]
                self._clear_user_cache(user_id)
    
    def get_user_role(self, user_id: str) -> Optional[Role]:
        """
        Get user's role
        
        Args:
            user_id: User identifier
            
        Returns:
            User's role or None if not found
        """
        with self.lock:
            return self.user_roles.get(user_id, None)
    
    def assign_bulk_roles(self, users: list, role: Role) -> None:
        """
        Assign role to multiple users
        
        Args:
            users: List of user identifiers
            role: Role to assign
        """
        with self.lock:
            for user_id in users:
                self.user_roles[user_id] = role
                self._clear_user_cache(user_id)
    
    def add_permission(self, role: Role, permission: Permission) -> None:
        """
        Add permission to role
        
        Args:
            role: Role to modify
            permission: Permission to add
        """
        with self.lock:
            if role not in self.permission_matrix:
                self.permission_matrix[role] = set()
            self.permission_matrix[role].add(permission)
            # Clear entire cache as permissions changed
            self.permission_cache.clear()
    
    def remove_permission(self, role: Role, permission: Permission) -> None:
        """
        Remove permission from role
        
        Args:
            role: Role to modify
            permission: Permission to remove
        """
        with self.lock:
            if role in self.permission_matrix:
                self.permission_matrix[role].discard(permission)
            # Clear entire cache as permissions changed
            self.permission_cache.clear()
    
    def grant_temporary_permission(self, user_id: str, permission: Permission, expiry: float) -> None:
        """
        Grant temporary permission with expiration
        
        Args:
            user_id: User identifier
            permission: Permission to grant
            expiry: Unix timestamp when permission expires
        """
        with self.lock:
            if user_id not in self.temporary_permissions:
                self.temporary_permissions[user_id] = []
            
            self.temporary_permissions[user_id].append({
                'permission': permission,
                'expiry': expiry
            })
    
    def check_permission_with_context(self, user_id: str, permission: Permission, context: Dict) -> bool:
        """
        Check permission with context awareness
        
        Args:
            user_id: User identifier
            permission: Permission to check
            context: Context dictionary (time, location, etc.)
            
        Returns:
            True if user has permission in given context
        """
        base_permission = self.check_permission(user_id, permission)
        
        if not base_permission:
            return False
        
        # Context-aware rules
        if context.get('time') == 'night' and context.get('location') == 'remote':
            # Allow remote access at night for farmers
            if self.get_user_role(user_id) == Role.FARMER:
                return permission in [Permission.READ_OWN_DATA, Permission.ACCESS_GPS]
        
        return base_permission
    
    def _clear_user_cache(self, user_id: str) -> None:
        """Clear permission cache for specific user"""
        keys_to_remove = [k for k in self.permission_cache.keys() if k.startswith(f"{user_id}:")]
        for key in keys_to_remove:
            del self.permission_cache[key]
    
    def get_all_permissions(self, role: Role) -> Set[Permission]:
        """
        Get all permissions for a role
        
        Args:
            role: Role to query
            
        Returns:
            Set of permissions for the role
        """
        with self.lock:
            return self.permission_matrix.get(role, set()).copy()
    
    def get_all_users_with_role(self, role: Role) -> list:
        """
        Get all users with a specific role
        
        Args:
            role: Role to query
            
        Returns:
            List of user identifiers with the role
        """
        with self.lock:
            return [uid for uid, r in self.user_roles.items() if r == role]


class ContextValidator:
    """
    Context Validator for RBAC
    
    Validates that data access requests are contextually appropriate.
    Implements privacy-by-design principles.
    """
    
    def __init__(self, rbac_engine: RBACEngine):
        """
        Initialize context validator
        
        Args:
            rbac_engine: RBAC engine instance
        """
        self.rbac_engine = rbac_engine
    
    def validate_gps_access(self, user_id: str, cattle_id: str) -> bool:
        """
        Validate GPS access request
        
        Brokers cannot access GPS coordinates (privacy-by-design).
        
        Args:
            user_id: User identifier
            cattle_id: Cattle identifier
            
        Returns:
            True if access is allowed
        """
        user_role = self.rbac_engine.get_user_role(user_id)
        
        if user_role == Role.BROKER:
            return False
        
        return self.rbac_engine.check_permission(user_id, Permission.ACCESS_GPS)
    
    def validate_data_access(self, user_id: str, resource_type: str, resource_id: str) -> bool:
        """
        Validate data access request with contextual rules
        
        Args:
            user_id: User identifier
            resource_type: Type of resource (cattle, telemetry, etc.)
            resource_id: Resource identifier
            
        Returns:
            True if access is allowed
        """
        user_role = self.rbac_engine.get_user_role(user_id)
        
        if user_role == Role.FARMER:
            # Farmers can only access their own data
            if resource_type == 'cattle':
                # Check if cattle belongs to farmer
                # This would require database lookup
                return self.rbac_engine.check_permission(user_id, Permission.READ_OWN_DATA)
        
        elif user_role == Role.BROKER:
            # Brokers can read all data but not GPS
            if resource_type == 'gps':
                return False
            return self.rbac_engine.check_permission(user_id, Permission.READ_ALL_DATA)
        
        elif user_role == Role.ADMIN:
            # Admins have full access
            return True
        
        return False
