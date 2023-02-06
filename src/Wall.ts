import Drawable from './Drawable.js';

export default class Wall extends Drawable {
  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
  }
}
