from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/message', methods=['POST'])
def process_message():
    data = request.json
    message = data.get('message', '')
    # Add "+1" to the message
    response = message + " +1"
    return jsonify({"response": response})

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)