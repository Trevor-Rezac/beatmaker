class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-audio");
    this.kickOption = "./sounds/kick-808.wav";
    this.snareAudio = document.querySelector(".snare-audio");
    this.snareOption = "./sounds/snare-808.wav";
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.hihatOption = "./sounds/hihat-808.wav";
    this.selectOptions = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 120;
    this.playBtn = document.querySelector(".play-btn");
    this.playPauseIcon = document.querySelector("#play-pause");
    this.header = document.querySelector(".custom-header");
    this.isPlaying = null;
  }

  createHeader() {
    if (localStorage.name) {
      this.header.innerHTML = `BeatZ by ${localStorage.name}`;
    } else {
      let name = prompt("What is your name?");
      localStorage.setItem("name", name);
      this.header.innerHTML = `BeatZ by ${name}`;
    }
  }

  repeat() {
    let step = this.index % 10;
    const activeBars = document.querySelectorAll(`.beat${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack .3s alternate ease-in-out 2`;

      //check if pads are active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          //reset the audio file play time back to 0 on each beat
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //check if loop is currently playing
    if (this.isPlaying) {
      //clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  activePad() {
    this.classList.toggle("active");
  }

  updatePlayPauseBtn() {
    this.playBtn.classList.toggle("play");
    this.playBtn.classList.contains("play")
      ? (this.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>')
      : (this.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>');
  }

  changeSound(e) {
    const optionName = e.target.name;
    const optionValue = e.target.value;

    switch (optionName) {
      case "kick-select":
        this.kickAudio.src = optionValue;
        break;
      case "snare-select":
        this.snareAudio.src = optionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = optionValue;
        break;
    }
  }
}

const drumKit = new DrumKit();

drumKit.createHeader();

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.updatePlayPauseBtn();
});

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.selectOptions.forEach((option) => {
  option.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
