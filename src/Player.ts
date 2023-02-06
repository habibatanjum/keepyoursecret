import CanvasUtil from './CanvasUtil.js';
import Coin from './Coin.js';
import Drawable from './Drawable.js';
import Entrance from './Entrance.js';
import ScoreItem from './ScoreItem.js';
import Wallmid from './Wallmid.js';
import WallSideMidLeft from './WallSideMidLeft.js';
import WallSideMidRight from './WallSideMidRight.js';

export default class Player extends Drawable {
  private index: number;

  private animationArray: string[];

  private timeBetweenMoves: number;

  private score: number;

  private amount: number;

  private isLevel2Unlocked: boolean;

  private coins: Coin[] = [];

  private timeToShowCoins: number;

  public constructor() {
    super();
    this.index = 0;
    this.timeBetweenMoves = 1000;
    this.animationArray = ['./assets/knight_f_run_anim_f0.png', './assets/knight_f_run_anim_f1.png', './assets/knight_f_run_anim_f2.png', './assets/knight_f_run_anim_f3.png'];
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
    this.isLevel2Unlocked = false;
    this.score = 0;
    this.amount = 0;
    this.timeToShowCoins = 1000;
  }

  /**
   * @param elapsed time since last update
   */
  public update(elapsed: number): void {
    if (this.coins.length > 0) {
      this.timeToShowCoins -= elapsed;
      this.coins.forEach((coin: Coin) => coin.update(elapsed));
      if (this.timeToShowCoins < 0) {
        this.coins = [];
      }
    }
  }

  /**
   *
   */
  public losCoins(): void {
    this.amount -= 8;
    if (this.amount < 0) this.amount = 0;
    this.coins.push(new Coin(this.posX - 10, this.posY + this.getHeight() / 2));
    this.coins.push(new Coin(this.posX + this.getWidht(), this.posY + this.getHeight() / 2));
    this.coins.push(new Coin(this.posX + this.getWidht() / 2 - 5, this.posY - 7));
    // eslint-disable-next-line max-len
    this.coins.push(new Coin(this.posX + this.getWidht() / 2 - 5, this.posY + this.getHeight() + 5));
    this.coins.push(new Coin(this.posX - 10, this.posY - 7));
    this.coins.push(new Coin(this.posX - 10, this.posY + this.getHeight() + 5));
    this.coins.push(new Coin(this.posX + this.getWidht(), this.posY - 7));
    this.coins.push(new Coin(this.posX + this.getWidht(), this.posY + this.getHeight() + 5));
  }

  public setLevel2Unlocked(): void {
    this.isLevel2Unlocked = true;
  }

  public getStatusLevel2(): boolean {
    return this.isLevel2Unlocked;
  }

  public setPosition(x: number, y: number): void {
    this.posX = x;
    this.posY = y;
  }

  public getScore(): number {
    return this.score;
  }

  /**
   * Checks collision with object of the entrance class
   *
   * @param score calls score
   */
  public playerGetScore(score: number): void {
    this.score += score;
  }

  public setAnimationArray(animationArray: string[]): void {
    this.animationArray = animationArray;
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
  }

  public getAmount(): number {
    return this.amount;
  }

  /**
   * Checks collision with object of the entrance class
   *
   * @param amount calls amount
   */
  public playerGetAmount(amount: number): void {
    this.amount += amount;
  }

  /**
   * Moves the player in any direction
   *
   * @param directionX direction on X-axis
   * @param directionY direction on Y-axis
   */
  public move(directionX: number, directionY: number): void {
    this.timeBetweenMoves -= 100;
    if (this.timeBetweenMoves <= 0) {
      if (this.index === (this.animationArray.length - 1)) {
        this.index = 0;
      } else {
        this.index += 1;
      }
      this.timeBetweenMoves = 1000;
    }
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
    this.posX += directionX;
    this.posY += directionY;
    // console.log(`Player moved to ${this.posX}, ${this.posY}`);
  }

  /**
   * Checks collision with object of the entrance class
   *
   * @param canvas calls canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);

    this.coins.forEach((coin) => {
      coin.render(canvas);
    });
  }

  /**
   * Checks collision between player and item
   *
   * @param item checks the item put in the parameter
   * @returns true if there is collision
   */
  // eslint-disable-next-line class-methods-use-this
  public collideWithItem(item: ScoreItem): boolean {
    return this.posX < item.getPosX() + item.getWidht()
      && this.posX + this.getWidht() > item.getPosX()
      && this.posY < item.getPosY() + item.getHeight()
      && this.posY + this.getHeight() > item.getPosY();
  }

  /**
   * Checks collision with the top wall
   *
   * @param object calls object thats in walltop array
   * @returns true if there is collision
   */
  public collideWithWallTop(object: Wallmid): boolean {
    return object.getPosX() < this.posX + this.image.width
      && (object.getPosX() + 14) > this.posX
      && object.getPosY() < this.posY + this.image.height
      && (object.getPosY() + 14) > this.posY;
  }

  /**
   * Checks collision with the left wall
   *
   * @param object calls object thats in wallleft array
   * @returns true if there is collision
   */
  public collideWithWallLeft(object: WallSideMidLeft): boolean {
    return (object.getPosX() + 12) < this.posX + this.image.width
      && (object.getPosX() + 12) > this.posX
      && object.getPosY() < this.posY + this.image.height
      && (object.getPosY() + 14) > this.posY;
  }

  /**
   * Checks collision with the right wall
   *
   * @param object calls object thats in wallright array
   * @returns true if there is collision
   */
  public collideWithWallRight(object: WallSideMidRight): boolean {
    return object.getPosX() < this.posX + this.image.width
      && (object.getPosX() + 4) > this.posX
      && object.getPosY() < this.posY + this.image.height
      && (object.getPosY() + 14) > this.posY;
  }

  /**
   * checks collision with entrance
   *
   * @param entrance calls entrance
   * @returns true if there is collision
   */
  public collideWithEntrance(entrance: Entrance): boolean {
    return entrance.getPosX() < this.posX + this.image.width
      && entrance.getPosX() + entrance.getWidht() > this.posX
      && entrance.getPosY() < this.posY + this.image.height
      && entrance.getPosY() + entrance.getHeight() > this.posY;
  }
}
