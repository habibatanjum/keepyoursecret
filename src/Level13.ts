import KeyListener from './KeyListener.js';
import Monster from './Monster.js';
import Scene from './Scene.js';
import SceneStart from './SceneStart.js';
import Entrance from './Entrance.js';
import Coin from './Coin.js';
import LevelWithNpc from './LevelWithNpc.js';
import Question from './Question.js';
import Player from './Player.js';

export default class Level13 extends Scene {
  private keylistener: KeyListener;

  private questionList: Question[] = [];

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY);
    const database = this.buildQuestionsList();
    this.question = null;
    this.entrance = null;
    this.items = [];
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
    this.items.push(new Monster(330, 30, 4000, this.questionList[0]));
    this.items.push(new Monster(30, 240, 4000, this.questionList[1]));
    /**
     * Constructor will load in coins
     */
    for (let i = 36; i <= 400; i += 32) {
      this.items.push(new Coin(20, i));
      this.items.push(new Coin(516, i));
    }

    for (let i = 60; i <= 496; i += 32) {
      if (i <= 180 || i > 380) {
        this.items.push(new Coin(i, 36));
      }
      this.items.push(new Coin(i, 260));
      this.items.push(new Coin(i, 356));
    }

    /**
     * Constructor will load in final items
     */
    this.player = player;
    this.walls = [];
    this.entrance = new Entrance(352, 144);
    this.difficulty = 0;
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
    if (this.keylistener.keyPressed(KeyListener.KEY_B)) this.difficulty = 1;
    if (this.keylistener.keyPressed(KeyListener.KEY_N)) this.difficulty = 2;
    if (this.keylistener.keyPressed(KeyListener.KEY_M)) this.difficulty = 3;
    if (this.keylistener.keyPressed(KeyListener.KEY_H)) this.difficulty = 4;
    if (this.keylistener.keyPressed(KeyListener.KEY_J)) this.difficulty = 5;
    if (this.keylistener.keyPressed(KeyListener.KEY_K)) this.difficulty = 6;
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
    this.buildTheLeftWall(224, 0, 160);
    this.buildTheRightWall(320, 0, 160);
    this.buildTheBottomWall(48, 48, 144);
    this.buildTheBottomWall(400, 48, 480);
    this.buildTheBottomWall(160, 160, 224);
    this.buildTheBottomWall(320, 160, 384);
    this.buildTheTopWall(48, 208, 480);
    this.buildTheBottomWall(48, 272, 224);
    this.buildTheBottomWall(320, 272, 480);
    this.buildTheTopWall(48, 308, 224);
    this.buildTheTopWall(320, 308, 480);
    this.buildTheLeftWall(36, 64, 208);
    this.buildTheLeftWall(36, 288, 308);
    this.buildTheRightWall(492, 64, 208);
    this.buildTheRightWall(492, 288, 308);
    this.buildTheRightWall(156, 64, 160);
    this.buildTheLeftWall(388, 64, 160);
    this.buildTheRightWall(236, 288, 308);
    this.buildTheLeftWall(308, 288, 308);
  }

  /**
   * Checks if there is a collision between the player and the items
   *
   * @returns true if there is collision
   */
  // eslint-disable-next-line class-methods-use-this
  public buildQuestionsList() {
    const questionOne = this.locale.trans('How do you lock your mobile phone?');
    const answer1A = this.locale.trans('With a pin code and my fingerprint/face-id');
    const answer1B = this.locale.trans('With only my fingerprint/face-id');
    const answer1C = this.locale.trans('With only a password or pin code');
    const questionTwo = this.locale.trans('When using Instagram or TikTok, how do you manage your account?');
    const answer2A = this.locale.trans('I keep my account public so everyone can see my pictures and videos');
    const answer2B = this.locale.trans('keep my account private and only let friends and family see my pictures');
    const answer2C = this.locale.trans('I only accept people that are followed by people I know');
    return [
      {
        // eslint-disable-next-line max-len
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, optionAScore: 1, optionBScore: 0, optionCScore: 0.5,
      },
      {
        // eslint-disable-next-line max-len
        question: questionTwo, optionA: answer2A, optionB: answer2B, optionC: answer2C, optionAScore: 0, optionBScore: 1, optionCScore: 0.5,
      },
    ];
  }
}
