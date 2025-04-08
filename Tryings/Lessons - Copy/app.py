# app.py
from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/check_admin')
def check_admin():
    # الاتصال بقاعدة البيانات
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",  # اسم المستخدم
        password="ri88910@fp#2010",  # كلمة المرور
        database="Abdo"  # اسم قاعدة البيانات
    )
    cursor = mydb.cursor()
    cursor.execute("SELECT username FROM users WHERE id = 1 AND username = 'Abdo'")
    admin = cursor.fetchone()

    cursor.close()
    mydb.close()

    if admin:
        return jsonify({'admin': admin[0]})
    else:
        return jsonify({'message': 'No admin found!'})

if __name__ == '__main__':
    app.run(debug=True)
