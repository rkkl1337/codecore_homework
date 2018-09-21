const names = ['Lebron James', 'Steph Curry', 'John Sy'];
const randomName = names[Math.floor(Math.random() * names.length)];

for (let char of randomName.split("")) {
    const guessDiv = document.querySelector("#guess-area");
    const createDiv = document.createElement('div');
    if (char === " ") {
        char = "&nbsp";
    } else {
        createDiv.classList.add("underline");
    }
    createDiv.innerHTML = `<p>${char.toUpperCase()}</p>`;
    createDiv.firstChild.classList.add("hidden");
    guessDiv.appendChild(createDiv);
}

