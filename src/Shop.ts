import CanvasUtil from './CanvasUtil.js';
import Player from './Player.js';
import ShopItem from './ShopItem.js';

export default class Shop {
  private items: ShopItem[] = [];

  private posSelectbar: number;

  private index: number;

  private status: boolean;

  private animationArray: string[][];

  public constructor() {
    this.index = 0;
    this.animationArray = this.buildArray();
    let startX = 125;
    const startY = 180;
    let cost = 0;
    this.animationArray.forEach((element: string[]) => {
      this.items.push(new ShopItem(startX, startY, cost, element));
      startX += 140;
      cost += 5;
    });
    this.items[this.index].setItemUnlock();
    this.status = false;
    this.posSelectbar = this.items[0].getPosX();
  }

  /**
   * move the selectbar to the left
   */
  public moveLeft(): void {
    if (this.posSelectbar === this.items[1].getPosX()) {
      this.posSelectbar = this.items[0].getPosX();
      this.index = 0;
      this.items[1].setUnselected();
      this.items[0].setSelected();
    } else if (this.posSelectbar === this.items[2].getPosX()) {
      this.index = 1;
      this.posSelectbar = this.items[1].getPosX();
      this.items[1].setSelected();
      this.items[2].setUnselected();
    }
  }

  /**
   * move the selectbar to the right
   */
  public moveRight(): void {
    if (this.posSelectbar === this.items[0].getPosX()) {
      this.posSelectbar = this.items[1].getPosX();
      this.index = 1;
      this.items[1].setSelected();
      this.items[0].setUnselected();
    } else if (this.posSelectbar === this.items[1].getPosX()) {
      this.index = 2;
      this.posSelectbar = this.items[2].getPosX();
      this.items[2].setSelected();
      this.items[1].setUnselected();
    }
  }

  /**
   * @param player player to buy the item
   * buy the item
   */
  public buyItem(player: Player): void {
    if (!this.items[this.index].getStatus()) {
      if (this.items[this.index].getSelected()) {
        if (this.items[this.index].getCost() <= player.getAmount()) {
          player.playerGetAmount(-this.items[this.index].getCost());
          player.setAnimationArray(this.animationArray[this.index]);
          this.items[this.index].setItemUnlock();
        }
      }
    } else {
      player.setAnimationArray(this.animationArray[this.index]);
    }
  }

  /**
   * @param elapsed elapsed time in the gameloop
   */
  public update(elapsed: number): void {
    this.items.forEach((element: ShopItem) => {
      if (element.getSelected()) element.update(elapsed);
      if (this.posSelectbar === element.getPosX()) element.setSelected();
    });
  }

  /**
   * @param canvas canvas to render on
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasUtil.drawRectangle(canvas, 50, 100, 460, 200, 'white');
    CanvasUtil.fillRectangle(canvas, 51, 101, 459, 198, '#9A7B4F');
    CanvasUtil.drawRectangle(canvas, this.posSelectbar - 50, 160, 120, 100, 'white');
    CanvasUtil.writeTextToCanvas(canvas, 'S H O P', 275, 140, 'center', 'ScoreFont', 25, 'white');
    this.items.forEach((element: ShopItem) => {
      element.render(canvas);
    });
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }

  public getStatus(): boolean {
    return this.status;
  }

  // eslint-disable-next-line jsdoc/require-returns
  /**
   */
  // eslint-disable-next-line class-methods-use-this
  public buildArray() {
    return [
      [
        './assets/knight_f_run_anim_f0.png', './assets/knight_f_run_anim_f1.png', './assets/knight_f_run_anim_f2.png', './assets/knight_f_run_anim_f3.png',
      ],
      [
        './assets/lizard_f_run_anim_f0.png', './assets/lizard_f_run_anim_f1.png', './assets/lizard_f_run_anim_f2.png', './assets/lizard_f_run_anim_f3.png',
      ],
      [
        './assets/wizzard_m_run_anim_f0.png', './assets/wizzard_m_run_anim_f1.png', './assets/wizzard_m_run_anim_f2.png', './assets/wizzard_m_run_anim_f3.png',
      ],
    ];
  }
}
