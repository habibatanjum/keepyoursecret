import Coin from './Coin.js';
import Entrance from './Entrance.js';
import KeyListener from './KeyListener.js';
import Monster from './Monster.js';
import Player from './Player.js';
import Question from './Question.js';
import Scene from './Scene.js';
import SceneEnd from './SceneEnd.js';
import SceneStart from './SceneStart.js';

export default class Level22 extends Scene {
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
    this.player.setPosition(300, 357);
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
    this.question = null;
    this.buildGame();
    for (let i = 156; i <= 390; i += 32) {
      this.items.push(new Coin(i, 35));
      this.items.push(new Coin(i, 132));
      this.items.push(new Coin(i, 276));
      this.items.push(new Coin(i, 371));
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
    this.entrance = new Entrance(512, 32);
    this.items.push(new Monster(290, 260, 6000, this.questionList[0]));

    this.buildTheTopWall(4.5, -11.5, 545);
    this.buildTheBottomWall(0, 384, 530);
    this.buildTheRightWall(0, 0, 400);
    this.buildTheLeftWall(530, 0, 400);
    this.buildTheBottomWall(48, 48, 530);
    this.buildTheTopWall(48, 80, 530);
    this.buildTheBottomWall(4.5, 288, 481);
    this.buildTheTopWall(4.5, 320, 481);
    this.buildTheLeftWall(36, 64, 80);
    this.buildTheRightWall(480, 302, 318);
    this.buildTheBottomWall(143, 144, 385);
    this.buildTheTopWall(143, 224, 385);
    this.buildTheBottomWall(4.5, 144, 64);
    this.buildTheTopWall(4.5, 224, 64);
    this.buildTheBottomWall(463, 144, 527);
    this.buildTheTopWall(463, 224, 527);
    this.buildTheLeftWall(132, 160, 224);
    this.buildTheRightWall(63, 160, 224);
    this.buildTheLeftWall(451, 160, 224);
    this.buildTheRightWall(395, 160, 224);
  }

  /**
   * Checks if there is a collision between the player and the items
   *
   * @returns true if there is collision
   */
  // eslint-disable-next-line class-methods-use-this
  public buildQuestionsList() {
    const questionOne = this.locale.trans("You receive a text message from an unknown number, telling you to 'click this link right now!'. What do you do?");
    const answer1A = this.locale.trans('I text the person back and ask why I should click the link.');
    const answer1B = this.locale.trans('I ignore the message');
    const answer1C = this.locale.trans('I click the link to see what happens.');
    return [
      {
        // eslint-disable-next-line max-len
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, optionAScore: 0.5, optionBScore: 1, optionCScore: 0,
      },
    ];
  }
}
