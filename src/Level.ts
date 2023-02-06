import KeyListener from './KeyListener.js';
import Level11 from './Level11.js';
import Level13 from './Level13.js';
import Monster from './Monster.js';
import Question from './Question.js';
import LevelWithNpc from './LevelWithNpc.js';
import Level12 from './Level12.js';
import Level23 from './Level23.js';
import Level22 from './Level22.js';
import Level21 from './Level21.js';
import Entrance from './Entrance.js';
import Scene from './Scene.js';
import Coin from './Coin.js';

export default class Level extends Scene {
  private keylistener: KeyListener;

  private questionList: Question[] = [];

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.keylistener = new KeyListener();
    this.question = null;
    this.entrance = null;
    this.items = [];
    this.entrance = new Entrance(480, 350);
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
    this.question = null;
    // eslint-disable-next-line prefer-destructuring
    this.buildGame();
    this.player.setPosition(15, 28);
  }

  /**
   * Updates the level
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
    // eslint-disable-next-line max-len
    if (this.player.collideWithEntrance(this.entrance)) {
      return new LevelWithNpc(this.maxX, this.maxY, this.player);
    }
    if (this.difficulty === 1) return new Level11(this.maxX, this.maxY, this.player);
    if (this.difficulty === 2) return new Level12(this.maxX, this.maxY, this.player);
    if (this.difficulty === 3) return new Level13(this.maxX, this.maxY, this.player);
    // if (this.entrance.getIsPlayerCloseBy() && this.entrance.getStatus()) {
    // Depending on the difficulty score the game will load in a different level
    // }
    if (this.difficulty === 4) return new Level21(this.maxX, this.maxY, this.player);
    if (this.difficulty === 5) return new Level22(this.maxX, this.maxY, this.player);
    if (this.difficulty === 6) return new Level23(this.maxX, this.maxY, this.player);
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
    this.items.push(new Monster(290, 200, 6000, this.questionList[0]));
    this.items.push(new Monster(440, 60, 4000, this.questionList[1]));
    this.items.push(new Monster(124, 324, 3000, this.questionList[2]));
    for (let i = 70; i <= 220; i += 50) {
      this.items.push(new Coin(30, i));
    }

    for (let i = 70; i <= 180; i += 40) {
      this.items.push(new Coin(220, i));
    }

    for (let i = 210; i <= 360; i += 50) {
      this.items.push(new Coin(i, 270));
    }

    this.buildTheTopWall(4.5, -11.5, 545);
    this.buildTheBottomWall(5, 284, 110);
    this.buildTheRightWall(112, 297, 378);
    this.buildTheBottomWall(63, 50, 190);
    this.buildTheTopWall(64, 207, 268);
    this.buildTheLeftWall(52, 62, 206);
    this.buildTheRightWall(190, 63, 174);
    this.buildTheBottomWall(192, 160, 256);
    this.buildTheRightWall(268, 173, 220);
    this.buildTheLeftWall(243, 5, 115);
    this.buildTheRightWall(427, 5, 115);
    this.buildTheTopWall(255, 100, 420);
    this.buildTheBottomWall(194, 302, 400);
    this.buildTheLeftWall(180, 316, 385);
    this.buildTheRightWall(398, 316, 385);
    this.buildTheBottomWall(445, 160, 462);
    this.buildTheLeftWall(465, 128, 183);
    this.buildTheLeftWall(433, 175, 248);
    this.buildTheBottomWall(480, 116, 539);
    this.buildTheTopWall(445, 224, 462);
    this.buildTheLeftWall(466, 238, 316);
    this.buildTheTopWall(478, 289, 539);
    this.buildTheLeftWall(530, -11.5, 305);
    this.buildTheRightWall(0, -5, 380);
    // this.buildTheLeftWall(-10.5, -11, 375);
    this.buildTheBottomWall(4.5, 375, 533);
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
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, optionAScore: 0, optionBScore: 0.5, optionCScore: 1,
      },
      {
        // eslint-disable-next-line max-len
        question: questionTwo, optionA: answer2A, optionB: answer2B, optionC: answer2C, optionAScore: 0, optionBScore: 0.5, optionCScore: 1,
      },
      {
        // eslint-disable-next-line max-len
        question: questionThree, optionA: answer3A, optionB: answer3B, optionC: answer3C, optionAScore: 1, optionBScore: 0, optionCScore: 0.5,
      },
    ];
  }
}
