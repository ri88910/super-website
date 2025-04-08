import { ref, set, update, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { db } from "../firebase.js"; 


const name_input = document.getElementById('name_input');
const name_button = document.getElementById('button_name');
const title = document.getElementById('title');
let videoInput = document.getElementById('videoLinkInput');
const button_video = document.getElementById('button_video');

document.getElementById("first_add").addEventListener("click", add_name);
document.getElementById("button_name").addEventListener("click", add_name_to_firebase);
document.getElementById("add_vid").addEventListener("click", add_video);
document.getElementById("button_video").addEventListener("click", saveVideoLink);


function add_name() {
    name_input.style.display = "block";
    name_button.style.display = 'block';
}

async function add_name_to_firebase() {
    const name = name_input.value.trim();
    if (name !== "") {
        const lessonRef = ref(db, `lessons/${name}`);
        const snapshot = await get(lessonRef);

        if (!snapshot.exists()) {
            await set(lessonRef, { name: name, videoURL: "", fileName: "" });
            alert("✅ Added successfully to Firebase!");
            title.style.display = "block";
            title.innerText = name;
            name_button.disabled = true;
        } else {
            alert("❌ This name already exists. Try again.");
        }
    } else {
        alert("⚠️ Please enter a valid name.");
    }

    name_input.value = '';
    name_input.style.display = "none";
    name_button.style.display = 'none';
}

function add_video() {
    button_video.style.display = button_video.style.display === "none" ? "block" : "none";
    videoInput.style.display = videoInput.style.display === "none" ? "block" : "none";
}

function saveVideoLink() {
    const videoLink = document.getElementById('videoLinkInput').value;
    const name = title.innerText; // العنوان

    if (videoLink) {
        const lessonRef = ref(db, `lessons/${name}`);
        update(lessonRef, {
            videoURL: videoLink // تخزين الرابط
        }).then(() => {
            alert(`✅ تم تخزين الرابط بنجاح!`);
            document.getElementById('videoLinkInput').value = ''; // مسح الـ input بعد الحفظ
            location.reload();
        });
        
    } else {
        alert("❌ الرجاء إدخال رابط الفيديو.");
    }
}
