import { db } from "/firebase.js"; // تأكد إن المسار صحيح
import { ref, get,set , remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// عناصر التحكم
document.getElementById("del_sel").addEventListener("click", DeleteSelected);
document.getElementById("select").addEventListener("click", SelectAll);
document.getElementById("edit_sel").addEventListener("click", editSelected);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === 'a') {
        event.preventDefault();
        SelectAll();
    }
});

const MainDiv = document.getElementById("add");

// تحميل الدروس من Firebase
const lessonsRef = ref(db, "lessons");

get(lessonsRef).then(snapshot => {
    if (snapshot.exists()) {
        const All_lessons = snapshot.val();
        MainDiv.innerHTML = ""; // فضي المحتوى

        for (let name in All_lessons) {
            const lessonData = All_lessons[name];
            const url = lessonData.videoURL;
            console.log(url)
            if (!url) continue;

            // إنشاء العناصر
            const lessonDiv = document.createElement("div");
            lessonDiv.classList.add("lessonDiv");

            const h3 = document.createElement("h3");
            h3.textContent = `- 📑 lesson: ${name}`;
            h3.classList.add('lesson_name');

            const a = document.createElement("a");
            a.id = 'lessonA';
            a.href = url;
            a.textContent = "▶️ Watch Video";
            a.target = "_blank";
            a.classList.add('vid_name');

            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('lesson-checkbox');
            label.appendChild(checkbox);

            // ضيف للعناصر
            lessonDiv.appendChild(h3);
            lessonDiv.appendChild(a);
            lessonDiv.appendChild(label);
            MainDiv.appendChild(lessonDiv);
        }
    } else {
        console.log("No lessons found");
    }
});

// حدد الكل
function SelectAll() {
    document.querySelectorAll(".lesson-checkbox").forEach(cb => cb.checked = true);
}

// حذف الدروس المحددة من Firebase
function DeleteSelected() {
    const checkboxes = document.querySelectorAll(".lesson-checkbox");

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const lessonDiv = checkbox.closest(".lessonDiv");
            const rawText = lessonDiv.querySelector(".lesson_name").textContent;
            const lessonName = rawText.replace("- 📑 lesson: ", "").trim();
            console.log("Trying to delete lesson:", lessonName);

            const lessonRef = ref(db, `lessons/${lessonName}`);
            remove(lessonRef)
                .then(() => {
                    console.log(`Lesson "${lessonName}" deleted from Firebase.`);
                    lessonDiv.remove(); // شيله من الصفحة
                })
        }
    });
}



let lessonName;

// let done;

function editSelected(){
    let checkboxes = document.querySelectorAll(".lesson-checkbox");
    let selected = Array.from(checkboxes).filter(cb => cb.checked);

    // checkboxes.forEach(function(checkbox) {
    //     if (checkbox.checked === true) {
            // if ((checkbox.checked == true)  == 1) {
    if (selected.length === 1) {
        let checkbox = selected[0];
        let lessonDiv = checkbox.closest(".lessonDiv"); //ستعيد closest() هذا العنصر الأب
    
        let rawText = lessonDiv.querySelector(".lesson_name").textContent;
        lessonName = rawText.replace("- 📑 lesson: ", "").trim();

        let rawvid = lessonDiv.querySelector('.vid_name').href
        let VideoName = rawvid.replace("blob:", "").trim();
        console.log(VideoName); 

        const input = document.createElement("input");
        input.type = "text";
        input.value = lessonName;
        input.id = 'inp'
        lessonDiv.querySelector(".lesson_name").replaceWith(input);

        const input2 = document.createElement("input");
        input2.type = "text";
        input2.value = VideoName;
        input2.id = 'inp2'
        lessonDiv.querySelector(".vid_name").replaceWith(input2);

        checkbox.style.display = "none";

        let done = document.createElement("button");
        done.textContent = "Done!";
        done.id = "done"
        lessonDiv.appendChild(done)
    
        done.addEventListener("click", doneFunction);

    }else{
        alert('Select one lesson!')
        location.reload();
    }
//     }}
// )

}

// done.addEventListener("click", doneFunction);
function doneFunction() {
    let name = document.getElementById("inp");
    let video = document.getElementById("inp2");

    console.log(name.value);
    console.log(lessonName);

    const newLessonRef = ref(db, `lessons/${name.value}`);
    
    // أول حاجة نمسح الدرس القديم لو الاسم اتغيّر
    if (name.value !== lessonName) {
        const oldLessonRef = ref(db, `lessons/${lessonName}`);
        remove(oldLessonRef);
    }

    // بعد كده نضيف أو نعدّل الدرس الجديد
    set(newLessonRef, {
        videoURL: video.value
    }).then(() => {
        console.log("Lesson updated in Firebase");
        location.reload();
    }).catch(err => {
        console.error("Error updating lesson:", err);
        alert("حصلت مشكلة، جرّبي تاني");
    });
}
