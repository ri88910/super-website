// // firebase-init.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// const firebaseConfig = {
//   databaseURL: "https://e-g-abdo-school-default-rtdb.firebaseio.com",
//   apiKey: "AIzaSyDjGAnIBiLytTdpISfCop5uF-3qeGuCr5g",
//   authDomain: "e-g-abdo-school.firebaseapp.com",
//   projectId: "e-g-abdo-school",
//   storageBucket: "e-g-abdo-school.appspot.com",
//   messagingSenderId: "951844402903",
//   appId: "1:951844402903:web:48c0fae60f545a7b4fa292",
//   measurementId: "G-W05G8EMXQE"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// export { db }; // تصدير db لاستخدامه في ملفات تانية

// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js"; // ✅ مهم

const firebaseConfig = {
  databaseURL: "https://e-g-abdo-school-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyDjGAnIBiLytTdpISfCop5uF-3qeGuCr5g",
  authDomain: "e-g-abdo-school.firebaseapp.com",
  projectId: "e-g-abdo-school",
  storageBucket: "e-g-abdo-school.appspot.com",
  messagingSenderId: "951844402903",
  appId: "1:951844402903:web:48c0fae60f545a7b4fa292",
  measurementId: "G-W05G8EMXQE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app); // ✅ مهم

export { db, storage }; // ✅ مهم
