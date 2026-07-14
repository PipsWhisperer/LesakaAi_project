"""
Self-Healing Implementation - COMP 402
Lesaka AI System - Advanced Distributed Systems
"""

import asyncio
import time
from datetime import datetime
from typing import Dict, Any, Optional, Callable
from enum import Enum


class ErrorType(Enum):
    """Error classification types"""
    NETWORK_TIMEOUT = "NETWORK_TIMEOUT"
    SENSOR_FAILURE = "SENSOR_FAILURE"
    CONTEXT_INVALID = "CONTEXT_INVALID"
    PROCESSING_ERROR = "PROCESSING_ERROR"
    UNKNOWN_ERROR = "UNKNOWN_ERROR"


class ErrorClassification(Enum):
    """Error recovery classification"""
    TRANSIENT = "TRANSIENT"
    RECOVERABLE = "RECOVERABLE"
    PERMANENT = "PERMANENT"


class RecoveryAction(Enum):
    """Recovery action types"""
    RETRY_WITH_BACKOFF = "RETRY_WITH_BACKOFF"
    ACTIVATE_FALLBACK_MODE = "ACTIVATE_FALLBACK_MODE"
    REVALIDATE_CONTEXT = "REVALIDATE_CONTEXT"
    SAFE_MODE_PROCESSING = "SAFE_MODE_PROCESSING"
    ESCALATE = "ESCALATE"


class SelfHealingOrchestrator:
    """
    Self-Healing Orchestrator
    
    Implements automatic error detection, classification, and recovery
    with exponential backoff and escalation logic.
    """
    
    def __init__(self):
        """Initialize self-healing orchestrator"""
        self.error_counts: Dict[ErrorType, int] = {}
        self.error_thresholds: Dict[ErrorType, int] = {
            ErrorType.NETWORK_TIMEOUT: 5,
            ErrorType.SENSOR_FAILURE: 3,
            ErrorType.CONTEXT_INVALID: 5,
            ErrorType.PROCESSING_ERROR: 5,
            ErrorType.UNKNOWN_ERROR: 3
        }
        
        self.recovery_strategies: Dict[ErrorType, Callable] = {
            ErrorType.NETWORK_TIMEOUT: self._retry_with_backoff,
            ErrorType.SENSOR_FAILURE: self._activate_fallback_mode,
            ErrorType.CONTEXT_INVALID: self._revalidate_context,
            ErrorType.PROCESSING_ERROR: self._safe_mode_processing,
            ErrorType.UNKNOWN_ERROR: self._escalate
        }
        
        self.health_monitor = HealthMonitor()
        self.escalation_triggered = False
        self.escalation_log = []
        
        # Metrics
        self.metrics = {
            'total_errors': 0,
            'total_recoveries': 0,
            'total_escalations': 0,
            'recovery_success_rate': 0.0
        }
    
    async def handle_error(self, error: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle error with automatic recovery
        
        Args:
            error: Error dictionary with type, message, and context
            
        Returns:
            Recovery result
        """
        error_type = ErrorType(error.get('type', 'UNKNOWN_ERROR'))
        
        # Increment error count
        self.error_counts[error_type] = self.error_counts.get(error_type, 0) + 1
        self.metrics['total_errors'] += 1
        
        # Check if error rate exceeds threshold
        threshold = self.error_thresholds.get(error_type, 5)
        if self.error_counts[error_type] > threshold:
            await self._escalate(error)
            return {
                'success': False,
                'action': 'ESCALATED',
                'reason': f'Error rate exceeded threshold: {self.error_counts[error_type]}'
            }
        
        # Execute recovery strategy
        recovery = self.recovery_strategies.get(error_type)
        if recovery:
            result = await recovery(error)
            
            if result.get('success', False):
                self.error_counts[error_type] = 0  # Reset on success
                self.metrics['total_recoveries'] += 1
                self._update_recovery_success_rate()
                return result
        
        # If recovery fails, escalate
        await self._escalate(error)
        return {
            'success': False,
            'action': 'ESCALATED',
            'reason': 'Recovery strategy failed'
        }
    
    def _classify_error(self, error: Dict[str, Any]) -> ErrorClassification:
        """
        Classify error by recovery potential
        
        Args:
            error: Error dictionary
            
        Returns:
            Error classification
        """
        error_type = ErrorType(error.get('type', 'UNKNOWN_ERROR'))
        
        if error_type in [ErrorType.NETWORK_TIMEOUT]:
            return ErrorClassification.TRANSIENT
        elif error_type in [ErrorType.CONTEXT_INVALID, ErrorType.PROCESSING_ERROR]:
            return ErrorClassification.RECOVERABLE
        else:
            return ErrorClassification.PERMANENT
    
    async def _retry_with_backoff(self, error: Dict[str, Any], max_retries: int = 3) -> Dict[str, Any]:
        """
        Retry operation with exponential backoff
        
        Args:
            error: Error dictionary
            max_retries: Maximum retry attempts
            
        Returns:
            Recovery result
        """
        for attempt in range(max_retries):
            try:
                # Simulate operation retry
                await asyncio.sleep(2 ** attempt)  # Exponential backoff
                
                # Simulate success on retry
                if attempt < max_retries - 1:
                    continue
                
                return {
                    'success': True,
                    'action': 'RETRY_SUCCESS',
                    'attempts': attempt + 1
                }
            except Exception as e:
                if attempt == max_retries - 1:
                    return {
                        'success': False,
                        'action': 'RETRY_FAILED',
                        'attempts': attempt + 1,
                        'error': str(e)
                    }
        
        return {'success': False, 'action': 'RETRY_FAILED'}
    
    async def _activate_fallback_mode(self, error: Dict[str, Any]) -> Dict[str, Any]:
        """
        Activate fallback mode for sensor failure
        
        Args:
            error: Error dictionary
            
        Returns:
            Recovery result
        """
        cattle_id = error.get('cattle_id')
        
        # Get fallback data (simulated)
        fallback_data = await self._get_fallback_data(cattle_id)
        
        return {
            'success': True,
            'action': 'FALLBACK_ACTIVATED',
            'data': fallback_data
        }
    
    async def _get_fallback_data(self, cattle_id: str) -> Dict[str, Any]:
        """
        Get fallback data for cattle
        
        Args:
            cattle_id: Cattle identifier
            
        Returns:
            Fallback data
        """
        # Simulate fallback data retrieval
        return {
            'cattle_id': cattle_id,
            'temperature': 38.0,  # Normal temperature
            'heart_rate': 75,
            'timestamp': datetime.now().isoformat(),
            'source': 'FALLBACK'
        }
    
    async def _revalidate_context(self, error: Dict[str, Any]) -> Dict[str, Any]:
        """
        Revalidate context for context validation errors
        
        Args:
            error: Error dictionary
            
        Returns:
            Recovery result
        """
        cattle_id = error.get('cattle_id')
        
        # Simulate context revalidation
        await asyncio.sleep(0.01)
        
        return {
            'success': True,
            'action': 'CONTEXT_REVALIDATED',
            'cattle_id': cattle_id
        }
    
    async def _safe_mode_processing(self, error: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process in safe mode for processing errors
        
        Args:
            error: Error dictionary
            
        Returns:
            Recovery result
        """
        # Simulate safe mode processing
        await asyncio.sleep(0.02)
        
        return {
            'success': True,
            'action': 'SAFE_MODE_PROCESSING'
        }
    
    async def _escalate(self, error: Dict[str, Any]) -> None:
        """
        Escalate error to manual intervention
        
        Args:
            error: Error dictionary
        """
        self.escalation_triggered = True
        self.metrics['total_escalations'] += 1
        
        escalation_entry = {
            'timestamp': datetime.now().isoformat(),
            'error': error,
            'error_counts': self.error_counts.copy()
        }
        
        self.escalation_log.append(escalation_entry)
    
    def _update_recovery_success_rate(self):
        """Update recovery success rate metric"""
        total = self.metrics['total_errors']
        recovered = self.metrics['total_recoveries']
        
        if total > 0:
            self.metrics['recovery_success_rate'] = recovered / total
    
    def get_metrics(self) -> Dict[str, Any]:
        """
        Get current metrics
        
        Returns:
            Metrics dictionary
        """
        return {
            **self.metrics,
            'error_counts': self.error_counts.copy(),
            'escalation_triggered': self.escalation_triggered,
            'escalation_count': len(self.escalation_log)
        }
    
    def reset(self):
        """Reset orchestrator state"""
        self.error_counts.clear()
        self.escalation_triggered = False
        self.escalation_log.clear()
        self.metrics = {
            'total_errors': 0,
            'total_recoveries': 0,
            'total_escalations': 0,
            'recovery_success_rate': 0.0
        }


class HealthMonitor:
    """
    Health Monitor
    
    Monitors system health including sensors, network, and processing.
    """
    
    def __init__(self):
        """Initialize health monitor"""
        self.sensor_health: Dict[str, Dict[str, Any]] = {}
        self.latencies = []
        self.error_rates = {}
        self.last_check = None
    
    def record_heartbeat(self, sensor_id: str, healthy: bool) -> None:
        """
        Record sensor heartbeat
        
        Args:
            sensor_id: Sensor identifier
            healthy: Health status
        """
        if sensor_id not in self.sensor_health:
            self.sensor_health[sensor_id] = {
                'healthy': True,
                'last_heartbeat': None,
                'missed_heartbeats': 0
            }
        
        self.sensor_health[sensor_id]['healthy'] = healthy
        self.sensor_health[sensor_id]['last_heartbeat'] = datetime.now().timestamp()
        
        if healthy:
            self.sensor_health[sensor_id]['missed_heartbeats'] = 0
        else:
            self.sensor_health[sensor_id]['missed_heartbeats'] += 1
    
    def get_sensor_health(self, sensor_id: str) -> Optional[Dict[str, Any]]:
        """
        Get sensor health status
        
        Args:
            sensor_id: Sensor identifier
            
        Returns:
            Health status or None if not found
        """
        return self.sensor_health.get(sensor_id, None)
    
    def record_latency(self, latency: float) -> None:
        """
        Record network latency
        
        Args:
            latency: Latency in milliseconds
        """
        self.latencies.append(latency)
        
        # Keep only last 100 measurements
        if len(self.latencies) > 100:
            self.latencies.pop(0)
    
    def get_average_latency(self) -> float:
        """
        Get average network latency
        
        Returns:
            Average latency in milliseconds
        """
        if not self.latencies:
            return 0.0
        return sum(self.latencies) / len(self.latencies)
    
    def get_latency_percentile(self, percentile: float) -> float:
        """
        Get latency percentile
        
        Args:
            percentile: Percentile (0-100)
            
        Returns:
            Latency at percentile
        """
        if not self.latencies:
            return 0.0
        
        sorted_latencies = sorted(self.latencies)
        index = int(len(sorted_latencies) * percentile / 100)
        return sorted_latencies[index]
    
    def record_error_rate(self, component: str, error_rate: float) -> None:
        """
        Record error rate for component
        
        Args:
            component: Component name
            error_rate: Error rate (0-1)
        """
        self.error_rates[component] = error_rate
    
    def get_error_rate(self, component: str) -> float:
        """
        Get error rate for component
        
        Args:
            component: Component name
            
        Returns:
            Error rate
        """
        return self.error_rates.get(component, 0.0)
    
    def get_system_health_score(self) -> float:
        """
        Calculate overall system health score
        
        Returns:
            Health score (0-100)
        """
        if not self.sensor_health:
            return 100.0
        
        healthy_sensors = sum(1 for s in self.sensor_health.values() if s['healthy'])
        total_sensors = len(self.sensor_health)
        
        sensor_score = (healthy_sensors / total_sensors) * 100 if total_sensors > 0 else 100
        
        # Factor in latency (higher latency = lower score)
        avg_latency = self.get_average_latency()
        latency_score = max(0, 100 - avg_latency)  # 100ms = 0 score
        
        # Factor in error rates
        avg_error_rate = sum(self.error_rates.values()) / len(self.error_rates) if self.error_rates else 0
        error_score = (1 - avg_error_rate) * 100
        
        # Weighted average
        overall_score = (sensor_score * 0.4) + (latency_score * 0.3) + (error_score * 0.3)
        
        return overall_score
    
    def get_health_status(self) -> Dict[str, Any]:
        """
        Get comprehensive health status
        
        Returns:
            Health status dictionary
        """
        return {
            'sensor_health': {
                'total': len(self.sensor_health),
                'healthy': sum(1 for s in self.sensor_health.values() if s['healthy']),
                'unhealthy': sum(1 for s in self.sensor_health.values() if not s['healthy'])
            },
            'network_latency': {
                'average': self.get_average_latency(),
                'p50': self.get_latency_percentile(50),
                'p95': self.get_latency_percentile(95),
                'p99': self.get_latency_percentile(99)
            },
            'error_rates': self.error_rates.copy(),
            'overall_health_score': self.get_system_health_score(),
            'last_check': self.last_check
        }
    
    def perform_health_check(self) -> Dict[str, Any]:
        """
        Perform comprehensive health check
        
        Returns:
            Health check results
        """
        self.last_check = datetime.now().isoformat()
        
        # Check sensor health
        unhealthy_sensors = [
            sensor_id for sensor_id, health in self.sensor_health.items()
            if not health['healthy'] or health['missed_heartbeats'] > 3
        ]
        
        # Check network health
        avg_latency = self.get_average_latency()
        network_healthy = avg_latency < 200  # 200ms threshold
        
        # Check error rates
        high_error_components = [
            component for component, rate in self.error_rates.items()
            if rate > 0.1  # 10% error rate threshold
        ]
        
        return {
            'timestamp': self.last_check,
            'sensors': {
                'healthy': len(self.sensor_health) - len(unhealthy_sensors),
                'unhealthy': len(unhealthy_sensors),
                'unhealthy_list': unhealthy_sensors
            },
            'network': {
                'healthy': network_healthy,
                'latency_ms': avg_latency
            },
            'components': {
                'healthy': len(self.error_rates) - len(high_error_components),
                'unhealthy': len(high_error_components),
                'unhealthy_list': high_error_components
            },
            'overall_healthy': len(unhealthy_sensors) == 0 and network_healthy and len(high_error_components) == 0
        }
