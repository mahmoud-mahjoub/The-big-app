let input1 = document.querySelector("#noteDialog input");
let textarea = document.querySelector("#noteDialog textarea");
let noteArray = JSON.parse(localStorage.getItem("Notes")) || [];
let allNotes = document.querySelector(".container .allNotes");
let editingNoteId = null;

function openDialog() {
    document.querySelector("#noteDialog").showModal();
}
function closeDialog() {
    document.querySelector("#noteDialog").close();
    input1.value = "";
    textarea.value = "";
    editingNoteId = null;
    document.querySelector("#noteDialog .final .Add").textContent = "Add";
}
function addNote() {
    let title = input1.value;
    let description = textarea.value;
    if (!title && !description) return;

    if (editingNoteId) {
        let note = noteArray.find(n => n.id === editingNoteId);
        note.title = title;
        note.description = description;

        allNotes.innerHTML = "";
        noteArray.forEach(addNoteToBody);
        editingNoteId = null;
    } else {
        let date = Date.now();
        let storageNote = {
            id: date,
            title: title,
            description: description,
        };
        if (storageNote.title || storageNote.description) {
            noteArray.push(storageNote);
            addNoteToBody(storageNote);
        }
    }

    localStorage.setItem("Notes", JSON.stringify(noteArray));
    closeDialog();
    document.querySelector("#noteDialog .final .Add").textContent = "Add";
}

function addNoteToBody(note) {
    let container = document.querySelector(".allNotes");
    let body = document.createElement("div");
    body.classList.add("noteDiv");
    body.setAttribute("data-id", note.id); 
    container.appendChild(body);

    let title = document.createElement("h3");
    title.innerText = note.title;
    body.appendChild(title);

    let desc = document.createElement("p");
    desc.innerText = note.description;
    body.appendChild(desc);
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
    body.appendChild(btnContainer);
    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.classList.add("delBtn");
    btnContainer.appendChild(delBtn);

    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.classList.add("editBtn");
    editBtn.onclick = function () {
        editNote(note);
    };
    btnContainer.appendChild(editBtn);
}
function loadNotes() {
    noteArray.forEach(note => addNoteToBody(note));
}
function editNote(note) {
    openDialog();
    input1.value = note.title;
    textarea.value = note.description;
    editingNoteId = note.id;

    document.querySelector("#noteDialog .final .Add").textContent = "Update";
    document.querySelector("#noteDialog h2").textContent = "Edit Note";
}

function delPopUp(noteId) {
    if (document.querySelector(".delPopUp")) return;

    let body = document.querySelector("body");
    let popUp = document.createElement("div");
    popUp.classList.add("delPopUp");
    popUp.setAttribute("data-id", noteId);
    body.appendChild(popUp);

    let h2 = document.createElement("h2");
    h2.innerText = "Are You Sure ?";
    h2.classList.add("delPopUpH2");
    popUp.appendChild(h2);

    let btnContainer = document.createElement("div");
    popUp.appendChild(btnContainer);

    let yesBtn = document.createElement("button");
    yesBtn.classList.add("yesBtn");
    yesBtn.innerText = "Yes";
    btnContainer.appendChild(yesBtn);

    let noBtn = document.createElement("button");
    noBtn.classList.add("noBtn");
    noBtn.innerText = "No";
    btnContainer.appendChild(noBtn);
}

document.addEventListener("keydown", function (e) {
    const dialog = document.querySelector("#noteDialog");
    const isDialogOpen = dialog && dialog.hasAttribute("open");

    if (isDialogOpen && e.key === "Enter" && document.activeElement !== textarea) {
        e.preventDefault();
        addNote();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("yesBtn")) {
        const popUp = e.target.closest(".delPopUp");
        const noteId = Number(popUp.getAttribute("data-id")); // ✅ Get ID from popup

        noteArray = noteArray.filter(n => n.id !== noteId);
        localStorage.setItem("Notes", JSON.stringify(noteArray));

        const noteDiv = document.querySelector(`.noteDiv[data-id="${noteId}"]`);
        if (noteDiv) noteDiv.remove();

        popUp.remove();
    }

    if (e.target.classList.contains("noBtn")) {
        const popUp = e.target.closest(".delPopUp");
        popUp.remove();
    }
});

allNotes.addEventListener("click", function (e) {
    if (e.target.classList.contains("delBtn")) {
        let noteDiv = e.target.closest(".noteDiv"); // ✅ This finds the correct parent
        let noteId = Number(noteDiv.getAttribute("data-id"));
        delPopUp(noteId);
    }
});


loadNotes();
