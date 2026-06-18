



import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmkNAYazQuavYTT1H3fTEgPeogtMiIDlA",
  authDomain: "daftar-siswa-4dd98.firebaseapp.com",
  projectId: "daftar-siswa-4dd98",
  storageBucket: "daftar-siswa-4dd98.firebasestorage.app",
  messagingSenderId: "292448052253",
  appId: "1:292448052253:web:90806227efa97fd0b312f4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };