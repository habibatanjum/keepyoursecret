import CanvasUtil from './CanvasUtil.js';
import Entrance from './Entrance.js';
import KeyListener from './KeyListener.js';
import Level11 from './Level11.js';
import Level12 from './Level12.js';
import Level13 from './Level13.js';
import Level21 from './Level21.js';
import Level22 from './Level22.js';
import Level23 from './Level23.js';
import Npc from './Npc.js';
import Player from './Player.js';
import Question from './Question.js';
import Scene from './Scene.js';

export default class LevelWithNpc extends Scene {
  private keylistener: KeyListener;

  private questionList: Question[] = [];

  private npc: Npc;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY);
    this.difficulty = 0;
    this.keylistener = new KeyListener();
    this.walls = [];
    this.question = null;
    this.entrance = null;
    this.items = [];
    this.entrance = new Entrance(459, 322);
    this.player = player;
    this.player.setPosition(15, 28);
    this.entrance.setStatus(false);
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
    this.npc = new Npc(maxX / 2 - 100, maxY / 2 + 100, this.questionList[0], this.questionList[1]);
    this.question = null;
    this.buildTheGame();
  }

  /**
   *
   */
  public override processInput(): void {
    super.processInput(this.keylistener);
    this.questionSelected();
    // Cheat keys to load the next level or return to startscreen.
    if (this.keylistener.keyPressed(KeyListener.KEY_B)) this.difficulty = 1;
    if (this.keylistener.keyPressed(KeyListener.KEY_N)) this.difficulty = 2;
    if (this.keylistener.keyPressed(KeyListener.KEY_M)) this.difficulty = 3;
    if (this.keylistener.keyPressed(KeyListener.KEY_ESC)) this.difficulty = 666;
  }

  /**
   *
   * @param elapsed number
   * @returns next scene
   */
  public override update(elapsed: number): Scene {
    super.update(elapsed);
    this.npc.update(elapsed);
    this.npc.checkPlayerCloseBy(this.player);
    if (this.entrance.getStatus() && this.player.collideWithEntrance(this.entrance)) {
      if (this.player.getStatusLevel2()) {
        if (this.difficulty === 4) return new Level21(this.maxX, this.maxY, this.player);
        if (this.difficulty === 5) return new Level22(this.maxX, this.maxY, this.player);
        if (this.difficulty === 6) return new Level23(this.maxX, this.maxY, this.player);
      } else {
        if (this.difficulty === 1) return new Level11(this.maxX, this.maxY, this.player);
        if (this.difficulty === 2) return new Level12(this.maxX, this.maxY, this.player);
        if (this.difficulty === 3) return new Level13(this.maxX, this.maxY, this.player);
      }
    }
    return null;
  }

  /**
   * @param canvas HTMLCanvasElement
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    this.npc.render(canvas);
    const str = this.locale.trans('Talk to npc to unlock next level');
    CanvasUtil.writeTextToCanvas(canvas, str, 300, 38, 'left', 'ScoreFont', 13, 'white');
  }

  /**
   * build the wall
   */
  private buildTheGame() {
    this.buildTheTopWall(4.5, -11.5, 545);
    this.buildTheLeftWall(104, 5, 183);
    this.buildTheTopWall(116, 165, 386);
    this.buildTheLeftWall(374, 178, 250);
    this.buildTheTopWall(386, 235, 533);
    this.buildTheBottomWall(3, 290, 73);
    this.buildTheRightWall(80, 305, 500);
    this.buildTheLeftWall(530, -11.5, 375);
    this.buildTheRightWall(0, -5, 380);
    this.buildTheBottomWall(4.5, 375, 533);
  }

  /**
   *
   */
  public override questionSelected(): void {
    if (this.npc.getIsPlayerCloseBy() && !this.entrance.getStatus()) {
      if (this.question === null) {
        if (this.keylistener.keyPressed(KeyListener.KEY_F)) {
          this.npc.setShowQuestion(true);
          if (this.player.getStatusLevel2()) {
            this.question = this.npc.getQuestionA();
          } else {
            this.question = this.npc.getQuestionB();
          }
        }
      } else {
        if (this.keylistener.keyPressed(KeyListener.KEY_UP)) this.question.moveUp();
        if (this.keylistener.keyPressed(KeyListener.KEY_DOWN)) this.question.moveDown();
        if (this.keylistener.keyPressed(KeyListener.KEY_F)) {
          this.npc.setShowQuestion(false);
          this.entrance.setStatus(true);
          this.npc.setIsQuestionAnswered();
          const score = this.question.getScore();
          if (!this.player.getStatusLevel2()) {
            if (score === 0) this.difficulty = 1;
            if (score === 0.5) this.difficulty = 2;
            if (score === 1) this.difficulty = 3;
          } else {
            if (score === 0) this.difficulty = 4;
            if (score === 0.5) this.difficulty = 5;
            if (score === 1) this.difficulty = 6;
          }
          this.question = null;
        }
      }
    }
  }

  /**
   * Checks if there is a collision between the player and the items
   *
   * @returns true if there is collision
   */
  // eslint-disable-next-line class-methods-use-this
  public buildQuestionsList() {
    const questionOne = this.locale.trans('You are looking for quick ways to collect coins in a game you play. A website offers you these coins for free, but requires you to fill in your real name, account username and password. What do you do?');
    const answer1A = this.locale.trans('I want the coins so I fill in the information needed.');
    const answer1B = this.locale.trans('I look for reviews of the website online.');
    const answer1C = this.locale.trans('I don’t fill in any information and close the website.');
    const questionTwo = this.locale.trans('A website you just opened tells you that your device has problems and asks permission to access your hard drive. What do you do?');
    const answer2A = this.locale.trans('I close the website and ignore the request.');
    const answer2B = this.locale.trans('I search for more information about this website online.');
    const answer2C = this.locale.trans('I give the website access to my hard drive.');
    return [
      {
        // eslint-disable-next-line max-len
        question: questionOne, optionA: answer1A, optionB: answer1B, optionC: answer1C, optionAScore: 0, optionBScore: 0.5, optionCScore: 1,
      },
      {
        // eslint-disable-next-line max-len
        question: questionTwo, optionA: answer2A, optionB: answer2B, optionC: answer2C, optionAScore: 1, optionBScore: 0.5, optionCScore: 0,
      },
    ];
  }
}
