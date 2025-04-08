# myscript.py
import mysql.connector

# الاتصال بقاعدة البيانات
mydb = mysql.connector.connect(
    host="localhost",
    user="root",  # اسم المستخدم
    password="ri88910@fp#2010",  # كلمة المرور
    database="Abdo"  # اسم قاعدة البيانات
)

cursor = mydb.cursor()

# استعلام للتأكد إذا كان يوجد Admin
cursor.execute("SELECT username FROM users WHERE id = 1 AND username = 'Abdo'")
admin = cursor.fetchone()

if admin:
    print(f"Admin '{admin[0]}' has full access!")
else:
    print("No admin found!")

cursor.close()
mydb.close()
