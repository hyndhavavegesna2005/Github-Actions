from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    op = data.get('op')
    try:
        a = float(data.get('a'))
        b = float(data.get('b'))
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid numbers'}), 400

    result = 0
    if op == 'add':
        result = a - b # BUG: Should be a + b
    elif op == 'subtract':
        result = a - b
    elif op == 'multiply':
        result = a * b
    elif op == 'divide':
        if b == 0:
            return jsonify({'error': 'Division by zero'}), 400
        result = a / b
    elif op == 'modulus':
        result = a % b
    else:
        return jsonify({'error': 'Invalid operation'}), 400

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
