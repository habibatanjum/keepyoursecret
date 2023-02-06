import KeyListener from './KeyListener.js';
import Monster from './Monster.js';
import Scene from './Scene.js';
import SceneStart from './SceneStart.js';
import Player from './Player.js';
import LevelWithNpc from './LevelWithNpc.js';
import Coin from './Coin.js';
import Question from './Question.js';
import Entrance from './Entrance.js';

export default class Level12 extends Scene {
  private keylistener: KeyListener;

  private questionList: Question[] = [];

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY);
    this.question = null;
    this.entrance = null;
    this.items = [];
    const database = this.buildQuestionsList();
    database.forEach((element) => {
      this.questionList.push(new Question(
        element.question,
        element.optionA,
        element.optionB,
        element.optionC,
        element.optionAScore,
        element.optionBScore,
        element.optionCScore,
      ));
    });
    this.items.push(new Monster(120, 140, 9000, this.questionList[0]));

    /**
     * Constructor will load in coins
     */
    for (let i = 60; i <= 496; i += 32) {
      this.items.push(new Coin(i, 260));
    }
    for (let i = 60; i <= 240; i += 32) {
      this.items.push(new Coin(i, 148));
    }
    for (let i = 320; i <= 500; i += 32) {
      this.items.push(new Coin(i, 148));
    }
    for (let i = 92; i <= 464; i += 32) {
      this.items.push(new Coin(i, 36));
    }

    /**
     * Constructor will load in final items
     */
    this.entrance = new Entrance(264, 96);
    this.player = player;
    this.difficulty = 0;
    this.walls = [];
    this.keylistener = new KeyListener();
    this.buildGame();
    this.player.setLevel2Unlocked();
  }

  /**
   * Process all inputs.
   *
   */
  public override processInput(): void {
    super.processInput(this.keylistener);
    // Cheat keys to load the next level or return to startscreen.
    if (this.keylistener.keyPressed(KeyListener.KEY_ESC)) this.difficulty = 666;
  }

  /**
   * Updates the level
   *
   * @param elapsed elapsed time
   * @returns true if level should continue
   */
  // eslint-disable-next-line class-methods-use-this
  public override update(elapsed: number): Scene {
    super.update(elapsed);
    if (this.player.collideWithEntrance(this.entrance)) {
      return new LevelWithNpc(this.maxX, this.maxY, this.player);
    }

    // Depending on the difficulty score the game will load in a different level
    if (this.difficulty === 666) return new SceneStart(this.maxX, this.maxY);
    return null;
  }

  /**
   * Renders the level
   *
   * @param canvas calls the canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
  }

  /**
   * Builds the wall of map
   */
  public buildGame(): void {
    this.buildTheTopWall(0, -11.5, 530);
    this.buildTheBottomWall(0, 384, 530);
    this.buildTheRightWall(0, 0, 400);
    this.buildTheLeftWall(530, 0, 400);
    this.buildTheBottomWall(48, 272, 224);
    this.buildTheBottomWall(304, 272, 480);
    this.buildTheBottomWall(80, 160, 456);
    this.buildTheBottomWall(304, 48, 480);
    this.buildTheBottomWall(48, 48, 224);
    this.buildTheTopWall(48, 96, 224);
    this.buildTheTopWall(304, 96, 480);
    this.buildTheTopWall(80, 208, 448);
    this.buildTheTopWall(48, 320, 224);
    this.buildTheTopWall(304, 320, 480);
    this.buildTheLeftWall(35, 61, 96);
    this.buildTheLeftWall(292, 61, 96);
    this.buildTheLeftWall(69, 174, 208);
    this.buildTheLeftWall(35, 286, 320);
    this.buildTheLeftWall(291, 286, 320);
    this.buildTheRightWall(236, 284, 320);
    this.buildTheRightWall(492, 284, 320);
    this.buildTheRightWall(236, 61, 96);
    this.buildTheRightWall(492, 61, 96);
    this.buildTheRightWall(460, 172, 208);
  }

  // eslint-disable-next-line jsdoc/require-returns
  /**
   * Builds the questions list  for the quiz
   */
  public buildQuestionsList() {
    const questionOne = this.locale.trans('One of your friends suddenly sends you a message (with link) in a different language. What do you do?');
    const answer1A = this.locale.trans('I ask my friend why he sent this message, he does not reply fast so I open the message.');
    const answer1B = this.locale.trans('I ignore the message');
    const answer1C = this.locale.trans('I click on the link to see what he sent me.');
    return [
      {
        // eslint-disable-next-line max-len
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, optionAScore: 0, optionBScore: 1, optionCScore: 0,
      },
    ];
  }
}
