MainDiv = document.getElementById("add");
let All_lessons = JSON.parse(localStorage.getItem("lessons")) || {};


MainDiv.innerHTML = "";  
let h2= document.createElement("h2");
h2.textContent = `All Lessons:`;
MainDiv.appendChild(h2);

for (let name in All_lessons){
    let url = All_lessons[name]
    if (!url) continue;

    let lessonDiv = document.createElement("div");
    lessonDiv.style.marginBottom = "20px";

    let p = document.createElement("p");
    p.textContent = `- 👨‍🎓 lesson: ${name}`;

    let video = document.createElement("video");
    video.src = url; 
    video.width = 400; 
    video.controls = true; 

    let source = document.createElement("source");
    source.src = url;
    source.type = "video/mp4";

    video.appendChild(source);


    lessonDiv.appendChild(p);
    lessonDiv.appendChild(video);
    MainDiv.appendChild(lessonDiv);
}