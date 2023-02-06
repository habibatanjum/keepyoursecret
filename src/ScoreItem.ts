import Drawable from './Drawable.js';

export default abstract class ScoreItem extends Drawable {
  protected score: number;

  public abstract update(elapsed: number): void;

  public getScore(): number {
    return this.score;
  }
}
