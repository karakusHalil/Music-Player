const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
  {
    name: "AnılDURMUS",
    displayName: "Artık Olmaman Gerek",
    artist: "Anıl DURMUŞ",
  },
  {
    name: "Irem",
    displayName: "Hayalet Sevgilim",
    artist: "İrem",
  },
  {
    name: "SahinKENDIRCI",
    displayName: "İçim Yanar",
    artist: "Şahin Kendirci",
  },
  {
    name: "Demet",
    displayName: "Arnavut Kaldırımı",
    artist: "Demet Sağıroğlu",
  },
  {
    name: "Semicenk",
    displayName: "Sen Kaldın",
    artist: "Semicenk",
  },
  {
    name: "EbruGundes",
    displayName: "Ölümsüz Aşklar",
    artist: "Ebru GÜNDEŞ",
  },
  {
    name: "NazanBeniHatırla",
    displayName: "Beni Hatırla",
    artist: "Nazan ÖNCEL",
  },
  {
    name: "NazanNereyeBoyle",
    displayName: "Nereye Böyle",
    artist: "Nazan ÖNCEL & Tarkan",
  },
  {
    name: "AliKINIK",
    displayName: "Zemheri",
    artist: "Ali KINIK",
  },
  {
    name: "EylemAKTAS",
    displayName: "Yüreğimden Tut",
    artist: "Eylem AKTAŞ",
  },
  {
    name: "Zifiri",
    displayName: "Zifiri",
    artist: "BAYHAN",
  },
  {
    name: "Tiryakinim",
    displayName: "Tiryakinim",
    artist: "BAYHAN",
  },
  {
    name: "MansurArk",
    displayName: "Silinmez",
    artist: "Mansur Ark",
  },
  {
    name: "Sagopa366",
    displayName: "366.Gün",
    artist: "Sagopa Kajmer",
  },
  {
    name: "ibrahimTatlıses",
    displayName: "Allah'ım Neydi Günahım",
    artist: "İbrahim TATLISES",
  },
  {
    name: "bayhanGassal",
    displayName: "Efendim İşitmedim",
    artist: "BAYHAN",
  },
];

//Check if Playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.classList.replace("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Prev Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  console.log(songIndex);

  loadSong(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    //Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set Progress Bar

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  //   console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
