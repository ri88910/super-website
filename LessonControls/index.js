// import { db } from "../firebase.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// document.getElementById("addLessonForm").addEventListener("submit", async function(e) {
//   e.preventDefault();
//   const lessonName = document.getElementById("lessonName").value;
//   const videoURL = document.getElementById("videoURL").value;

//   try {
//     await addDoc(collection(db, "lessons"), {
//       name: lessonName,
//       videoURL: videoURL
//     });
//     alert("✅ Lesson added successfully!");
//     window.location.href = "/lesson/lessons.html";
//   } catch (error) {
//     alert("❌ Error adding lesson: " + error.message);
//   }
// });

document.getElementById("add").addEventListener("click", Add_lesson);
document.getElementById("edit").addEventListener("click", Edit_lesson);

function Add_lesson(){
  window.location.href = "../adddL/add_lesson.html"; 
}

function Edit_lesson(){
  window.location.href = '../Edit/edit_lesson.html'
}
