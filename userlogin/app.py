from flask import Flask, render_template, request, redirect, url_for, flash
import json
from werkzeug.security import generate_password_hash,check_password_hash

app = Flask(__name__, template_folder='New Folder')
app.secret_key = 'your_secret_key_here'

@app.route('/', methods=['GET', 'POST'])
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
def user_detail(user_id):
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
        print(f"Entered Password: {password}")
        print(user_data)
        if user_data:
            print(f"Stored Hashed Password: {user_data['password']}")
            if check_password_hash(user_data['password'], password):
                return redirect(url_for('user_detail', user_id=email))
        
        return redirect(url_for('login', user_not_found=True))

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


if __name__ == '__main__':
    app.run(debug=True)