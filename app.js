class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-audio");
    this.kickOption = "./sounds/kick-acoustic01.wav";
    this.snareAudio = document.querySelector(".snare-audio");
    this.snareOption = "./sounds/snare-acoustic01.wav";
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.hihatOption = "./sounds/hihat-acoustic01.wav";
    this.openhatAudio = document.querySelector(".openhat-audio");
    this.openhatOption = "./sounds/openhat-acoustic01.wav";
    this.tomAudio = document.querySelector(".tom-audio");
    this.tomOption = "./sounds/tom-acoustic01.wav";
    this.selectOptions = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 120;
    this.playBtn = document.querySelector(".play-btn");
    this.playPauseIcon = document.querySelector("#play-pause");
    this.header = document.querySelector(".custom-header");
    this.isPlaying = null;
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.openModalBtn = document.querySelector(".open-modal");
    this.closeModalBtn = document.querySelector(".close-modal");
  }

  createHeader() {
    if (localStorage.name) {
      this.header.innerHTML = `BeatZ by ${localStorage.name}`;
    } else {
      let name = prompt("What is your name?");
      localStorage.setItem("name", name);
      this.header.innerHTML = `BeatZ by ${name}`;

      //show instruction modal
      const modalWindow = document.querySelector(".modal-overlay");
      modalWindow.style.display = "flex";
    }
  }

  handleModal(e) {
    const modalWindow = document.querySelector(".modal-overlay");

    if (e.target.classList.contains("open-modal")) {
      modalWindow.style.display = "flex";
    }

    if (e.target.classList.contains("close-modal")) {
      modalWindow.style.display = "none";
    }
  }

  repeat() {
    let step = this.index % 16;
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
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        if (bar.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
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
      case "openhat-select":
        this.openhatAudio.src = optionValue;
        break;
      case "tom-select":
        this.tomAudio.src = optionValue;
        break;
    }
  }

  mute(e) {
    const dataTrack = e.target.getAttribute("data-track");

    e.target.classList.toggle("muted");
    if (e.target.classList.contains("muted")) {
      switch (dataTrack) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.openhatAudio.volume = 0;
          break;
        case "4":
          this.tomAudio.volume = 0;
          break;
      }
    } else {
      switch (dataTrack) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.openhatAudio.volume = 1;
          break;
        case "4":
          this.tomAudio.volume = 1;
          break;
      }
    }
  }

  changeTempoNum(e) {
    const tempoNum = document.querySelector(".tempo-num");
    tempoNum.innerText = e.target.value;
  }

  updateTempo(e) {
    //sets the bpm to the slider value
    this.bpm = e.target.value;

    //clears the isPlaying interval and resets it
    clearInterval(this.isPlaying);
    this.isPlaying = null;

    //checks if the playBtn contains play class
    const playBtn = document.querySelector(".play-btn");
    if (playBtn.classList.contains("play")) {
      //if it does, start the drumkit
      this.start();
    }
  }
}

const drumKit = new DrumKit();

drumKit.createHeader();

drumKit.openModalBtn.addEventListener("click", function (e) {
  drumKit.handleModal(e);
});
drumKit.closeModalBtn.addEventListener("click", function (e) {
  drumKit.handleModal(e);
});

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

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempoNum(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  //on change is required so the start() function is only invoked once
  //rather than each time the input updates
  drumKit.updateTempo(e);
});
