import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';

export default class WallSideMidRight extends Drawable {
  public constructor(startX: number, startY: number) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.image = CanvasUtil.loadNewImage('./assets/wall_side_mid_right.png');
  }
}
