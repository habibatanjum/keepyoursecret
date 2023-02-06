import CanvasUtil from './CanvasUtil.js';
import Obstacle from './Obstacle.js';

export default class WallSideFrontLeft extends Obstacle {
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/wall_side_front_left.png');
  }
}
