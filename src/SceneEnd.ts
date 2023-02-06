import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Level from './Level.js';
import Scene from './Scene.js';

export default class SceneEnd extends Scene {
  private starting: boolean;

  private logo: HTMLImageElement;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.starting = false;
    if (this.difficulty === 1) {
      this.logo = CanvasUtil.loadNewImage('./assets/EndScreenBad.png');
    } else if (this.difficulty === 2) {
      this.logo = CanvasUtil.loadNewImage('./assets/EndScreenAverage.png');
    } else {
      this.logo = CanvasUtil.loadNewImage('./assets/EndScreenGood.png');
    }
  }

  /**
   * Inputs
   *
   * @param keyListener input of keylistener
   */
  public override processInput(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_S)) {
      this.starting = true;
    }
  }

  /**
   * Update start screen
   *
   * @returns new level when game starts
   */
  public override update(): Scene {
    // Load scene when starting.
    if (this.starting) return new Level(this.maxX, this.maxY);
    return null;
  }

  /**
   * Renders start screen
   *
   * @param canvas input of canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasUtil.fillCanvas(canvas, '#000');
    CanvasUtil.writeTextToCanvas(canvas, '[S] TO START', canvas.width / 2, canvas.height / 2 + 100, 'center', 'ScoreFont', 50, 'white');
    CanvasUtil.drawImage(canvas, this.logo, 0, 0);
  }
}
