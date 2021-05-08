const body = document.querySelector('body');
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const volume = document.querySelector('.volume');
const volumeContainer = document.querySelector('.volume-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const mute = document.querySelector('#mute');
const playModeBtn = document.querySelector('#playMode');

// Song detatils
const songDetails = [
    {
        'title': 'Chúng ta của hiện tại',
        'url': 'ctcht',
    },
    {
        'title': 'Tâm sự cùng người lạ',
        'url': 'tscnl',
    },
    {
        'title': 'Bạc Phận (Masew Remix)',
        'url': 'bp',
    },
    {
        'title': '3107',
        'url': '3107',
    },
];

// Keep track of songs
let songIndex = 1;

// Play mode
let repeatSong = false;

// Keep track of volume
let currentVol = 1;

// Load song
loadSong(songDetails[songIndex]);


// Update song details
function loadSong(songDetail) {
    const songTitle = songDetail['title'];
    const songUrl = songDetail['url'];
    title.innerText = songTitle;
    audio.src = `music/${songUrl}.mp3`;
    cover.src = `images/${songUrl}.png`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function nextSong() {
    songIndex++;

    if (songIndex > songDetails.length - 1) {
        songIndex = 0;
    }

    loadSong(songDetails[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songDetails.length - 1;
    }

    loadSong(songDetails[songIndex]);
    playSong();
}

function endSong() {
    if (!repeatSong) {
        nextSong();
    }
    else {
        loadSong(songDetails[songIndex]);
        playSong();
    }
}

function updateProgess(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    // Get the width of the cliked element
    const width = this.clientWidth;

    // Get the place where the click occur according to the element itself
    const clickX = e.offsetX;

    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    volumePercent = (clickX / width) * 100;

    currentVol = (clickX / width) * 1;
    audio.volume = currentVol;
    volume.style.width = `${volumePercent}%`;
}



// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});

// Change song events
nextBtn.addEventListener('click', () => {
    nextSong();
});
prevBtn.addEventListener('click', () => {
    prevSong();
});
playModeBtn.addEventListener('click', () => {
    if (!repeatSong) {
        playModeBtn.style.color = 'lightseagreen';
        repeatSong = true;
    }
    else {
        playModeBtn.style.color = '#dfdbdf';
        repeatSong = false;
    }
});

// Audio progress
audio.addEventListener('timeupdate', updateProgess);
audio.addEventListener('ended', endSong);
progressContainer.addEventListener('click', setProgress);

// Volume progress
volumeContainer.addEventListener('click', setVolume);
mute.addEventListener('click', () => {
    if (audio.volume != 0) {
        mute.classList.remove('fa-volume-up');
        mute.classList.add('fa-volume-mute');
        mute.style.color = 'red';
        audio.volume = 0;
        volume.style.width = '0%';
    }
    else {
        mute.classList.add('fa-volume-up');
        mute.classList.remove('fa-volume-mute');
        mute.style.color = 'lightgreen';
        audio.volume = currentVol;

        const volPercent = (currentVol / 1) * 100;

        volume.style.width = `${volPercent}% `;
    }
});

// Background color change according to the album cover
cover.addEventListener('load', () => {
    try {
        var colorThief = new ColorThief();
        const palette = colorThief.getPalette(cover);
        const dominantColor = colorThief.getColor(cover);

        const brightColor = palette[0][0] + ', ' + palette[0][1] + ', ' + palette[0][2];
        const darkColor = palette[7][0] + ', ' + palette[7][1] + ', ' + palette[7][2];
        const dC = dominantColor[0] + ', ' + dominantColor[1] + ', ' + dominantColor[2];

        console.log(brightColor, darkColor);
        body.style.background = `linear-gradient(0deg, rgb(247, 247, 247) 23.8%, rgb(${dC}) 99%)`;
        musicContainer.style.boxShadow = `0 20px 20px 0 rgba(${darkColor}, 0.6)`;
    }
    catch (err) {
        body.style.backgroundImage = `linear-gradient(0deg, rgb(247, 247, 247) 23.8%, rgb(252, 221, 221) 92%)`;
        console.log(err);
    }
});