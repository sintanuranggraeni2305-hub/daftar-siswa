import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("formSiswa");
const nama = document.getElementById("nama");
const kelas = document.getElementById("kelas");
const listSiswa = document.getElementById("listSiswa");

let editId = null;

loadData();

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    if(editId){

        await updateDoc(
            doc(db,"siswa",editId),
            {
                nama:nama.value,
                kelas:kelas.value
            }
        );

        editId = null;

    }else{

        await addDoc(
            collection(db,"siswa"),
            {
                nama:nama.value,
                kelas:kelas.value
            }
        );

    }

    form.reset();

    loadData();

});

async function loadData(){

    listSiswa.innerHTML = "";

    const querySnapshot =
        await getDocs(
            collection(db,"siswa")
        );

    querySnapshot.forEach((documentData)=>{

        const data = documentData.data();

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${data.nama}</h3>
            <p>${data.kelas}</p>

            <div class="actions">

                <button
                    class="editBtn"
                    data-id="${documentData.id}"
                    data-nama="${data.nama}"
                    data-kelas="${data.kelas}">
                    Edit
                </button>

                <button
                    class="hapusBtn"
                    data-id="${documentData.id}">
                    Hapus
                </button>

            </div>
        `;

        listSiswa.appendChild(card);

    });

    pasangEvent();
}

function pasangEvent(){

    document
    .querySelectorAll(".hapusBtn")
    .forEach((btn)=>{

        btn.addEventListener(
            "click",
            async ()=>{

                const id =
                btn.dataset.id;

                await deleteDoc(
                    doc(db,"siswa",id)
                );

                loadData();

            }
        );

    });

    document
    .querySelectorAll(".editBtn")
    .forEach((btn)=>{

        btn.addEventListener(
            "click",
            ()=>{

                editId =
                btn.dataset.id;

                nama.value =
                btn.dataset.nama;

                kelas.value =
                btn.dataset.kelas;

            }
        );

    });

}