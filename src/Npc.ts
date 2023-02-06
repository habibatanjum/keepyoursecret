import CanvasUtil from './CanvasUtil.js';
import Player from './Player.js';
import Question from './Question.js';
import ScoreItem from './ScoreItem.js';

export default class Npc extends ScoreItem {
  private animationArray: string[];

  private isPlayerCloseBy: boolean;

  private walkarea: number;

  private speed: number;

  private index: number;

  private timeToNextMove: number;

  private questionA: Question;

  private questionB: Question;

  private showQuestion: boolean;

  private isQuestionAnswered: boolean;

  public constructor(startX: number, startY: number, qusetionA:Question, qusetionB:Question) {
    super();
    this.posX = startX;
    this.posY = startY;
    this.isPlayerCloseBy = false;
    this.index = 0;
    this.speed = 0.3;
    this.walkarea = 5000;
    this.timeToNextMove = 200;
    this.questionA = qusetionA;
    this.questionB = qusetionB;
    this.showQuestion = false;
    this.isQuestionAnswered = false;
    this.animationArray = ['./assets/necromancer_idle_anim_f0.png', './assets/necromancer_idle_anim_f1.png', './assets/necromancer_idle_anim_f2.png', './assets/necromancer_idle_anim_f3.png'];
    this.image = CanvasUtil.loadNewImage(this.animationArray[this.index]);
  }

  public getQuestionA(): Question {
    return this.questionA;
  }

  public getQuestionB(): Question {
    return this.questionB;
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
      this.walkarea = 5000;
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

  public getShowQuestion(): boolean {
    return this.showQuestion;
  }

  public setShowQuestion(showQuestion: boolean): void {
    this.showQuestion = showQuestion;
  }

  public getIsQuestionAnswered(): boolean {
    return this.isQuestionAnswered;
  }

  public setIsQuestionAnswered(): void {
    this.isQuestionAnswered = true;
  }

  /**
   *
   * @param canvas canvas to draw on
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    if (this.isPlayerCloseBy && !this.isQuestionAnswered) {
      CanvasUtil.writeTextToCanvas(canvas, '[Talk to ME]', this.posX + this.getWidht() / 2, this.posY + this.getHeight() * 1.3, 'center', 'ScoreFont', 10, 'white');
    }
  }
}
