import Coin from './Coin.js';
import Entrance from './Entrance.js';
import KeyListener from './KeyListener.js';
import Monster from './Monster.js';
import Player from './Player.js';
import Question from './Question.js';
import Scene from './Scene.js';
import SceneEnd from './SceneEnd.js';
import SceneStart from './SceneStart.js';

export default class Level23 extends Scene {
  private keylistener: KeyListener;

  private questionList: Question[] = [];

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY);
    this.movelimit = 0;
    this.keylistener = new KeyListener();
    const database = this.buildQuestionsList();
    this.walls = [];
    this.question = null;
    this.entrance = null;
    this.items = [];
    this.player = player;
    this.player.setPosition(17, 357);
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
    // eslint-disable-next-line prefer-destructuring
    this.buildGame();
    for (let i = 76; i <= 350; i += 32) {
      this.items.push(new Coin(20, i));
      this.items.push(new Coin(115, i));
      this.items.push(new Coin(115, i));
      this.items.push(new Coin(213, i));
      this.items.push(new Coin(324, i));
      this.items.push(new Coin(421, i));
      this.items.push(new Coin(516, i));
    }
  }

  /**
   * Updates the level
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
    // Depending on the difficulty score the game will load in a different level
    if (this.difficulty === 666) return new SceneStart(this.maxX, this.maxY);
    if (this.player.collideWithEntrance(this.entrance)) {
      return new SceneEnd(this.maxX, this.maxY);
    }
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
    this.items.push(new Monster(220, 20, 5000, this.questionList[0]));
    this.items.push(new Monster(200, 355, 4000, this.questionList[1]));
    this.entrance = new Entrance(512, 32);

    this.buildTheTopWall(4.5, -11.5, 545);
    this.buildTheBottomWall(0, 384, 530);
    this.buildTheRightWall(0, 0, 400);
    this.buildTheLeftWall(530, 0, 400);
    this.buildTheBottomWall(48, 48, 92);
    this.buildTheLeftWall(36, 64, 400);
    this.buildTheRightWall(92, 64, 400);
    this.buildTheTopWall(145, 320, 189);
    this.buildTheLeftWall(132, 0, 320);
    this.buildTheRightWall(189, 0, 320);
    this.buildTheBottomWall(241, 50, 303);
    this.buildTheTopWall(241, 320, 303);
    this.buildTheLeftWall(227, 64, 320);
    this.buildTheRightWall(301, 64, 320);
    this.buildTheBottomWall(352, 50, 397);
    this.buildTheLeftWall(338, 64, 400);
    this.buildTheRightWall(397, 64, 400);
    this.buildTheTopWall(450, 320, 494);
    this.buildTheLeftWall(436, 0, 320);
    this.buildTheRightWall(494, 0, 320);
  }

  /**
   * Checks if there is a collision between the player and the items
   *
   * @returns true if there is collision
   */
  // eslint-disable-next-line class-methods-use-this
  public buildQuestionsList() {
    const questionOne = this.locale.trans('You are browsing on a website and come across a pop-up that tells you that you have won a brand new iPhone 14 Pro Max for free, you’ll just need to fill in some personal details. What do you do?');
    const answer1A = this.locale.trans('I don’t click on the pop-up.');
    const answer1B = this.locale.trans('I click on the pop-up and enter all the personal information that is asked.');
    const answer1C = this.locale.trans('I show my parents and friends that I have won an iPhone.');
    const questionTwo = this.locale.trans('A website promises you free movies but doesn’t let you in unless you enter credit card information. What do you do?');
    const answer2A = this.locale.trans('I search for the credit card of my parents to enter, it’s not a problem because the site told me it’s free.');
    const answer2B = this.locale.trans('I ask my parents for permission first.');
    const answer2C = this.locale.trans('I leave the site and don’t fill in anything.');
    return [
      {
        // eslint-disable-next-line max-len
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, optionAScore: 1, optionBScore: 0, optionCScore: 0.5,
      },
      {
        // eslint-disable-next-line max-len
        question: questionTwo, optionA: answer2A, optionB: answer2B, optionC: answer2C, optionAScore: 0, optionBScore: 1, optionCScore: 1,
      },
    ];
  }
}
