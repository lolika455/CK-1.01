from flask import Flask, request, jsonify, render_template
import os
import json

app = Flask(__name__)

DATA_FILE = 'users.json'

def load_users():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_users(users):
    with open(DATA_FILE, 'w') as file:
        json.dump(users, file, indent=4)

@app.route('/')
def home():
    return render_template('register.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    real_name = data.get('real_name')

    users = load_users()

    for user in users.values():
        if user['username'] == username:
            return jsonify({'error': 'Felhasználónév már használatban van'}), 400
        if user['email'] == email:
            return jsonify({'error': 'Email már használatban van'}), 400
        if user['real_name'] == real_name:
            return jsonify({'error': 'Igazi név már használatban van'}), 400

    user_id = len(users) + 1
    users[user_id] = data
    save_users(users)

    return jsonify({'message': 'Sikeres regisztráció!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
