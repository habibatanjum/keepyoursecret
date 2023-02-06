import Coin from './Coin.js';
import Entrance from './Entrance.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Scene from './Scene.js';
import SceneEnd from './SceneEnd.js';
import SceneStart from './SceneStart.js';

export default class Level21 extends Scene {
  private keylistener: KeyListener;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY);
    this.difficulty = 0;
    this.movelimit = 0;
    this.keylistener = new KeyListener();
    this.walls = [];
    this.question = null;
    this.entrance = null;
    this.items = [];
    this.player = player;
    this.player.setPosition(391, 30);

    this.buildGame();
    for (let i = 32; i <= 200; i += 96) {
      this.items.push(new Coin(28, i));
      this.items.push(new Coin(300, i));
      this.items.push(new Coin(508, i));
    }
    for (let i = 28; i <= 530; i += 96) {
      this.items.push(new Coin(i, 195));
      if (i <= 450) {
        this.items.push(new Coin(i, 372));
      }
    }
    this.items.push(new Coin(158, 280));
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
    this.entrance = new Entrance(512, 368);

    this.buildTheTopWall(4.5, -11.5, 545);
    this.buildTheBottomWall(0, 384, 530);
    this.buildTheRightWall(0, 0, 400);
    this.buildTheLeftWall(530, 0, 400);
    this.buildTheTopWall(64, 143, 268);
    this.buildTheLeftWall(52, 0, 158);
    this.buildTheRightWall(268, 0, 158);
    this.buildTheBottomWall(3, 210, 128);
    this.buildTheTopWall(3, 323, 128);
    this.buildTheRightWall(128, 226, 326);
    this.buildTheTopWall(190, 323, 530);
    this.buildTheBottomWall(190, 210, 530);
    this.buildTheLeftWall(178, 226, 326);
    this.buildTheTopWall(337, 143, 479);
    this.buildTheBottomWall(337, 64, 479);
    this.buildTheLeftWall(325, 80, 159);
    this.buildTheRightWall(477, 80, 159);
  }

  /**
   * Checks if there is a collision between the player and the items
   *
   * @returns true if there is collision
   */
  // eslint-disable-next-line class-methods-use-this
  public buildQuestionsList() {
    const questionOne = this.locale.trans("Somebody that you don't know requests to follow you on Instagram, what do you do?");
    const answer1A = this.locale.trans('I accept the request.');
    const answer1B = this.locale.trans('I ask my friends if they know this person.');
    const answer1C = this.locale.trans('I decline the request.');
    const questionTwo = this.locale.trans("Somebody that you don't know wants to send you a message on Instagram, what do you do?");
    const answer2A = this.locale.trans('I message them back.');
    const answer2B = this.locale.trans('I ask my parents for help.');
    const answer2C = this.locale.trans('I ignore the message.');
    const questionThree = this.locale.trans("A random person calls you, you don't recognize the number and you don't have it saved in your phone. What do you do?");
    const answer3A = this.locale.trans("I don't answer.");
    const answer3B = this.locale.trans('I answer and ask who it is.');
    const answer3C = this.locale.trans('I block the number.');
    return [
      {
        // eslint-disable-next-line max-len
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, badAnswer: 1,
      },
      {
        // eslint-disable-next-line max-len
        question: questionTwo, optionA: answer2A, optionB: answer2B, optionC: answer2C, badAnswer: 1,
      },
      {
        // eslint-disable-next-line max-len
        question: questionThree, optionA: answer3A, optionB: answer3B, optionC: answer3C, badAnswer: 2,
      },
    ];
  }
}
