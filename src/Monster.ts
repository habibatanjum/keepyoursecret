import ScoreItem from './ScoreItem.js';
import CanvasUtil from './CanvasUtil.js';
import Player from './Player.js';
import Question from './Question.js';

export default class Monster extends ScoreItem {
  private isPlayerCloseBy: boolean;

  private timeToNextMove: number;

  private index: number;

  private animationArray: string[];

  private walkarea: number;

  private speed: number;

  private walk: number;

  private question: Question;

  private showQuestion: boolean;

  private isQuestionAnswered: boolean;

  public constructor(startX: number, startY: number, walkarea: number, question: Question) {
    super();
    this.animationArray = ['./assets/chort_idle_anim_f0.png', './assets/chort_idle_anim_f1.png', './assets/chort_idle_anim_f2.png', './assets/chort_idle_anim_f3.png', './assets/chort_run_anim_f0.png', './assets/chort_idle_anim_f1.png', './assets/chort_idle_anim_f2.png', './assets/chort_idle_anim_f3.png'];
    this.posX = startX;
    this.posY = startY;
    this.index = 0;
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
    this.speed = 0.3;
    this.walkarea = walkarea;
    this.question = question;
    this.showQuestion = false;
    this.isQuestionAnswered = false;
    this.isPlayerCloseBy = false;
    this.walk = walkarea;
    this.timeToNextMove = 200;
  }

  public getQuestion(): Question {
    return this.question;
  }

  public getShowQuestion(): boolean {
    return this.showQuestion;
  }

  public setShowQuestion(): void {
    this.showQuestion = true;
  }

  public getIsQuestionAnswered(): boolean {
    this.showQuestion = false;
    return this.isQuestionAnswered;
  }

  public setIsQuestionAnswered(): void {
    this.isQuestionAnswered = true;
  }

  /**
   * Updates monster
   *
   * @param elapsed elapsed time in the gameloop
   */
  public update(elapsed: number) {
    this.timeToNextMove -= elapsed;
    this.walkarea -= elapsed;
    if (this.walkarea <= 0) {
      this.speed *= -1;
      this.walkarea = this.walk;
    }
    if (this.timeToNextMove <= 0 && !this.isPlayerCloseBy) {
      this.posX += elapsed * this.speed;
      this.index += 1;
      this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
      this.timeToNextMove = 200;
      if (this.index === (this.animationArray.length - 1)) {
        this.index = 0;
      }
    }
  }

  /**
   *
   * @param player player to check
   */
  public checkPlayerCloseBy(player: Player): void {
    this.isPlayerCloseBy = false;
    if (this.posX - 20 < player.getPosX() + player.getWidht()
      && this.posX + this.getWidht() + 20 > player.getPosX()
      && this.posY - 20 < player.getPosY() + player.getHeight()
      && this.posY + this.getHeight() + 20 > player.getPosY()) {
      this.isPlayerCloseBy = true;
    }
  }

  /**
   *
   * @returns true if player is close by
   */
  public getIsPlayerCloseBy(): boolean {
    return this.isPlayerCloseBy;
  }

  /**
   *
   * @param canvas canvas to draw on
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    if (this.isPlayerCloseBy) {
      CanvasUtil.writeTextToCanvas(canvas, '[F]', this.posX + this.getWidht() / 2, this.posY + this.getHeight() * 1.3, 'center', 'ScoreFont', 10, 'white');
    }
  }
}
