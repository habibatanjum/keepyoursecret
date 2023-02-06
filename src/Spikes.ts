import CanvasUtil from './CanvasUtil.js';
import Obstacle from './Obstacle.js';

export default class Spikes extends Obstacle {
  public constructor(startX: number, startY: number) {
    super(startX, startY);
    this.image = CanvasUtil.loadNewImage('./assets/floor_spikes_anim_f3.png');
  }
}
