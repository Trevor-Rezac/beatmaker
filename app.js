class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.index = 0;
    this.bpm = 120;
    this.playBtn = document.querySelector(".play-btn");
    this.playPauseIcon = document.querySelector("#play-pause");
    this.header = document.querySelector(".custom-header");
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
    let step = this.index % 8;
    const activeBar = document.querySelectorAll(`.beat${step}`);
    console.log(step);
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
  activePad() {
    this.classList.toggle("active");
  }
}

const drumKit = new DrumKit();

drumKit.createHeader();

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.playBtn.classList.toggle("play");
  drumKit.playBtn.classList.contains("play")
    ? (drumKit.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>')
    : (drumKit.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>');
});

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
});
