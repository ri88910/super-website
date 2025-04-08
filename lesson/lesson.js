import { getDatabase, ref, get, set, child, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { db } from "../firebase.js";


async function getAccounts() {
    const snapshot = await get(child(ref(db), `accounts`));
    return snapshot.exists() ? snapshot.val() : {};
}

document.getElementById("showlist").addEventListener("click", ShowStudents);
document.getElementById("showInputBtn").addEventListener("click", Button_RemoverStudent);
document.getElementById("AddLesson").addEventListener("click", Add_lesson);
document.getElementById("RemStu").addEventListener("click", remove_student);
document.getElementById("out").addEventListener("click", logout);

const accounts = await getAccounts();
console.log(accounts)
let container_stu = document.getElementById("container_students");
let remover = document.getElementById('RemStu')
let inputField = document.getElementById("hiddenInput");
let container = document.getElementById("container");
let stu_page = document.getElementById('student');

// window.onload = async function() {
console.log("🔥 accounts from DB:", accounts);

window.onload = async function () {
    const email = localStorage.getItem("email");
    console.log(email)
}
const password = localStorage.getItem("role");
const email = localStorage.getItem("email");

console.log("📩 email from localStorage:", password);


const fixedEmail = email ? email.replace(/\./g, "_") : null;
console.log("🔑 available keys:", Object.keys(accounts));
console.log("🔑 looking for:", fixedEmail);

const userData = accounts[fixedEmail];


if (password == 'Teacher'){
    container.style.display = 'block'
    stu_page.style.display = 'none'
}else{
    container.style.display = 'none'
    stu_page.style.display = 'block'
}


function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    window.location.href = "../login/index.html";
}

function Button_RemoverStudent(){
    document.getElementById("showInputBtn").addEventListener("click", function() {
        inputField.style.display = inputField.style.display === "none" ? "block" : "none";
        remover.style.display = remover.style.display === "none" ? "block" : "none";
        container.style.display = container.style.display == "block" ? "none" : "none";
    });
}

async function remove_student() {
    const accounts = await getAccounts(); // ✅ هنا
    const StudentEmail = document.getElementById("hiddenInput").value;
    const CorrectEmail = StudentEmail.replace(/[@.]/g, "_");
    if (!CorrectEmail) return alert("❌ Please enter a student's email!");

    const fixedEmail = CorrectEmail.replace(/\./g, "_");

    if (accounts[fixedEmail] && accounts[fixedEmail].role === 'Student') {
        await remove(ref(db, `accounts/${fixedEmail}`));
        alert(`✅ Student ${CorrectEmail} has been removed.`);
    } else {
        alert("❌ Student not found!");
    }
}



async function ShowStudents() {
    const accounts = await getAccounts();
    container_stu.style.display = container_stu.style.display === "none" ? "block" : "none";
    inputField.style.display = inputField.style.display = "none";
    remover.style.display = remover.style.display = "none";

    container_stu.innerHTML = "<h2>All students:</h2>";

    for (let email in accounts) {
        if (accounts[email].role === "Student") {
            let parts = email.split("_"); //بيقسم
            let originalEmail = parts[0] + "@" + parts.slice(1).join("."); //يعني أول جزء + "@"
            const p = document.createElement("p");
            p.textContent = `- 👨‍🎓 Student: ${originalEmail}`;
            container_stu.appendChild(p);
        }
    }
}



function Add_lesson(){
    // remover.style.display = remover.style.display = "none";
    // inputField.style.display = inputField.style.display = "none" ;
    // container.style.display = container.style.display = "none" ;
    window.location.href = "/LessonControls/index.html"; 
}


const page = document.getElementById("student");
// تحميل الدروس من Firebase
const lessonsRef = ref(db, "lessons");

get(lessonsRef).then(snapshot => {
    if (snapshot.exists()) {
        const All_lessons = snapshot.val();
        page.innerHTML = ""; // فضي المحتوى

        for (let name in All_lessons) {
            const lessonData = All_lessons[name];
            const url = lessonData.videoURL;
            console.log(url)
            if (!url) continue;

            // إنشاء العناصر
            const show_lesson = document.createElement("div");
            show_lesson.classList.add("show_lesson");

            const h3 = document.createElement("h3");
            h3.textContent = `- 📑 lesson: ${name}`;
            h3.classList.add('lesson_name');

            const a = document.createElement("a");
            a.id = 'lessonA';
            a.href = url;
            a.textContent = "▶️ Watch Video";
            a.target = "_blank";
            a.classList.add('vid_name');

            // ضيف للعناصر
            show_lesson.appendChild(h3);
            show_lesson.appendChild(a);
            page.appendChild(show_lesson);
        }
    } else {
        console.log("No lessons found");
    }
});
