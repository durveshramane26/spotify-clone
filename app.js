console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let Timeduration = document.getElementById("Timeduration");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let zero = document.getElementById("0");
let timeStamps = document.getElementsByClassName("timestamp");

let songs = [
  {
    songName: "Trampoline",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Sweater Weather",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "IT Ani't Me",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Everthing i wanted",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Baarishein",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Just You and i",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Into the black",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Back to You",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Trust Fund Baby",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  { songName: "Stay", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

let audioElements = songs.map((song) => {
  return new Audio(song.filePath);
});

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play()

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
audioElements.forEach((audioElement, index) => {
  audioElement.onloadedmetadata = function () {
    //  console.log(audioElement.duration);
    let min_duration = Math.floor(audioElement.duration / 60);
    let sec_duration = Math.floor(audioElement.duration % 60);
    if (sec_duration < 10) {
      sec_duration = `0${sec_duration}`;
    }
    let tot_duration = `${min_duration}:${sec_duration}`;
    let timestamp = document.getElementById(index);
    //  console.log(tot_duration);
    timestamp.innerHTML = `${tot_duration}`;
  };
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //update Seekbar
  // console.log(audioElement.duration)
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;

  /*
    let min_duration = Math.floor(audioElement.duration / 60);
    let sec_duration = Math.floor(audioElement.duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;

    Timeduration.innerText = `${tot_duration}`;
*/
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      //   element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log("clicked");
      makeAllPlays();
      if(e.target.classList.contains("fa-circle-pause")) {
        console.log("puading it as it already contains pause")  
        audioElement.pause();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
          return;
      }
      let songIndex = parseInt(e.target.id);
      
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      const isPlaying = audioElement.paused;
      console.log(audioElement.paused, "is playing", audioElement)
      if (isPlaying) {
       console.log("playing",songIndex)
        // console.log(songIndex);
        
        e.target.classList.remove("fa-circle-play");
        // if song is playing, add pause button
        e.target.classList.add("fa-circle-pause");
        // console.log("play removed pause added")
        // audioElement.src = `songs/${songIndex + 1}.mp3`;
        // masterSongName.innerText = songs[songIndex].songName;
        // audioElement.currentTime = 0;    
        audioElement.play();
        // gif.style.opacity = 1;
        // masterPlay.classList.remove("fa-circle-play");
        // masterPlay.classList.add("fa-circle-pause");
      } else {
          console.log("paused")
        // console.log("pausing..", audioElement.src);
        // audioElement.pause();
        // console.log({songIndex});
        // let newElement = audioElement;
        // newElement.src = `songs/${songIndex + 1}.mp3`;
        // newElement.play();
        // e.target.classList.remove("fa-circle-pause");
        // console.log("pause removed from else")
       
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
