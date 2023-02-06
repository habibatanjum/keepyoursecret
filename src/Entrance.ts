import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';
import Player from './Player.js';

export default class Entrance extends Drawable {
  private status: boolean;

  private isPlayerCloseBy: boolean;

  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.image = CanvasUtil.loadNewImage('./assets/floor_ladder.png');
    this.status = false;
    this.isPlayerCloseBy = false;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }

  public getIsPlayerCloseBy(): boolean {
    return this.isPlayerCloseBy;
  }

  /**
   *
   * @param player player to check
   */
  public checkPlayerCloseBy(player: Player): void {
    if (this.posX < player.getPosX() + player.getWidht()
      && this.posX + this.getWidht() > player.getPosX()
      && this.posY < player.getPosY() + player.getHeight()
      && this.posY + this.getHeight() > player.getPosY()) {
      this.isPlayerCloseBy = true;
    } else {
      this.isPlayerCloseBy = false;
    }
  }

  /**
   *
   * @param canvas canvas to render on
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    if (!this.status && this.isPlayerCloseBy) {
      CanvasUtil.writeTextToCanvas(canvas, '[LOCKED]', this.posX + this.getWidht() / 2, this.posY + this.getHeight() * 1.3, 'center', 'ScoreFont', 8, 'white');
    }
  }
}
