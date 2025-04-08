import { getDatabase, ref, get, set, child, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { db } from "/firebase.js";


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
let container = document.getElementById("container_students");
let remover = document.getElementById('RemStu')
let inputField = document.getElementById("hiddenInput");

window.onload = async function() {
    const accounts = await getAccounts();
    console.log("🔥 accounts from DB:", accounts);

    const email = localStorage.getItem("email");
    console.log("📩 email from localStorage:", email);

    // if (!email) {
    //     window.location.href = "/login/index.html";
    //     return;
    // }

    const fixedEmail = email.replace(/\./g, "_");
    console.log("🔑 available keys:", Object.keys(accounts));
    console.log("🔑 looking for:", fixedEmail);

    const userData = accounts[fixedEmail];

    console.log("userData:", userData);

    // if (!userData) {
    //     // window.location.href = "/login/index.html";
    //     return;
    // }

    if (!userData) {
        // window.location.href = "/login/index.html";
        return;
    }
    const role = userData.role;
    

    if (role === "Teacher") {
        document.getElementById("teacherControls").style.display = "block";
    } else {
        document.getElementById("teacherControls").style.display = "none";
        Students(accounts);
    }
};



function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    window.location.href = "/login/index.html";
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
    container.style.display = container.style.display === "none" ? "block" : "none";
    inputField.style.display = inputField.style.display = "none";
    remover.style.display = remover.style.display = "none";

    container.innerHTML = "<h2>All students:</h2>";

    for (let email in accounts) {
        if (accounts[email].role === "Student") {
            let parts = email.split("_"); //بيقسم
            let originalEmail = parts[0] + "@" + parts.slice(1).join("."); //يعني أول جزء + "@"
            const p = document.createElement("p");
            p.textContent = `- 👨‍🎓 Student: ${originalEmail}`;
            container.appendChild(p);
        }
    }
}



function Add_lesson(){
    // remover.style.display = remover.style.display = "none";
    // inputField.style.display = inputField.style.display = "none" ;
    // container.style.display = container.style.display = "none" ;
    window.location.href = "/LessonControls/index.html"; 
}


async function Students(accounts) {
    const email = localStorage.getItem("email");
    const fixedEmail = email.replace(/\./g, "_");
    const role = accounts[fixedEmail]?.role; // ✅ كده صح

    if (role !== "Student") return;

    const snapshot = await get(child(ref(db), "lessons"));
    const lessons = snapshot.exists() ? snapshot.val() : {};

    const MainDiv = document.getElementById("students");
    MainDiv.innerHTML = "";

    for (let name in lessons) {
        const { videoURL } = lessons[name];
        if (!videoURL) continue;

        const lessonDiv = document.createElement("div");
        lessonDiv.classList.add("lessonDiv");

        const h3 = document.createElement("h3");
        h3.textContent = `- 📑 lesson: ${name}`;
        h3.classList.add('lesson_name');

        const a = document.createElement("a");
        a.href = videoURL;
        a.textContent = "▶️ Watch Video";
        a.target = "_blank";

        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.classList.add('lesson-checkbox');
        label.appendChild(checkbox);

        lessonDiv.appendChild(h3);
        lessonDiv.appendChild(a);
        lessonDiv.appendChild(label);
        MainDiv.appendChild(lessonDiv);
    }
}
