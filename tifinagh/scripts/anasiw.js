// === Cache DOM elements ===
const textarea = document.getElementById("tirra");
const keyboards = document.querySelectorAll("#charKeyboard, #charKeyboard1");

// === Mapping direct mode ===
const directMap = {
    c: "č",
    d: "ḍ",
    g: "ǧ",
    h: "ḥ",
    r: "ṛ",
    s: "ṣ",
    t: "ṭ",
    z: "ẓ",
    y: "ɣ",
    e: "ɛ",
    C: "Č",
    D: "Ḍ",
    G: "Ǧ",
    H: "Ḥ",
    R: "Ṛ",
    S: "Ṣ",
    T: "Ṭ",
    Z: "Ẓ",
    Y: "Γ",
    E: "Ɛ"
};

// === Keyboard click handler (delegation) ===
keyboards.forEach(keyboard => {
    keyboard.addEventListener("click", ({ target }) => {
        const char = target.dataset.char;
        if (!char) return;

        textarea.focus();

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value =
            textarea.value.slice(0, start) +
            char +
            textarea.value.slice(end);

        const newPos = start + char.length;
        textarea.selectionStart = textarea.selectionEnd = newPos;
    });
});



// === Shortcut replacement ===
function shortcut() {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // on travaille sur le texte AVANT le curseur
    if (start < 2) return;

    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);

    const last = before.at(-1);
    const prev = before.at(-2);

    if (last === "=" && directMap[prev]) {
        const replacement = directMap[prev];

        textarea.value =
            before.slice(0, -2) +
            replacement +
            after;

        const newPos =
            start - 2 + replacement.length;

        textarea.selectionStart =
            textarea.selectionEnd = newPos;
    }
}


// === Clipboard ===
function copyText() {
    if (!textarea.value.trim()) return;

    navigator.clipboard.writeText(textarea.value).then(() => {
        showCopyToast();
        textarea.focus();
    });
}

function showCopyToast() {
    const toastEl = document.getElementById("copyToast");
    const toast = new bootstrap.Toast(toastEl, {
        delay: 2000
    });
    toast.show();
}

function cutText() {
    if (!textarea.value.trim()) return;

    navigator.clipboard.writeText(textarea.value).then(() => {
        showCopyToast();
        textarea.value = "";
        textarea.setSelectionRange(0, 0);
        textarea.focus();
    });
}

// === Clear ===
function clearText() {
    textarea.value = "";
    focusTextarea();
}

function focusTextarea() {
    textarea.setSelectionRange(0, 0);
    textarea.focus();
}