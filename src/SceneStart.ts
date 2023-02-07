import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Level from './Level.js';
import Scene from './Scene.js';

export default class SceneStart extends Scene {
  private starting: boolean;

  private logo: HTMLImageElement;

  private audio: HTMLAudioElement;

  private isAudioPlaying: boolean;

  private timeToPlayAudio: number;

  private keylistener: KeyListener;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.starting = false;
    this.keylistener = new KeyListener();
    this.audio = new Audio('assets/audio/HarryPotter.mp3');
    this.isAudioPlaying = false;
    this.audio.volume = 0.1;
    this.timeToPlayAudio = 1;
    this.audio.loop = true;
    this.logo = CanvasUtil.loadNewImage('./assets/StartScreen.png');
  }

  /**
   * Inputs
   *
   */
  public override processInput(): void {
    if (this.keylistener.keyPressed(KeyListener.KEY_SPACE)) {
       this.starting = true;
    }
  }

  /**
   * Update start screen
   *
   * @param elapsed time that has elapsed
   * @returns new level when game starts
   */
  public override update(elapsed: number): Scene {
    // Load scene when starting.
    if (this.starting)
    {
      this.audio.play();
      return new Level(this.maxX, this.maxY);
    }
    return null;
  }

  /**
   * Renders start screen
   *
   * @param canvas input of canvas
   */
  // eslint-disable-next-line class-methods-use-this
  public override render(canvas: HTMLCanvasElement): void {
    CanvasUtil.fillCanvas(canvas, '#000');
    CanvasUtil.writeTextToCanvas(canvas, '[S] TO START', canvas.width / 2, canvas.height / 2 + 100, 'center', 'ScoreFont', 50, 'white');
    CanvasUtil.drawImage(canvas, this.logo, 0, 0);
  }
}
