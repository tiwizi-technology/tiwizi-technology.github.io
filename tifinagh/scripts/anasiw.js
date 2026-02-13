// === Cache DOM elements ===
const textarea = document.getElementById("tirra");
const keyboards = document.querySelectorAll("#charKeyboard, #charKeyboard1, #charKeyboard2, #charKeyboard3");

// === Mapping direct mode ===
const directMap = {
    ⵛ: "ⵞ",
    ⴷ: "ⴹ",
    ⵀ: "ⵃ",
    ⵙ: "ⵚ",
    ⵔ: "ⵕ",
    ⵜ: "ⵟ",
    ⵣ: "ⵥ",
    ⴻ: "ⵄ",
    ⵢ: "ⵖ"
};

const mapTifinagh = {
    'a': 'ⴰ',
    'b': 'ⴱ',
    'c': 'ⵛ',
    'č': 'ⵞ',
    'd': 'ⴷ',
    'ḍ': 'ⴹ',
    'e': 'ⴻ',
    'f': 'ⴼ',
    'g': 'ⴳ',
    'h': 'ⵀ',
    'ḥ': 'ⵃ',
    'i': 'ⵉ',
    'j': 'ⵊ',
    'k': 'ⴽ',
    'l': 'ⵍ',
    'm': 'ⵎ',
    'n': 'ⵏ',
    'p': 'ⵒ',
    'q': 'ⵇ',
    'r': 'ⵔ',
    'ṛ': 'ⵕ',
    's': 'ⵙ',
    'ṣ': 'ⵚ',
    't': 'ⵜ',
    'ṭ': 'ⵟ',
    'u': 'ⵓ',
    'w': 'ⵡ',
    'x': 'ⵅ',
    'y': 'ⵢ',
    'z': 'ⵣ',
    'ẓ': 'ⵥ',
    'ɛ': 'ⵄ',
    'ɣ': 'ⵖ'
};

function shortcut1() {
    let text = textarea.value;
    let converted = "";

    for (let char of text) {
        converted += mapTifinagh[char] || char;
    }

    textarea.value = converted;
}

// Focus automatique au chargement
function focusTextarea() {
    document.getElementById("tirra").focus();
}

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