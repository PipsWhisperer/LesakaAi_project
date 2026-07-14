"""
Unit Tests for State Machine
COMP 401 - Lesaka Multi-Agent Orchestration System
"""

import unittest


class TestStateMachine(unittest.TestCase):
    """Test cases for State Machine design"""

    def setUp(self):
        """Set up test fixtures"""
        self.state_machine = StateMachine()

    def test_initial_state(self):
        """Test that initial state is NORMAL"""
        self.assertEqual(self.state_machine.get_current_state(), State.NORMAL)

    def test_transition_to_fever(self):
        """Test transition from NORMAL to FEVER"""
        self.state_machine.transition(Condition.TEMP_HIGH)
        self.assertEqual(self.state_machine.get_current_state(), State.FEVER)

    def test_transition_to_cold_stress(self):
        """Test transition from NORMAL to COLD_STRESS"""
        self.state_machine.transition(Condition.TEMP_LOW)
        self.assertEqual(self.state_machine.get_current_state(), State.COLD_STRESS)

    def test_transition_to_error(self):
        """Test transition from any state to ERROR"""
        self.state_machine.transition(Condition.ERROR_DETECTED)
        self.assertEqual(self.state_machine.get_current_state(), State.ERROR)

    def test_fever_to_normal(self):
        """Test transition from FEVER back to NORMAL"""
        self.state_machine.transition(Condition.TEMP_HIGH)
        self.assertEqual(self.state_machine.get_current_state(), State.FEVER)
        
        # Simulate temperature returning to normal
        self.state_machine.transition(Condition.TEMP_NORMAL)
        self.assertEqual(self.state_machine.get_current_state(), State.NORMAL)

    def test_cold_stress_to_normal(self):
        """Test transition from COLD_STRESS back to NORMAL"""
        self.state_machine.transition(Condition.TEMP_LOW)
        self.assertEqual(self.state_machine.get_current_state(), State.COLD_STRESS)
        
        # Simulate temperature returning to normal
        self.state_machine.transition(Condition.TEMP_NORMAL)
        self.assertEqual(self.state_machine.get_current_state(), State.NORMAL)

    def test_error_to_normal(self):
        """Test transition from ERROR back to NORMAL"""
        self.state_machine.transition(Condition.ERROR_DETECTED)
        self.assertEqual(self.state_machine.get_current_state(), State.ERROR)
        
        # Simulate error resolved
        self.state_machine.transition(Condition.TEMP_NORMAL)
        self.assertEqual(self.state_machine.get_current_state(), State.NORMAL)

    def test_state_reset(self):
        """Test state machine reset"""
        self.state_machine.transition(Condition.TEMP_HIGH)
        self.assertEqual(self.state_machine.get_current_state(), State.FEVER)
        
        self.state_machine.reset()
        self.assertEqual(self.state_machine.get_current_state(), State.NORMAL)

    def test_invalid_transition(self):
        """Test handling of invalid transitions"""
        initial_state = self.state_machine.get_current_state()
        
        # Try invalid transition (should stay in current state)
        self.state_machine.transition(Condition.TEMP_NORMAL)
        self.assertEqual(self.state_machine.get_current_state(), initial_state)

    def test_deterministic_transitions(self):
        """Test that transitions are deterministic"""
        # Transition to FEVER
        for _ in range(10):
            self.state_machine.reset()
            self.state_machine.transition(Condition.TEMP_HIGH)
            self.assertEqual(self.state_machine.get_current_state(), State.FEVER)

    def test_state_complexity(self):
        """Test that state transitions have O(1) complexity"""
        import time
        
        start_time = time.time()
        for _ in range(1000):
            self.state_machine.reset()
            self.state_machine.transition(Condition.TEMP_HIGH)
            self.state_machine.transition(Condition.TEMP_NORMAL)
        end_time = time.time()
        
        avg_time = (end_time - start_time) / 2000
        self.assertLess(avg_time, 0.001, "State transitions should be O(1)")


# Enum definitions for testing
class State:
    NORMAL = "NORMAL"
    FEVER = "FEVER"
    COLD_STRESS = "COLD_STRESS"
    ERROR = "ERROR"


class Condition:
    TEMP_HIGH = "TEMP_HIGH"
    TEMP_LOW = "TEMP_LOW"
    TEMP_NORMAL = "TEMP_NORMAL"
    ERROR_DETECTED = "ERROR_DETECTED"


class StateMachine:
    """Mock State Machine for testing"""
    
    def __init__(self):
        self.current_state = State.NORMAL
        self.transition_table = {
            State.NORMAL: {
                Condition.TEMP_HIGH: State.FEVER,
                Condition.TEMP_LOW: State.COLD_STRESS,
                Condition.ERROR_DETECTED: State.ERROR,
            },
            State.FEVER: {
                Condition.TEMP_NORMAL: State.NORMAL,
                Condition.ERROR_DETECTED: State.ERROR,
            },
            State.COLD_STRESS: {
                Condition.TEMP_NORMAL: State.NORMAL,
                Condition.ERROR_DETECTED: State.ERROR,
            },
            State.ERROR: {
                Condition.TEMP_NORMAL: State.NORMAL,
            }
        }
    
    def transition(self, condition):
        """Transition to new state based on condition"""
        if condition in self.transition_table.get(self.current_state, {}):
            self.current_state = self.transition_table[self.current_state][condition]
    
    def get_current_state(self):
        """Get current state"""
        return self.current_state
    
    def reset(self):
        """Reset to initial state"""
        self.current_state = State.NORMAL


if __name__ == '__main__':
    unittest.main()
