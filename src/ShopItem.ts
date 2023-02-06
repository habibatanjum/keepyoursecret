import CanvasUtil from './CanvasUtil.js';
import ScoreItem from './ScoreItem.js';

export default class ShopItem extends ScoreItem {
  private timeToNextMove: number;

  private animationArray: string[];

  private index: number;

  private cost: number;

  private status: boolean;

  private selected: boolean;

  public constructor(startX: number, startY: number, cost: number, animationArray: string[]) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.index = 0;
    this.animationArray = animationArray;
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
    this.cost = cost;
    this.status = false;
    this.selected = false;
    this.timeToNextMove = 200;
  }

  /**
   * @param elapsed elapsed time in the gameloop
   */
  public update(elapsed: number): void {
    this.timeToNextMove -= elapsed;
    if (this.timeToNextMove <= 0) {
      this.index += 1;
      this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
      this.timeToNextMove = 200;
      if (this.index === (this.animationArray.length - 1)) {
        this.index = 0;
      }
    }
  }

  public setSelected(): void {
    this.selected = true;
  }

  public setUnselected(): void {
    this.selected = false;
  }

  public getCost(): number {
    return this.cost;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public setItemUnlock(): void {
    this.status = true;
  }

  public getSelected(): boolean {
    return this.selected;
  }

  /**
   * @param canvas canvas to render on
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    if (!this.status) {
      CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('assets/coin_anim_f0.png'), this.posX - 8, this.posY + 43);
      CanvasUtil.writeTextToCanvas(canvas, `x ${this.cost}`, this.posX + 15, this.posY + 50, 'center', 'ScoreFont', 11, 'white');
    } else {
      CanvasUtil.writeTextToCanvas(canvas, 'UNLOCKED', this.posX + 7, this.posY + 50, 'center', 'ScoreFont', 11, 'white');
    }
  }
}
