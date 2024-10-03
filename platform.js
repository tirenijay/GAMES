// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Sample user data
    const userName = "Player1";
    const userEmail = "player1@example.com";
    const userFavorites = "None yet";

    // Update profile info
    document.getElementById('user-name').textContent = userName;
    document.getElementById('user-email').textContent = userEmail;
    document.getElementById('user-favorites').textContent = userFavorites;

    // Music control
    const playMusicButton = document.getElementById('play-music-button');
    const backgroundMusic = document.getElementById('background-music');

    playMusicButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playMusicButton.textContent = "Pause Music";
        } else {
            backgroundMusic.pause();
            playMusicButton.textContent = "Play Music";
        }
    });
});
