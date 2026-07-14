"""
Unit Tests for Data Validation Engine
INFS 401 - Lesaka Data Governance Framework
"""

import unittest


class TestTemperatureValidator(unittest.TestCase):
    """Test cases for Temperature Validator"""

    def setUp(self):
        """Set up test fixtures"""
        self.validator = TemperatureValidator()

    def test_valid_temperature_low(self):
        """Test valid temperature at lower boundary (30.0°C)"""
        result = self.validator.validate(30.0)
        self.assertTrue(result)

    def test_valid_temperature_high(self):
        """Test valid temperature at upper boundary (45.0°C)"""
        result = self.validator.validate(45.0)
        self.assertTrue(result)

    def test_valid_temperature_mid(self):
        """Test valid temperature in middle of range"""
        result = self.validator.validate(38.5)
        self.assertTrue(result)

    def test_invalid_temperature_too_low(self):
        """Test invalid temperature below minimum (29.9°C)"""
        result = self.validator.validate(29.9)
        self.assertFalse(result)

    def test_invalid_temperature_too_high(self):
        """Test invalid temperature above maximum (45.1°C)"""
        result = self.validator.validate(45.1)
        self.assertFalse(result)

    def test_boundary_30_0(self):
        """Test boundary at exactly 30.0°C"""
        result = self.validator.validate(30.0)
        self.assertTrue(result)

    def test_boundary_45_0(self):
        """Test boundary at exactly 45.0°C"""
        result = self.validator.validate(45.0)
        self.assertTrue(result)

    def test_error_message(self):
        """Test error message generation"""
        self.validator.validate(50.0)
        error_msg = self.validator.get_error_message()
        self.assertIn('valid range', error_msg.lower())


class TestDistrictValidator(unittest.TestCase):
    """Test cases for District Validator"""

    def setUp(self):
        """Set up test fixtures"""
        self.validator = DistrictValidator()
        self.validator.allowed_districts = [
            'Gaborone', 'Francistown', 'Maun', 'Serowe', 
            'Kasane', 'Lobatse', 'Palapye', 'Jwaneng'
        ]

    def test_valid_district(self):
        """Test valid district"""
        result = self.validator.validate('Gaborone')
        self.assertTrue(result)

    def test_invalid_district(self):
        """Test invalid district"""
        result = self.validator.validate('InvalidDistrict')
        self.assertFalse(result)

    def test_case_sensitive(self):
        """Test case sensitivity"""
        result = self.validator.validate('gaborone')  # lowercase
        self.assertFalse(result)

    def test_empty_district(self):
        """Test empty district"""
        result = self.validator.validate('')
        self.assertFalse(result)


class TestOwnerIdValidator(unittest.TestCase):
    """Test cases for Owner ID Validator"""

    def setUp(self):
        """Set up test fixtures"""
        self.validator = OwnerIdValidator()
        self.validator.existing_ids = {'ABC12345', 'XYZ67890'}

    def test_unique_owner_id(self):
        """Test unique owner ID"""
        result = self.validator.validate('NEWID123')
        self.assertTrue(result)

    def test_duplicate_owner_id(self):
        """Test duplicate owner ID"""
        result = self.validator.validate('ABC12345')
        self.assertFalse(result)

    def test_empty_owner_id(self):
        """Test empty owner ID"""
        result = self.validator.validate('')
        self.assertFalse(result)


class TestQualityScorer(unittest.TestCase):
    """Test cases for Quality Scorer"""

    def setUp(self):
        """Set up test fixtures"""
        self.scorer = QualityScorer()

    def test_perfect_quality_score(self):
        """Test perfect quality score (all fields present and valid)"""
        data = {
            'temperature': 38.5,
            'heart_rate': 75,
            'cattle_id': 'BW-MUN-1109',
            'timestamp': '2026-07-13T10:00:00'
        }
        score = self.scorer.calculate_score(data)
        self.assertEqual(score, 1.0)

    def test_low_quality_score(self):
        """Test low quality score (missing fields)"""
        data = {
            'temperature': 38.5,
            # Missing heart_rate, cattle_id, timestamp
        }
        score = self.scorer.calculate_score(data)
        self.assertLess(score, 0.5)

    def test_completeness_calculation(self):
        """Test completeness calculation"""
        data = {
            'temperature': 38.5,
            'heart_rate': 75,
            # Missing cattle_id, timestamp
        }
        completeness = self.scorer.calculate_completeness(data)
        self.assertEqual(completeness, 0.5)  # 2 out of 4 fields

    def test_validity_calculation(self):
        """Test validity calculation"""
        data = {
            'temperature': 50.0,  # Invalid (too high)
            'heart_rate': 75,
            'cattle_id': 'BW-MUN-1109',
            'timestamp': '2026-07-13T10:00:00'
        }
        validity = self.scorer.calculate_validity(data)
        self.assertLess(validity, 1.0)

    def test_quality_score_formula(self):
        """Test quality score formula: (Completeness × 0.3) + (Validity × 0.4) + (Consistency × 0.3)"""
        data = {
            'temperature': 38.5,
            'heart_rate': 75,
            'cattle_id': 'BW-MUN-1109',
            'timestamp': '2026-07-13T10:00:00'
        }
        score = self.scorer.calculate_score(data)
        
        # Should be 1.0 for perfect data
        self.assertEqual(score, 1.0)


class TestValidationEngine(unittest.TestCase):
    """Test cases for Validation Engine"""

    def setUp(self):
        """Set up test fixtures"""
        self.engine = ValidationEngine()
        self.engine.register_validator('temperature', TemperatureValidator())
        self.engine.register_validator('district', DistrictValidator())

    def test_valid_data(self):
        """Test validation of valid data"""
        data = {
            'temperature': 38.5,
            'district': 'Gaborone'
        }
        result = self.engine.validate(data)
        self.assertTrue(result.is_valid)
        self.assertEqual(len(result.errors), 0)

    def test_invalid_temperature(self):
        """Test validation with invalid temperature"""
        data = {
            'temperature': 50.0,
            'district': 'Gaborone'
        }
        result = self.engine.validate(data)
        self.assertFalse(result.is_valid)
        self.assertGreater(len(result.errors), 0)

    def test_invalid_district(self):
        """Test validation with invalid district"""
        data = {
            'temperature': 38.5,
            'district': 'InvalidDistrict'
        }
        result = self.engine.validate(data)
        self.assertFalse(result.is_valid)
        self.assertGreater(len(result.errors), 0)

    def test_multiple_errors(self):
        """Test validation with multiple errors"""
        data = {
            'temperature': 50.0,
            'district': 'InvalidDistrict'
        }
        result = self.engine.validate(data)
        self.assertFalse(result.is_valid)
        self.assertGreaterEqual(len(result.errors), 2)


# Mock classes for testing
class TemperatureValidator:
    def __init__(self):
        self.min_temp = 30.0
        self.max_temp = 45.0
        self.error_message = "Temperature outside valid range (30.0-45.0°C)"
    
    def validate(self, value):
        return self.min_temp <= value <= self.max_temp
    
    def get_error_message(self):
        return self.error_message


class DistrictValidator:
    def __init__(self):
        self.allowed_districts = []
        self.error_message = "District not in valid regions"
    
    def validate(self, value):
        return value in self.allowed_districts
    
    def get_error_message(self):
        return self.error_message


class OwnerIdValidator:
    def __init__(self):
        self.existing_ids = set()
        self.error_message = "Owner ID collision"
    
    def validate(self, value):
        return value not in self.existing_ids and len(value) > 0
    
    def get_error_message(self):
        return self.error_message


class QualityScorer:
    def __init__(self):
        self.completeness_weight = 0.3
        self.validity_weight = 0.4
        self.consistency_weight = 0.3
    
    def calculate_score(self, data):
        completeness = self.calculate_completeness(data)
        validity = self.calculate_validity(data)
        consistency = self.calculate_consistency(data)
        
        return (completeness * self.completeness_weight + 
                validity * self.validity_weight + 
                consistency * self.consistency_weight)
    
    def calculate_completeness(self, data):
        required_fields = ['temperature', 'heart_rate', 'cattle_id', 'timestamp']
        present = sum(1 for field in required_fields if field in data)
        return present / len(required_fields)
    
    def calculate_validity(self, data):
        # Simplified validity check
        valid = True
        if 'temperature' in data:
            valid = valid and (30.0 <= data['temperature'] <= 45.0)
        if 'heart_rate' in data:
            valid = valid and (40 <= data['heart_rate'] <= 120)
        return 1.0 if valid else 0.5
    
    def calculate_consistency(self, data):
        # Simplified consistency check
        return 1.0  # Assume consistent for testing


class ValidationEngine:
    def __init__(self):
        self.validators = {}
        self.quality_scorer = QualityScorer()
    
    def register_validator(self, name, validator):
        self.validators[name] = validator
    
    def validate(self, data):
        errors = []
        
        for name, validator in self.validators.items():
            if name in data:
                if not validator.validate(data[name]):
                    errors.append(validator.get_error_message())
        
        quality_score = self.quality_scorer.calculate_score(data)
        
        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            quality_score=quality_score
        )


class ValidationResult:
    def __init__(self, is_valid, errors, quality_score):
        self.is_valid = is_valid
        self.errors = errors
        self.quality_score = quality_score


if __name__ == '__main__':
    unittest.main()
