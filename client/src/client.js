const sock = io();

function writeEvent(text) {
    // <ul> element
    const parent = document.querySelector("#events");

    // <li> element
    const el = document.createElement("li");
    el.innerHTML = text;

    parent.appendChild(el);
}

const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((hand) => {
        const button = document.getElementById(hand);
        button.addEventListener('click', () => {
            sock.emit('turn', hand);
        })
    });
};

writeEvent("Welcome to RPS");
sock.on("message", writeEvent);

const onFormSubmitted = (event) => {
    event.preventDefault();

    const input = document.querySelector("#chat");
    const text = input.value;
    input.value = "";

    sock.emit("message", text);
};

document
    .querySelector("#chat-form")
    .addEventListener("submit", onFormSubmitted);

addButtonListeners();
