let Sounds = {
  music: new Audio(), 
  collision: new Audio(), 
  death: new Audio(), 
  live: new Audio(), 
  reload: new Audio(),
  changeDay: new Audio(),

  init: function() {
    this.music.src = "../audio/music.mp3";
    this.music.loop = true;
    this.music.autoplay = true;

    this.collision.src = "../audio/collision.wav";
    this.death.src = "../audio/death.wav";
    this.live.src = "../audio/live.mp3";
    this.reload.src = "../audio/reload.wav";
    this.changeDay.src = "../audio/changeday.wav"
  }
}