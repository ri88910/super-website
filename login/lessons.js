import { ref, get, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js"; // استيراد الدوال اللازمة
import { db } from "/firebase.js";  // تأكد من المسار الصحيح لملف firebase-init.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // تحويل البريد الإلكتروني إلى مسار صالح في Firebase
    const emailPath = email.replace(/[@.]/g, "_");  // استبدال "@" و "." بـ "_"

    // جلب الحسابات من Firebase باستخدام البريد الإلكتروني المعدل
    const accountsRef = ref(db, 'accounts/' + emailPath);

    get(accountsRef).then((snapshot) => {
        if (snapshot.exists()) {
            // الحساب موجود → التحقق من كلمة المرور
            const account = snapshot.val();
            if (account.password === password) {
                console.log(localStorage.getItem("email"))
                alert("✅ Login successful!");




                // تحديد الدور بناءً على الحساب المسجل
                localStorage.setItem("role", account.role);

                // إعادة توجيه المستخدم
                window.location.href = "/lesson/lessons.html"; 
            } else {
                alert("❌ Wrong password. Try again.");
            }
        } else {
            // الحساب غير موجود → تسجيله لأول مرة
            const role = (password === "teacher123") ? "Teacher" : "Student";

            // إضافة الحساب الجديد إلى Firebase باستخدام البريد الإلكتروني المعدل
            set(ref(db, 'accounts/' + emailPath), {
                password: password,
                role: role
            }).then(() => {
                alert("✅ Registered successfully! Please login again.");

                // مسح الفورم بعد التسجيل
                document.getElementById("loginForm").reset();
            }).catch((error) => {
                console.error("Error saving account: ", error);
            });
        }
    }).catch((error) => {
        console.error("Error fetching accounts: ", error);
    });
});
