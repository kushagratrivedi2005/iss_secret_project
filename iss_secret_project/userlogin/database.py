from flask_mysqldb import MySQL
from flask import current_app

def get_db():
    return MySQL(current_app)

def execute_query(query, args=None, fetch_one=False):
    db = get_db()
    cursor = db.connection.cursor()
    cursor.execute(query, args)
    if fetch_one:
        data = cursor.fetchone()
    else:
        data = cursor.fetchall()
    cursor.close()
    return data
