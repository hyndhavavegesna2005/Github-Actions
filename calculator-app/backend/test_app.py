import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_add(client):
    rv = client.post('/api/calculate', json={'op': 'add', 'a': 10, 'b': 5})
    json_data = rv.get_json()
    assert json_data['result'] == 15

def test_subtract(client):
    rv = client.post('/api/calculate', json={'op': 'subtract', 'a': 10, 'b': 5})
    json_data = rv.get_json()
    assert json_data['result'] == 5

def test_multiply(client):
    rv = client.post('/api/calculate', json={'op': 'multiply', 'a': 10, 'b': 5})
    json_data = rv.get_json()
    assert json_data['result'] == 50

def test_divide(client):
    rv = client.post('/api/calculate', json={'op': 'divide', 'a': 10, 'b': 5})
    json_data = rv.get_json()
    assert json_data['result'] == 2.0

def test_divide_by_zero(client):
    rv = client.post('/api/calculate', json={'op': 'divide', 'a': 10, 'b': 0})
    assert rv.status_code == 400
    json_data = rv.get_json()
    assert json_data['error'] == 'Division by zero'

def test_invalid_op(client):
    rv = client.post('/api/calculate', json={'op': 'unknown', 'a': 10, 'b': 5})
    assert rv.status_code == 400
    json_data = rv.get_json()
    assert json_data['error'] == 'Invalid operation'
