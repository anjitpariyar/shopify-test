import { select } from '../helpers/_dom';
import Player from '@vimeo/player';

export default class ToggleVideo extends HTMLElement {
  constructor() {
    super();
    this.button = select('[data-toggle-btn]', this);
    this.video = select('[data-video]', this);
    this.timeDisplay = select('[data-time]', this);
    this.player = new Player(this.video);
    this.player.on('timeupdate', (data) => {
      const minutes = Math.floor(data.seconds / 60);
      const seconds = Math.floor(data.seconds % 60);
      const timeString = `${minutes} : ${seconds}`;
      this.timeDisplay.textContent = `${timeString}`;
    });
    this.button.listen('click', () => {
      this.button.modifyClass('toggle', 'c-video__playPauseBtn--pause');
      this.togglePlayPause(this.video);
    });
  }
  togglePlayPause(videoElement) {
    const player = new Player(videoElement);
    player.getPaused().then((paused) => {
      paused ? player.play() : player.pause();
    });
  }
}