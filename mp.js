// Array of songs with titles, cover images, and audio file paths
const songs = [
    { title: "Black Ball Drop", cover: "media/image/blackballdrop.jpg", audio: "media/audio/blackballdrop.mp3" },
    { title: "Android Anvil Drop", cover: "media/image/androidanvildrop.jpg", audio: "media/audio/androidanvildrop.mp3" },
    { title: "Griffin Drop", cover: "media/image/griffindrop.jpg", audio: "media/audio/griffindrop.mp3" },
    { title: "Evil Irish King March Drop", cover: "media/image/evilirishkingmarchdrop.jpg", audio: "media/audio/evilirishkingmarchdrop.mp3" },
    { title: "Birthday Lobotomy Drop", cover: "media/image/birthdaylobotomydrop.jpg", audio: "media/audio/birthdaylobotomydrop.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audioElement = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const coverImg = document.getElementById("cover-img");
const prevBtn = document.getElementById("prev-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");

// Load the current song
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    coverImg.src = song.cover;
    audioElement.src = song.audio;
}

// Play or pause the audio
function togglePlayPause() {
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = "<i class='fa-solid fa-play'></i>"; // Play symbol
    } else {
        audioElement.play();
        isPlaying = true;
        playPauseBtn.innerHTML = "<i class='fa-solid fa-pause'></i>"; // Pause symbol
    }
}

// Play the next song
function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    if (isPlaying) audioElement.play();
}

// Play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audioElement.play();
}

// Toggle shuffle mode
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? "black" : "gray";
}

// Toggle repeat mode
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? "black" : "gray";
}

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
    progressBar.value = (audioElement.currentTime / audioElement.duration) * 100 || 0;
});

// Seek audio
progressBar.addEventListener("input", () => {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

// Adjust volume
volumeSlider.addEventListener("input", () => {
    audioElement.volume = volumeSlider.value;
});

// Auto-repeat when the track ends
audioElement.addEventListener("ended", () => {
    if (isRepeat) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        nextSong();
    }
});

// Event listeners
prevBtn.addEventListener("click", prevSong);
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
shuffleBtn.addEventListener("click", toggleShuffle);
repeatBtn.addEventListener("click", toggleRepeat);

// Initialize player with the first song and autoplay it on page reload
loadSong(currentSongIndex);

const rangeSlider = document.querySelector('input[type="range"]');
const rangeValue = document.querySelector('.range-value');

rangeSlider.addEventListener('input', () => {
    const value = rangeSlider.value;
    const max = rangeSlider.max;
    const percentage = (value / max) * 100;
    rangeValue.textContent = value;
    rangeSlider.style.width = `${percentage}%`;
});

