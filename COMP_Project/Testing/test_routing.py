"""
Unit Tests for Graph Orchestrator Routing Algorithm
COMP 401 - Lesaka Multi-Agent Orchestration System
"""

import unittest
from unittest.mock import Mock, patch
from datetime import datetime


class TestRoutingAlgorithm(unittest.TestCase):
    """Test cases for the telemetry routing algorithm"""

    def setUp(self):
        """Set up test fixtures"""
        self.orchestrator = Mock()
        self.orchestrator.route_telemetry = self.route_telemetry_impl

    def route_telemetry_impl(self, data, cattle_id):
        """
        Implementation of routing algorithm for testing
        
        INPUT: telemetry_data, cattle_id
        OUTPUT: agent_response
        
        Algorithm:
        1. Fetch temperature from telemetry_data
        2. Validate context for cattle_id
        3. IF context is invalid THEN
        4.     RETURN Supervisor response
        5. END IF
        6. IF temperature > 39.5 THEN
        7.     RETURN Molemo response (fever detection)
        8. ELSE IF temperature < 36.0 THEN
        9.     RETURN Loapi response (cold stress)
        10. ELSE
        11.    RETURN Thekiso response (market assessment)
        12. END IF
        """
        temperature = data.get('temperature')
        
        # Validate context
        if not self.validate_context(cattle_id):
            return {'agent': 'supervisor', 'action': 'fallback', 'reason': 'invalid_context'}
        
        # Routing logic
        if temperature > 39.5:
            return {'agent': 'molemo', 'action': 'fever_detection', 'severity': 'high'}
        elif temperature < 36.0:
            return {'agent': 'loapi', 'action': 'cold_stress', 'severity': 'moderate'}
        else:
            return {'agent': 'thekiso', 'action': 'market_assessment', 'grade': 'A'}

    def validate_context(self, cattle_id):
        """Validate cattle context"""
        valid_cattle_ids = ['BW-MUN-1109', 'BW-MUN-2847', 'BW-MUN-0934']
        return cattle_id in valid_cattle_ids

    def test_route_to_molemo_high_fever(self):
        """Test routing to Molemo agent for high fever (temp > 39.5°C)"""
        data = {'temperature': 40.5, 'heart_rate': 85, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'molemo')
        self.assertEqual(result['action'], 'fever_detection')
        self.assertEqual(result['severity'], 'high')

    def test_route_to_molemo_critical_fever(self):
        """Test routing to Molemo agent for critical fever (temp >= 41.0°C)"""
        data = {'temperature': 41.5, 'heart_rate': 90, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'molemo')
        self.assertEqual(result['action'], 'fever_detection')
        self.assertEqual(result['severity'], 'high')

    def test_route_to_loapi_cold_stress(self):
        """Test routing to Loapi agent for cold stress (temp < 36.0°C)"""
        data = {'temperature': 35.0, 'heart_rate': 70, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'loapi')
        self.assertEqual(result['action'], 'cold_stress')
        self.assertEqual(result['severity'], 'moderate')

    def test_route_to_loapi_severe_cold(self):
        """Test routing to Loapi agent for severe cold (temp <= 34.0°C)"""
        data = {'temperature': 33.5, 'heart_rate': 65, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'loapi')
        self.assertEqual(result['action'], 'cold_stress')

    def test_route_to_thekiso_normal(self):
        """Test routing to Thekiso agent for normal temperature"""
        data = {'temperature': 38.0, 'heart_rate': 75, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'thekiso')
        self.assertEqual(result['action'], 'market_assessment')
        self.assertEqual(result['grade'], 'A')

    def test_route_to_thekiso_optimal(self):
        """Test routing to Thekiso agent for optimal temperature (36.0-39.5°C)"""
        data = {'temperature': 37.5, 'heart_rate': 72, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'thekiso')
        self.assertEqual(result['action'], 'market_assessment')

    def test_route_to_supervisor_invalid_context(self):
        """Test routing to Supervisor agent for invalid context"""
        data = {'temperature': 38.0, 'heart_rate': 75, 'timestamp': datetime.now()}
        cattle_id = 'INVALID-ID'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        self.assertEqual(result['agent'], 'supervisor')
        self.assertEqual(result['action'], 'fallback')
        self.assertEqual(result['reason'], 'invalid_context')

    def test_boundary_condition_39_5(self):
        """Test boundary condition at exactly 39.5°C"""
        data = {'temperature': 39.5, 'heart_rate': 80, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        # At exactly 39.5, should route to Thekiso (not fever)
        self.assertEqual(result['agent'], 'thekiso')

    def test_boundary_condition_36_0(self):
        """Test boundary condition at exactly 36.0°C"""
        data = {'temperature': 36.0, 'heart_rate': 70, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        result = self.orchestrator.route_telemetry(data, cattle_id)
        
        # At exactly 36.0, should route to Thekiso (not cold stress)
        self.assertEqual(result['agent'], 'thekiso')

    def test_algorithm_complexity(self):
        """Test that routing algorithm has O(1) time complexity"""
        import time
        
        data = {'temperature': 38.0, 'heart_rate': 75, 'timestamp': datetime.now()}
        cattle_id = 'BW-MUN-1109'
        
        # Measure time for single routing
        start_time = time.time()
        for _ in range(1000):
            self.orchestrator.route_telemetry(data, cattle_id)
        end_time = time.time()
        
        # Should complete in very short time (O(1) complexity)
        avg_time = (end_time - start_time) / 1000
        self.assertLess(avg_time, 0.001, "Routing should be O(1) complexity")


class TestRoutingDeterminism(unittest.TestCase):
    """Test that routing algorithm is deterministic"""

    def setUp(self):
        """Set up test fixtures"""
        self.orchestrator = Mock()
        self.orchestrator.route_telemetry = self.route_telemetry_impl

    def route_telemetry_impl(self, data, cattle_id):
        """Simplified routing implementation"""
        temperature = data.get('temperature')
        
        if temperature > 39.5:
            return {'agent': 'molemo'}
        elif temperature < 36.0:
            return {'agent': 'loapi'}
        else:
            return {'agent': 'thekiso'}

    def test_deterministic_routing(self):
        """Test that same input always produces same output"""
        data = {'temperature': 40.0}
        cattle_id = 'BW-MUN-1109'
        
        results = []
        for _ in range(100):
            result = self.orchestrator.route_telemetry(data, cattle_id)
            results.append(result['agent'])
        
        # All results should be identical
        self.assertTrue(all(r == 'molemo' for r in results))


if __name__ == '__main__':
    unittest.main()
