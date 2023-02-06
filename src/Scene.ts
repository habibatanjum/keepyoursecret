import CanvasUtil from './CanvasUtil.js';
import Coin from './Coin.js';
import Entrance from './Entrance.js';
import KeyListener from './KeyListener.js';
import Locale from './Locale.js';
import Monster from './Monster.js';
import Player from './Player.js';
import Question from './Question.js';
import ScoreItem from './ScoreItem.js';
import Shop from './Shop.js';
import Wall from './Wall.js';
import Wallbottom from './Wallbottom.js';
import Wallmid from './Wallmid.js';
import WallSideMidLeft from './WallSideMidLeft.js';
import WallSideMidRight from './WallSideMidRight.js';
import WallTopMid from './Walltopmid.js';

export default abstract class Scene {
  protected maxX: number;

  protected maxY: number;

  protected difficulty: number;

  protected locale: Locale;

  protected walls: Wall[] = [];

  protected shop: Shop;

  protected player: Player;

  protected playercanmoveup: boolean;

  protected playercanmovedown: boolean;

  protected playercanmoveleft: boolean;

  protected playercanmoveright: boolean;

  protected movelimit: number;

  protected question: Question;

  protected entrance: Entrance;

  protected items: ScoreItem[] = [];

  public constructor(maxX: number, maxY: number) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.shop = new Shop();
    this.player = new Player();
    this.movelimit = 0;
    this.playercanmoveup = true;
    this.playercanmovedown = true;
    this.playercanmoveleft = true;
    this.playercanmoveright = true;
    this.locale = new Locale('bn');
  }

  /**
   * Builds the game
   *
   * @param keyListener  - The keylistener to use
   */
  public processInput(keyListener: KeyListener): void {
    this.questionSelected(keyListener);
    if (this.question === null && this.shop.getStatus() === false) {
      this.playerMoving(keyListener);
    }
    this.shopSelected(keyListener);
  }

  /**
   *
   * @param elapsed time since last update
   * @returns null
   */
  public update(elapsed: number): Scene {
    this.shop.update(elapsed);
    this.player.update(elapsed);
    this.entrance.checkPlayerCloseBy(this.player);
    this.items = this.items.filter((item: ScoreItem) => {
      item.update(elapsed);
      if (item instanceof Monster) {
        item.checkPlayerCloseBy(this.player);
        if (item.getIsQuestionAnswered()) {
          return false;
        }
      } else if (item instanceof Coin) {
        if (this.player.collideWithItem(item)) {
          this.player.playerGetAmount(1);
          return false;
        }
      }
      return true;
    });
    this.checkPlayerMovement(elapsed);
    return null;
  }

  /**
   *
   * @param canvas - The canvas to render to.
   */
  public render(canvas: HTMLCanvasElement): void {
    this.walls.forEach((wall: Wall) => wall.render(canvas));
    CanvasUtil.drawImage(canvas, CanvasUtil.loadNewImage('assets/coin_anim_f0.png'), 10, 10);
    CanvasUtil.writeTextToCanvas(canvas, `x  ${this.player.getAmount()}`, 20, 18, 'left', 'ScoreFont', 11, 'white');
    this.entrance.render(canvas);
    this.player.render(canvas);
    this.items.forEach((item: ScoreItem) => {
      item.render(canvas);
    });
    if (this.question != null) this.question.render(canvas);
    if (this.shop.getStatus()) this.shop.render(canvas);
  }

  // eslint-disable-next-line jsdoc/require-param
  /**
   *
   */
  public buildTheLeftWall(posXLeftTop: number, posYLeftTop: number, posYRightDown: number) {
    for (let i = posYLeftTop; i <= posYRightDown; i += 16) {
      this.walls.push(new WallSideMidLeft(posXLeftTop, i));
    }
  }

  // eslint-disable-next-line jsdoc/require-param
  /**
   *
   */
  public buildTheRightWall(posXRightTop: number, posYRightTop: number, posYRightDown: number) {
    for (let i = posYRightTop; i <= posYRightDown; i += 16) {
      this.walls.push(new WallSideMidRight(posXRightTop, i));
    }
  }

  // eslint-disable-next-line jsdoc/require-param
  /**
   *
   */
  public buildTheTopWall(posXLeftTop: number, posYLeftTop: number, posXRightTop: number) {
    for (let i = posXLeftTop; i <= posXRightTop; i += 16) {
      this.walls.push(new WallTopMid(i, posYLeftTop));
      this.walls.push(new Wallmid(i, posYLeftTop + 16));
    }
  }

  // eslint-disable-next-line jsdoc/require-param
  /**
   *
   */
  public buildTheBottomWall(posXLeftTop: number, posYLeftTop: number, posXRightTop: number) {
    // console.log('buildTheBottomWall');
    for (let i = posXLeftTop; i <= posXRightTop; i += 16) {
      this.walls.push(new WallTopMid(i, posYLeftTop));
      this.walls.push(new Wallbottom(i, posYLeftTop + 16));
    }
  }

  /**
   *
   * @param keyListener - The keyListener to process.
   */
  public questionSelected(keyListener: KeyListener): void {
    this.items.forEach((item: ScoreItem) => {
      if (item instanceof Monster) {
        if (item.getIsPlayerCloseBy() === true) {
          if (this.question === null) {
            if (keyListener.keyPressed(KeyListener.KEY_F)) {
              item.setShowQuestion();
              this.question = item.getQuestion();
            }
          } else {
            if (keyListener.keyPressed(KeyListener.KEY_UP)) this.question.moveUp();
            if (keyListener.keyPressed(KeyListener.KEY_DOWN)) this.question.moveDown();
            if (keyListener.keyPressed(KeyListener.KEY_F)) {
              item.setIsQuestionAnswered();
              if (this.question.checkAnswer()) {
                this.player.losCoins();
              }
              this.question = null;
            }
          }
        }
      }
    });
  }

  /**
   * @param keyListener - The keyListener to process.
   */
  public playerMoving(keyListener: KeyListener): void {
    if (this.playercanmoveup === true) {
      if (keyListener.isKeyDown(KeyListener.KEY_UP)) {
        this.player.move(0, -2);
        this.playercanmoveleft = true;
        this.playercanmoveright = true;
        this.playercanmovedown = true;
      }
    }

    if (this.playercanmovedown === true) {
      if (keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
        this.player.move(0, 2);
        this.playercanmoveleft = true;
        this.playercanmoveright = true;
        this.playercanmoveup = true;
      }
    }

    if (this.playercanmoveleft === true) {
      if (keyListener.isKeyDown(KeyListener.KEY_LEFT)
        && !(keyListener.isKeyDown(KeyListener.KEY_UP))
        && !(keyListener.isKeyDown(KeyListener.KEY_DOWN))) {
        this.player.move(-2, 0);
        this.playercanmovedown = true;
        this.playercanmoveright = true;
        this.playercanmoveup = true;
      }
    }

    if (this.playercanmoveright === true) {
      if (keyListener.isKeyDown(KeyListener.KEY_RIGHT)
        && !(keyListener.isKeyDown(KeyListener.KEY_UP))
        && !(keyListener.isKeyDown(KeyListener.KEY_DOWN))) {
        this.player.move(2, 0);
        this.playercanmoveleft = true;
        this.playercanmovedown = true;
        this.playercanmoveup = true;
      }
    }
  }

  /**
   * @param elapsed - The elapsed time.
   */
  public checkPlayerMovement(elapsed: number): void {
    this.walls.forEach((wall: Wall) => {
      if (wall instanceof Wallmid) {
        if (this.player.collideWithWallTop(wall)) {
          this.playercanmoveup = false;
          this.movelimit = 10;
        }
      }
      if (wall instanceof Wallbottom) {
        if (this.player.collideWithWallTop(wall)) {
          this.playercanmovedown = false;
          this.movelimit = 10;
        }
      }
      if (wall instanceof WallSideMidLeft) {
        if (this.player.collideWithWallLeft(wall)) {
          this.playercanmoveright = false;
          this.movelimit = 10;
        }
      }
      if (wall instanceof WallSideMidRight) {
        if (this.player.collideWithWallRight(wall)) {
          this.playercanmoveleft = false;
          this.movelimit = 10;
        }
      }
    });
    /**
     * If there is collision with the wall objects
     * movelimit be set to 10 and will limit movement at inputs
     * overtime movelimit will reach 0 and all movelimit will be reset to true
     */
    this.movelimit -= elapsed;
    if (this.movelimit === 0) {
      this.playercanmoveup = true;
      this.playercanmovedown = true;
      this.playercanmoveleft = true;
      this.playercanmoveright = true;
    }
  }

  /**
   * selects items in the shop
   *
   * @param keyListener - The keyListener to process.
   */
  public shopSelected(keyListener: KeyListener): void {
    if (keyListener.keyPressed(KeyListener.KEY_P)) {
      if (this.shop.getStatus()) this.shop.setStatus(false);
      else this.shop.setStatus(true);
    }
    if (this.shop.getStatus()) {
      if (keyListener.keyPressed(KeyListener.KEY_LEFT)) this.shop.moveLeft();
      if (keyListener.keyPressed(KeyListener.KEY_RIGHT)) this.shop.moveRight();
      if (keyListener.keyPressed(KeyListener.KEY_F)) {
        this.shop.buyItem(this.player);
      }
    }
  }
}
