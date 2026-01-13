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
        textarea.value += char;
    });
});


// === Shortcut replacement ===
function shortcut() {
    const value = textarea.value;
    if (value.length < 2) return;

    const last = value.at(-1);
    const prev = value.at(-2);

    if (last === "=" && directMap[prev]) {
        textarea.value =
            value.slice(0, -2) + directMap[prev];
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