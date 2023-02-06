import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
import SceneStart from './SceneStart.js';
import Entrance from './Entrance.js';
import Coin from './Coin.js';
import Player from './Player.js';
import LevelWithNpc from './LevelWithNpc.js';

export default class Level11 extends Scene {
  private keylistener: KeyListener;

  public constructor(maxX: number, maxY: number, player: Player) {
    super(maxX, maxY);
    this.question = null;
    this.entrance = null;
    this.items = [];
    /**
     * Constructor will load in coins
     */
    for (let i = 164; i <= 400; i += 96) {
      this.items.push(new Coin(36, i));
    }
    for (let i = 132; i <= 400; i += 96) {
      this.items.push(new Coin(i, 260));
    }
    for (let i = 132; i <= 530; i += 96) {
      if (i <= 400 || i > 496) {
        this.items.push(new Coin(i, 356));
      }
    }
    for (let i = 132; i <= 400; i += 96) {
      this.items.push(new Coin(404, i));
    }
    for (let i = 35; i <= 131; i += 96) {
      this.items.push(new Coin(517, i));
    }
    for (let i = 244; i <= 436; i += 96) {
      this.items.push(new Coin(i, 35));
    }

    /**
     * Constructor will load in final items
     */
    this.walls = [];
    this.entrance = new Entrance(240, 112);
    this.keylistener = new KeyListener();
    this.player = player;
    this.player.setPosition(15, 28);
    this.player.setLevel2Unlocked();
    this.buildGame();
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
    this.buildTheLeftWall(113, 0, 144);
    this.buildTheBottomWall(80, 144, 120);
    this.buildTheLeftWall(68, 157, 205);
    this.buildTheLeftWall(67, 285, 317);
    this.buildTheBottomWall(81, 272, 353);
    this.buildTheTopWall(81, 208, 353);
    this.buildTheTopWall(81, 320, 353);
    this.buildTheTopWall(368, 80, 482);
    this.buildTheRightWall(366, 95, 220);
    this.buildTheRightWall(366, 285, 320);
    this.buildTheBottomWall(445, 150, 530);
    this.buildTheLeftWall(433, 167, 320);
    this.buildTheBottomWall(288, 48, 482);
    this.buildTheRightWall(492, 60, 80);
    this.buildTheBottomWall(208, 128, 274);
    this.buildTheLeftWall(274, 62, 128);
    this.buildTheRightWall(208, 0, 128);
    this.buildTheTopWall(445, 315, 530);
  }
}
