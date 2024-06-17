let textString = "";
let currentRectangleIndex = -1;
const colorsArray = ["#FFC0CB", "#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FFA07A"];
let isOnRectangles = true;
let rectanglesContainer, songsContainer, switchRectanglesSongsButton, lettersTextInput, lettersTextButton;

function chooseRectangleColor() {
    return colorsArray[currentRectangleIndex % colorsArray.length];
}

function addRectangle() {
    if (!isOnRectangles) return;
    if (textString.length <= 0) return;
    currentRectangleIndex++;
    const rectangle = document.createElement("div");
    rectangle.id = "rectangle" + currentRectangleIndex;
    rectangle.className = "rectangle";
    rectangle.innerHTML = textString[currentRectangleIndex % textString.length];
    rectangle.style.backgroundColor = chooseRectangleColor();
    rectanglesContainer.appendChild(rectangle);
}

function initRectangles() {
    currentRectangleIndex = -1;
    rectanglesContainer.innerHTML = "";
    for (let i = 0; i < textString.length; i++) {
        addRectangle();
    }
}

function populateSongsInList(songsList, object) {
    songsList.forEach(song => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.id}. ${song.artist} - ${song.name}`;
        object.appendChild(songItem);
    });
}

function initSongs() {
    songsContainer.innerHTML = "";
    
    const songsTitle = document.createElement("h1");
    songsContainer.appendChild(songsTitle);
    
    const songsList = document.createElement("ul");
    songsList.id = "songsList";
    songsContainer.appendChild(songsList);

    fetch("data/music.json").then(response => response.json()).then(data => {
        songsTitle.innerHTML = data.title;
        populateSongsInList(data.songs, songsList);
    });
}

function subtractRectangle() {
    if (!isOnRectangles) return;
    if (textString.length <= 0) return;
    if (currentRectangleIndex < 0)  return;
    const rectangle = document.getElementById("rectangle" + currentRectangleIndex);
    rectangle.remove();
    currentRectangleIndex--;
}

function switchRectanglesSongs() {
    if (textString.length <= 0) return;
    isOnRectangles = !isOnRectangles;
    switchRectanglesSongsButton.innerHTML = isOnRectangles ? "Switch to songs" : "Switch to rectangles";
    if (isOnRectangles) {
        rectanglesContainer.style.display = "flex";
        songsContainer.style.display = "none";
    } else {
        rectanglesContainer.style.display = "none";
        songsContainer.style.display = "block";
    }
}

function changeText() {
    if (!isOnRectangles) return;
    textString = lettersTextInput.value.trim().replace(/\s+/g, '');
    if (textString.length === 0) return;
    initRectangles();
    lettersTextInput.disabled = true;
    lettersTextButton.disabled = true;
}

window.onload = () => {
    rectanglesContainer = document.getElementById("rectanglesContainer");
    songsContainer = document.getElementById("songsContainer");
    switchRectanglesSongsButton = document.getElementById("switchRectanglesSongs");
    lettersTextInput = document.getElementById("lettersTextInput");
    lettersTextButton = document.getElementById("lettersTextButton");

    initSongs();

    document.getElementById("addRectangle").onclick = addRectangle;
    document.getElementById("subtractRectangle").onclick = subtractRectangle;
    switchRectanglesSongsButton.onclick = switchRectanglesSongs;
    lettersTextButton.onclick = changeText;
}