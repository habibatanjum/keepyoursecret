import CanvasUtil from './CanvasUtil.js';
import Drawable from './Drawable.js';

export default class Question extends Drawable {
  private question: string;

  private optionA: string;

  private optionB: string;

  private optionC: string;

  private opstionAScore: number;

  private opstionBScore: number;

  private optionCScore: number;

  private posOptionA: number;

  private posOptionB: number;

  private posOptionC: number;

  private posSelectBar: number;

  private socre: number;

  // eslint-disable-next-line max-len
  public constructor(question: string, optionA: string, optionB: string, optionC: string, optionAScore: number, optionBScore: number, optionCScore: number) {
    super();
    this.question = question;
    this.optionA = optionA;
    this.optionB = optionB;
    this.optionC = optionC;
    this.posOptionA = 180;
    this.posOptionB = 200;
    this.posOptionC = 220;
    this.socre = optionAScore;
    this.opstionAScore = optionAScore;
    this.opstionBScore = optionBScore;
    this.optionCScore = optionCScore;
    this.posSelectBar = this.posOptionA;
  }

  public getQuestion(): string {
    return this.question;
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public moveUp(): void {
    if (this.posSelectBar === this.posOptionB) {
      this.posSelectBar = this.posOptionA;
      this.socre = this.opstionAScore;
    } else if (this.posSelectBar === this.posOptionC) {
      this.posSelectBar = this.posOptionB;
      this.socre = this.opstionBScore;
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public moveDown(): void {
    if (this.posSelectBar === this.posOptionA) {
      this.posSelectBar = this.posOptionB;
      this.socre = this.opstionBScore;
    } else if (this.posSelectBar === this.posOptionB) {
      this.posSelectBar = this.posOptionC;
      this.socre = this.optionCScore;
    }
  }

  public getScore(): number {
    return this.socre;
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * Process all input. Called from the GameLoop.
   *
   * @returns boolean
   */
  public checkAnswer(): boolean {
    let answerScore = 0;
    if (this.posSelectBar === 180) {
      answerScore = this.opstionAScore;
    } else if (this.posSelectBar === 200) {
      answerScore = this.opstionBScore;
    } else if (this.posSelectBar === 220) {
      answerScore = this.optionCScore;
    }
    if (answerScore === 0) {
      return true;
    } return false;
  }

  /**
   * Process all input. Called from the GameLoop.
   *
   * @param canvas the canvas to draw on
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasUtil.drawRectangle(canvas, 50, 100, 460, 200, 'black');
    CanvasUtil.fillRectangle(canvas, 50, 100, 460, 200, '#363530');
    if (this.question.length < 80) {
      CanvasUtil.writeTextToCanvas(canvas, this.question, 70, 120, 'left', 'ScoreFont', 12, 'white');
    } else {
      const mltiple = Math.floor(this.question.length / 80);
      for (let i = 0; i <= mltiple; i += 1) {
        let str = '';
        if (i === mltiple) {
          str = this.question.substring(i * 80, this.question.length);
        }
        str = this.question.substring(i * 80, ((i + 1) * 80));
        CanvasUtil.writeTextToCanvas(canvas, str, 70, 120 + i * 20, 'left', 'ScoreFont', 12, 'white');
      }
    }
    CanvasUtil.writeTextToCanvas(canvas, this.optionA, 70, this.posOptionA, 'left', 'ScoreFont', 10, 'white');
    CanvasUtil.writeTextToCanvas(canvas, this.optionB, 70, this.posOptionB, 'left', 'ScoreFont', 10, 'white');
    CanvasUtil.writeTextToCanvas(canvas, this.optionC, 70, this.posOptionC, 'left', 'ScoreFont', 10, 'white');
    CanvasUtil.drawRectangle(canvas, 62, this.posSelectBar - 15, 430, 25, 'white');
    CanvasUtil.writeTextToCanvas(canvas, '[F]', 470, this.posSelectBar, 'left', 'ScoreFont', 12, 'white');
  }
}
