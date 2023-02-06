import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';

export default class Wallmid extends Drawable {
  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;

    this.image = CanvasUtil.loadNewImage('./assets/wall_mid.png');
  }
}
