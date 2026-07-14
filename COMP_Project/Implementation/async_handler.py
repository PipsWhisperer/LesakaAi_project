"""
Async Handler Implementation - COMP 402
Lesaka AI System - Advanced Distributed Systems
"""

import asyncio
from queue import PriorityQueue
from datetime import datetime
from typing import Dict, Any, Optional
from enum import Enum


class Priority(Enum):
    """Task priority levels"""
    CRITICAL = 1
    HIGH = 2
    NORMAL = 3


class AsyncTelemetryHandler:
    """
    Asynchronous Telemetry Handler
    
    Implements priority-based async task queue with backpressure management
    and circuit breaker pattern for resilience.
    """
    
    def __init__(self):
        """Initialize async telemetry handler"""
        self.sensor_queue = PriorityQueue()
        self.validation_queue = PriorityQueue()
        self.agent_queue = PriorityQueue()
        
        self.backpressure_threshold = 100
        self.overload_threshold = 1000
        self.overload_state = False
        
        self.circuit_breaker = CircuitBreaker()
        self.event_loop = None
        
        # Metrics
        self.metrics = {
            'total_processed': 0,
            'total_failed': 0,
            'queue_depth_sensor': 0,
            'queue_depth_validation': 0,
            'queue_depth_agent': 0,
            'backpressure_events': 0,
            'load_shed_events': 0
        }
    
    async def process_telemetry(self, telemetry_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process telemetry data asynchronously
        
        Args:
            telemetry_data: Telemetry data dictionary
            
        Returns:
            Processing result
        """
        if self.event_loop is None:
            self.event_loop = asyncio.get_event_loop()
        
        # Check circuit breaker
        if self.circuit_breaker.is_open():
            return {
                'success': False,
                'error': 'Circuit breaker is open',
                'circuit_breaker_state': self.circuit_breaker.state
            }
        
        # Calculate priority
        priority = self._calculate_priority(telemetry_data)
        
        # Check backpressure
        if self.sensor_queue.qsize() > self.backpressure_threshold:
            self.metrics['backpressure_events'] += 1
        
        # Check overload
        if self.overload_state and priority == Priority.NORMAL:
            self.metrics['load_shed_events'] += 1
            return {
                'success': False,
                'error': 'System overloaded, low priority task shed',
                'accepted': False
            }
        
        # Add to queue
        await self.sensor_queue.put((priority.value, telemetry_data))
        self.metrics['queue_depth_sensor'] = self.sensor_queue.qsize()
        
        # Process asynchronously
        asyncio.create_task(self._process_sensor_queue())
        
        return {
            'success': True,
            'priority': priority.name,
            'accepted': True
        }
    
    def _calculate_priority(self, data: Dict[str, Any]) -> Priority:
        """
        Calculate task priority based on telemetry data
        
        Args:
            data: Telemetry data
            
        Returns:
            Priority level
        """
        temp = data.get('temperature', 0)
        
        if temp > 39.5 or temp < 36.0:
            return Priority.CRITICAL
        elif 36.0 <= temp <= 39.5:
            return Priority.HIGH
        else:
            return Priority.NORMAL
    
    async def _process_sensor_queue(self):
        """Process sensor queue asynchronously"""
        while True:
            try:
                priority, data = await self.sensor_queue.get()
                
                # Validate asynchronously
                validated = await self._validate_async(data)
                
                if validated['success']:
                    # Route to agent queue
                    await self.agent_queue.put((priority, data))
                    self.metrics['queue_depth_agent'] = self.agent_queue.qsize()
                    asyncio.create_task(self._process_agent_queue())
                else:
                    self.metrics['total_failed'] += 1
                    self.circuit_breaker.record_failure()
                
                self.sensor_queue.task_done()
                self.metrics['total_processed'] += 1
                
            except Exception as e:
                self.metrics['total_failed'] += 1
                self.circuit_breaker.record_failure()
    
    async def _validate_async(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate telemetry data asynchronously
        
        Args:
            data: Telemetry data
            
        Returns:
            Validation result
        """
        # Simulate async validation
        await asyncio.sleep(0.001)
        
        # Basic validation
        temp = data.get('temperature', 0)
        if temp < 30.0 or temp > 45.0:
            return {'success': False, 'error': 'Temperature out of range'}
        
        return {'success': True}
    
    async def _process_agent_queue(self):
        """Process agent queue asynchronously"""
        while True:
            try:
                priority, data = await self.agent_queue.get()
                
                # Route to appropriate agent
                agent = self._route_to_agent(data)
                
                # Process with agent
                result = await self._process_with_agent(agent, data)
                
                self.agent_queue.task_done()
                
            except Exception as e:
                self.metrics['total_failed'] += 1
                self.circuit_breaker.record_failure()
    
    def _route_to_agent(self, data: Dict[str, Any]) -> str:
        """
        Route telemetry data to appropriate agent
        
        Args:
            data: Telemetry data
            
        Returns:
            Agent name
        """
        temp = data.get('temperature', 0)
        
        if temp > 39.5:
            return 'molemo'
        elif temp < 36.0:
            return 'loapi'
        else:
            return 'thekiso'
    
    async def _process_with_agent(self, agent: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process data with specific agent
        
        Args:
            agent: Agent name
            data: Telemetry data
            
        Returns:
            Processing result
        """
        # Simulate async agent processing
        await asyncio.sleep(0.002)
        
        return {
            'success': True,
            'agent': agent,
            'timestamp': datetime.now().isoformat()
        }
    
    def set_overload_state(self, state: bool):
        """
        Set system overload state
        
        Args:
            state: Overload state
        """
        self.overload_state = state
    
    def get_metrics(self) -> Dict[str, Any]:
        """
        Get current metrics
        
        Returns:
            Metrics dictionary
        """
        return {
            **self.metrics,
            'queue_depth_sensor': self.sensor_queue.qsize(),
            'queue_depth_validation': self.validation_queue.qsize(),
            'queue_depth_agent': self.agent_queue.qsize(),
            'circuit_breaker_state': self.circuit_breaker.state,
            'circuit_breaker_failures': self.circuit_breaker.failure_count
        }


class CircuitBreaker:
    """
    Circuit Breaker Pattern Implementation
    
    Prevents cascading failures by failing fast when error rate exceeds threshold.
    """
    
    def __init__(self, failure_threshold: int = 5, timeout: int = 60):
        """
        Initialize circuit breaker
        
        Args:
            failure_threshold: Number of failures before opening
            timeout: Seconds to wait before attempting recovery
        """
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN
    
    def is_open(self) -> bool:
        """
        Check if circuit breaker is open
        
        Returns:
            True if open
        """
        if self.state == 'OPEN':
            if self.last_failure_time and (datetime.now().timestamp() - self.last_failure_time) > self.timeout:
                self.state = 'HALF_OPEN'
                return False
            return True
        return False
    
    def record_failure(self):
        """Record a failure"""
        self.failure_count += 1
        self.last_failure_time = datetime.now().timestamp()
        
        if self.failure_count >= self.failure_threshold:
            self.state = 'OPEN'
    
    def record_success(self):
        """Record a success"""
        self.failure_count = 0
        self.last_failure_time = None
        
        if self.state == 'HALF_OPEN':
            self.state = 'CLOSED'
    
    def reset(self):
        """Reset circuit breaker to closed state"""
        self.failure_count = 0
        self.last_failure_time = None
        self.state = 'CLOSED'


class BackpressureManager:
    """
    Backpressure Manager
    
    Manages system backpressure to prevent overload.
    """
    
    def __init__(self, threshold: int = 100):
        """
        Initialize backpressure manager
        
        Args:
            threshold: Queue size threshold for backpressure
        """
        self.threshold = threshold
        self.active = False
        self.activation_count = 0
    
    def check_backpressure(self, queue_size: int) -> bool:
        """
        Check if backpressure should be activated
        
        Args:
            queue_size: Current queue size
            
        Returns:
            True if backpressure is active
        """
        if queue_size > self.threshold:
            if not self.active:
                self.active = True
                self.activation_count += 1
            return True
        else:
            self.active = False
            return False
    
    def get_status(self) -> Dict[str, Any]:
        """
        Get backpressure status
        
        Returns:
            Status dictionary
        """
        return {
            'active': self.active,
            'threshold': self.threshold,
            'activation_count': self.activation_count
        }


class LoadShedder:
    """
    Load Shedder
    
    Drops low-priority tasks when system is overloaded.
    """
    
    def __init__(self, overload_threshold: int = 1000):
        """
        Initialize load shedder
        
        Args:
            overload_threshold: Queue size threshold for load shedding
        """
        self.overload_threshold = overload_threshold
        self.overload_state = False
        self.shed_count = 0
    
    def should_shed(self, queue_size: int, priority: Priority) -> bool:
        """
        Determine if task should be shed
        
        Args:
            queue_size: Current queue size
            priority: Task priority
            
        Returns:
            True if task should be shed
        """
        if queue_size > self.overload_threshold:
            self.overload_state = True
            
            # Only shed low priority tasks
            if priority == Priority.NORMAL:
                self.shed_count += 1
                return True
        else:
            self.overload_state = False
        
        return False
    
    def get_status(self) -> Dict[str, Any]:
        """
        Get load shedding status
        
        Returns:
            Status dictionary
        """
        return {
            'overload_state': self.overload_state,
            'overload_threshold': self.overload_threshold,
            'shed_count': self.shed_count
        }
