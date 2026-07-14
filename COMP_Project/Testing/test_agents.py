"""
Unit Tests for Specialized Agents
COMP 401 - Lesaka Multi-Agent Orchestration System
"""

import unittest
from datetime import datetime


class TestMolemoAgent(unittest.TestCase):
    """Test cases for Molemo Agent (Fever Detection)"""

    def setUp(self):
        """Set up test fixtures"""
        self.agent = MolemoAgent()

    def test_detect_critical_fever(self):
        """Test detection of critical fever (>= 41.0°C)"""
        data = {'temperature': 41.5, 'heart_rate': 90}
        result = self.agent.process(data)
        
        self.assertEqual(result['severity'], 'CRITICAL')
        self.assertTrue(result['action_required'])
        self.assertIn('immediate', result['recommendation'].lower())

    def test_detect_high_fever(self):
        """Test detection of high fever (>= 39.5°C)"""
        data = {'temperature': 40.0, 'heart_rate': 85}
        result = self.agent.process(data)
        
        self.assertEqual(result['severity'], 'HIGH')
        self.assertTrue(result['action_required'])
        self.assertIn('24 hours', result['recommendation'].lower())

    def test_normal_temperature(self):
        """Test normal temperature (< 39.5°C)"""
        data = {'temperature': 38.0, 'heart_rate': 75}
        result = self.agent.process(data)
        
        self.assertEqual(result['severity'], 'NORMAL')
        self.assertFalse(result['action_required'])
        self.assertIn('no intervention', result['recommendation'].lower())

    def test_boundary_39_5(self):
        """Test boundary at exactly 39.5°C"""
        data = {'temperature': 39.5, 'heart_rate': 80}
        result = self.agent.process(data)
        
        # At exactly 39.5, should be HIGH fever
        self.assertEqual(result['severity'], 'HIGH')

    def test_boundary_41_0(self):
        """Test boundary at exactly 41.0°C"""
        data = {'temperature': 41.0, 'heart_rate': 88}
        result = self.agent.process(data)
        
        # At exactly 41.0, should be CRITICAL
        self.assertEqual(result['severity'], 'CRITICAL')


class TestLoapiAgent(unittest.TestCase):
    """Test cases for Loapi Agent (Cold Stress Detection)"""

    def setUp(self):
        """Set up test fixtures"""
        self.agent = LoapiAgent()

    def test_detect_severe_cold(self):
        """Test detection of severe cold stress (<= 34.0°C)"""
        data = {'temperature': 33.5, 'humidity': 45}
        result = self.agent.process(data)
        
        self.assertEqual(result['severity'], 'SEVERE')
        self.assertTrue(result['action_required'])
        self.assertIn('immediate', result['recommendation'].lower())

    def test_detect_moderate_cold(self):
        """Test detection of moderate cold stress (<= 36.0°C)"""
        data = {'temperature': 35.0, 'humidity': 50}
        result = self.agent.process(data)
        
        self.assertEqual(result['severity'], 'MODERATE')
        self.assertTrue(result['action_required'])
        self.assertIn('shelter', result['recommendation'].lower())

    def test_normal_temperature(self):
        """Test normal temperature (> 36.0°C)"""
        data = {'temperature': 37.0, 'humidity': 55}
        result = self.agent.process(data)
        
        self.assertEqual(result['severity'], 'NORMAL')
        self.assertFalse(result['action_required'])

    def test_boundary_36_0(self):
        """Test boundary at exactly 36.0°C"""
        data = {'temperature': 36.0, 'humidity': 50}
        result = self.agent.process(data)
        
        # At exactly 36.0, should be MODERATE
        self.assertEqual(result['severity'], 'MODERATE')

    def test_boundary_34_0(self):
        """Test boundary at exactly 34.0°C"""
        data = {'temperature': 34.0, 'humidity': 45}
        result = self.agent.process(data)
        
        # At exactly 34.0, should be SEVERE
        self.assertEqual(result['severity'], 'SEVERE')


class TestThekisoAgent(unittest.TestCase):
    """Test cases for Thekiso Agent (Market Assessment)"""

    def setUp(self):
        """Set up test fixtures"""
        self.agent = ThekisoAgent()

    def test_grade_a_optimal(self):
        """Test Grade A assignment for optimal health"""
        data = {'temperature': 37.5, 'heart_rate': 72}
        result = self.agent.process(data)
        
        self.assertEqual(result['grade'], 'A')
        self.assertTrue(result['market_ready'])
        self.assertIn('optimal', result['recommendation'].lower())

    def test_grade_b_temp_optimal(self):
        """Test Grade B assignment when only temp is optimal"""
        data = {'temperature': 37.5, 'heart_rate': 95}
        result = self.agent.process(data)
        
        self.assertEqual(result['grade'], 'B')
        self.assertTrue(result['market_ready'])

    def test_grade_c_not_optimal(self):
        """Test Grade C assignment when not optimal"""
        data = {'temperature': 40.0, 'heart_rate': 85}
        result = self.agent.process(data)
        
        self.assertEqual(result['grade'], 'C')
        self.assertFalse(result['market_ready'])

    def test_boundary_temp_optimal(self):
        """Test temperature boundary conditions"""
        # Lower boundary
        data = {'temperature': 36.0, 'heart_rate': 70}
        result = self.agent.process(data)
        self.assertTrue(result['market_ready'])
        
        # Upper boundary
        data = {'temperature': 39.5, 'heart_rate': 80}
        result = self.agent.process(data)
        self.assertTrue(result['market_ready'])

    def test_boundary_heart_rate(self):
        """Test heart rate boundary conditions"""
        # Lower boundary
        data = {'temperature': 37.5, 'heart_rate': 60}
        result = self.agent.process(data)
        self.assertTrue(result['market_ready'])
        
        # Upper boundary
        data = {'temperature': 37.5, 'heart_rate': 80}
        result = self.agent.process(data)
        self.assertTrue(result['market_ready'])


class TestSupervisorAgent(unittest.TestCase):
    """Test cases for Supervisor Agent (Error Recovery)"""

    def setUp(self):
        """Set up test fixtures"""
        self.agent = SupervisorAgent()

    def test_handle_no_data_found(self):
        """Test handling of NO_DATA_FOUND error"""
        error = {
            'error_type': 'NO_DATA_FOUND',
            'cattle_id': 'BW-MUN-1109',
            'message': 'No telemetry data available'
        }
        result = self.agent.process(error)
        
        self.assertEqual(result['fallback_action'], 'REQUEST_DATA')
        self.assertIn('refresh', result['recovery_message'].lower())

    def test_handle_context_anomaly(self):
        """Test handling of CONTEXT_ANOMALY error"""
        error = {
            'error_type': 'CONTEXT_ANOMALY',
            'cattle_id': 'BW-MUN-1109',
            'message': 'Invalid regional identifier'
        }
        result = self.agent.process(error)
        
        self.assertEqual(result['fallback_action'], 'VALIDATE_CONTEXT')
        self.assertIn('re-validating', result['recovery_message'].lower())

    def test_handle_processing_error(self):
        """Test handling of PROCESSING_ERROR error"""
        error = {
            'error_type': 'PROCESSING_ERROR',
            'cattle_id': 'BW-MUN-1109',
            'message': 'Failed to process telemetry'
        }
        result = self.agent.process(error)
        
        self.assertEqual(result['fallback_action'], 'RETRY_SAFE_MODE')
        self.assertIn('safe mode', result['recovery_message'].lower())

    def test_handle_unknown_error(self):
        """Test handling of UNKNOWN_ERROR error"""
        error = {
            'error_type': 'UNKNOWN_ERROR',
            'cattle_id': 'BW-MUN-1109',
            'message': 'Unexpected error occurred'
        }
        result = self.agent.process(error)
        
        self.assertEqual(result['fallback_action'], 'ESCALATE')
        self.assertIn('manual review', result['recovery_message'].lower())

    def test_error_logging(self):
        """Test that errors are logged correctly"""
        error = {
            'error_type': 'NO_DATA_FOUND',
            'cattle_id': 'BW-MUN-1109',
            'message': 'Test error'
        }
        self.agent.process(error)
        
        # Check that error was logged
        self.assertEqual(len(self.agent.error_log), 1)
        logged_error = self.agent.error_log[0]
        self.assertEqual(logged_error['error_type'], 'NO_DATA_FOUND')
        self.assertEqual(logged_error['cattle_id'], 'BW-MUN-1109')


# Mock Agent Classes for Testing
class MolemoAgent:
    def __init__(self):
        self.fever_threshold = 39.5
        self.critical_threshold = 41.0
    
    def process(self, data):
        temp = data.get('temperature')
        if temp >= self.critical_threshold:
            return {
                'severity': 'CRITICAL',
                'recommendation': 'Immediate veterinary intervention required',
                'action_required': True
            }
        elif temp >= self.fever_threshold:
            return {
                'severity': 'HIGH',
                'recommendation': 'Veterinary assessment recommended within 24 hours',
                'action_required': True
            }
        else:
            return {
                'severity': 'NORMAL',
                'recommendation': 'No intervention required',
                'action_required': False
            }


class LoapiAgent:
    def __init__(self):
        self.cold_threshold = 36.0
        self.severe_threshold = 34.0
    
    def process(self, data):
        temp = data.get('temperature')
        if temp <= self.severe_threshold:
            return {
                'severity': 'SEVERE',
                'recommendation': 'Immediate shelter required, provide heating if available',
                'action_required': True
            }
        elif temp <= self.cold_threshold:
            return {
                'severity': 'MODERATE',
                'recommendation': 'Provide shelter and monitor closely',
                'action_required': True
            }
        else:
            return {
                'severity': 'NORMAL',
                'recommendation': 'No shelter intervention required',
                'action_required': False
            }


class ThekisoAgent:
    def __init__(self):
        self.optimal_temp_min = 36.0
        self.optimal_temp_max = 39.5
        self.optimal_hr_min = 60
        self.optimal_hr_max = 80
    
    def process(self, data):
        temp = data.get('temperature')
        hr = data.get('heart_rate')
        
        temp_optimal = self.optimal_temp_min <= temp <= self.optimal_temp_max
        hr_optimal = self.optimal_hr_min <= hr <= self.optimal_hr_max
        
        if temp_optimal and hr_optimal:
            return {
                'grade': 'A',
                'market_ready': True,
                'recommendation': 'Cattle is in optimal health for market liquidation'
            }
        elif temp_optimal:
            return {
                'grade': 'B',
                'market_ready': True,
                'recommendation': 'Cattle is market-ready with minor considerations'
            }
        else:
            return {
                'grade': 'C',
                'market_ready': False,
                'recommendation': 'Cattle requires health assessment before market'
            }


class SupervisorAgent:
    def __init__(self):
        self.fallback_strategies = {
            'NO_DATA_FOUND': 'REQUEST_DATA',
            'CONTEXT_ANOMALY': 'VALIDATE_CONTEXT',
            'PROCESSING_ERROR': 'RETRY_SAFE_MODE',
            'UNKNOWN_ERROR': 'ESCALATE'
        }
        self.error_log = []
    
    def process(self, error):
        error_type = error.get('error_type')
        fallback = self.fallback_strategies.get(error_type, 'ESCALATE')
        
        # Log error
        self.error_log.append({
            'error_type': error_type,
            'cattle_id': error.get('cattle_id'),
            'message': error.get('message'),
            'fallback_action': fallback,
            'timestamp': datetime.now()
        })
        
        recovery_messages = {
            'REQUEST_DATA': 'No telemetry data found. Requesting data refresh.',
            'VALIDATE_CONTEXT': 'Context validation failed. Re-validating regional identifier.',
            'RETRY_SAFE_MODE': 'Processing error. Retrying in safe mode.',
            'ESCALATE': 'Unknown error type. Escalating to manual review.'
        }
        
        return {
            'fallback_action': fallback,
            'recovery_message': recovery_messages.get(fallback, 'Unknown error'),
            'success': True
        }


if __name__ == '__main__':
    unittest.main()
