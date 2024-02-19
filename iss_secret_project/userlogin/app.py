from flask import Flask, render_template, request, redirect, url_for, flash, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
import json
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

app = Flask(_name_, template_folder='html_sites')
app.secret_key = 'your_secret_key_here'
jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = 'super-secret'
app.config['JWT_SECRET_KEY'] = 'super-secret'
app.config['JWT_COOKIE_SECURE'] = False # Only for development, set to True for production
app.config['JWT_ACCESS_COOKIE_PATH'] = '/user'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/login'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        user_data = {'name': name, 'email': email, 'password': hashed_password}
        save_user_data(user_data)

        return redirect(url_for('confirmation'))

    return render_template('registration.html')

@app.route('/confirmation')
def confirmation():
    return render_template('confirmation.html')

@app.route('/user/<user_id>')
@jwt_required()
def user_detail(user_id):
    current_user = get_jwt_identity()
    user_data = get_user_data(user_id)
    if user_data:
        return render_template('user_detail.html', user_data=user_data)
    else:
        return "User not found"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user_data = get_user_data(email)
        if user_data and check_password_hash(user_data['password'], password):
            # Generate JWT token for the user
            access_token = create_access_token(identity=email, expires_delta=timedelta(days=7))
            print(access_token)
            decoded = decode_token(access_token)
            print(decoded)
            response = make_response(redirect(url_for('user_detail', user_id=email)))
            response.set_cookie('access_token_cookie', value=access_token, max_age=3600, httponly=True)
            print(response.headers)
            return response
        
        flash('Invalid email or password', 'error')

    return render_template('login.html')


def save_user_data(user_data):
    filename = 'users.txt'
    with open(filename, 'a') as file:
        file.write(json.dumps(user_data) + '\n')

def get_user_data(user_id):
    filename = 'users.txt'
    with open(filename, 'r') as file:
        for line in file:
            user_data = json.loads(line)
            print(user_data['email'], user_id)
            if user_data['email'] == user_id:
                return user_data
    return None

@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        admin_password = request.form.get('admin_password')
        user_data = get_user_data("admin@a")
        print(f"Stored Hashed Password: {user_data['password']}")

        # Check if the entered password matches the admin's password in users.txt
        if check_password_hash(user_data['password'], admin_password):
            user_details = get_all_user_details()
            return render_template('admin.html', user_details=user_details)
        else:
            flash('Invalid admin password', 'error')

    return render_template('admin_login.html')

def get_all_user_details():
    filename = 'users.txt'
    user_details = []
    with open(filename, 'r') as file:
        for line in file:
            if line.strip():  # Check if the line is non-empty
                user_data = json.loads(line)
                user_details.append(user_data)
    return user_details


if _name_ == '_main_':
    app.run(debug=True)