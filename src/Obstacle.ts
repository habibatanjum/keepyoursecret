import Drawable from './Drawable.js';

export default abstract class Obstacle extends Drawable {
  protected score: number;

  protected position: number;

  protected damagevalue: number;

  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.position = 0;
  }

  public getDamageValue(): number {
    return this.damagevalue;
  }
}
