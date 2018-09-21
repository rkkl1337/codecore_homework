const alphabetList = "abcdefghijklmnopqrstuvwxyz".split("");

for (let char of alphabetList) {
    const alphabet = document.querySelector("#alphabet-container");
    const createDiv = document.createElement('div');
    createDiv.id = char;
    createDiv.classList.add('letters', 'unclicked');
    createDiv.innerHTML = `<p>${char.toUpperCase()}</p>`;
    alphabet.appendChild(createDiv);
}