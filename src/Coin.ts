import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class Coin extends ScoreItem {
  private animationArray: string[];

  private timeToNextMove: number;

  private index: number;

  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.animationArray = ['./assets/coin_anim_f0.png', './assets/coin_anim_f1.png', './assets/coin_anim_f2.png', './assets/coin_anim_f3.png'];
    this.index = 0;
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
    this.timeToNextMove = 400;
  }

  /**
   *
   * @param elapsed elapsed time in the gameloops
   */
  public update(elapsed: number): void {
    this.timeToNextMove -= elapsed;
    if (this.timeToNextMove <= 0) {
      this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
      this.index += 1;
      this.timeToNextMove = 400;
      if (this.index === (this.animationArray.length - 1)) {
        this.index = 0;
      }
    }
  }
}
