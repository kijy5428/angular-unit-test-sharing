import { Component, OnInit, OnDestroy } from '@angular/core';
import Phaser from 'phaser';
import { ThemeService } from '../theme.service';
const Width = 1600;
const Height = 900;

export enum themeEnum {
  normal,
  christmas
}
@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit, OnDestroy {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  theme;
  constructor(public themeSerivce: ThemeService) {
    this.theme = themeEnum.christmas;
    this.config = {
      type: Phaser.AUTO,
      height: 900,
      width: 1600,
      scene: [MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 }
        }
      }
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    this.phaserGame.destroy(true);
  }
}

class Ground extends Phaser.Physics.Arcade.Image {
  speed;
  constructor(scene) {
    super(scene, 0, 0, 'ground');
    this.speed = Phaser.Math.GetSpeed(150, 1);
  }

  fire(x, y) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setImmovable(true);

  }

  update(time, delta) {
    this.y -= this.speed * delta;
    this.refreshBody();

    if (this.y < 0) {
      this.setActive(false);
      this.setVisible(false);
      }
    }
  }



class Idiot extends Phaser.Physics.Arcade.Sprite {
  rnd: Phaser.Math.RandomDataGenerator = new Phaser.Math.RandomDataGenerator();
  scene: any;
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.setPosition(x, y);
    // this.body.gravity.y = 1000;
    // this.setXV
  }

  reJoinGame() {
    this.setPosition(this.rnd.between(0, Width), 100);
    this.setVelocity(0, 0);
    this.scene.score = 0;
    this.scene.scoreText.setText('Score: ' + 0);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y > Height) {
      this.reJoinGame();
    }

  }

}

class MainScene extends Phaser.Scene {
  cursors;
  player: Idiot;
  bullets;
  speed;
  ground;
  theme;
  scoreText;
  score = 0;
  timedEvent;
  rnd: Phaser.Math.RandomDataGenerator;
  grounds: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super({ key: 'main' });
    this.rnd = new Phaser.Math.RandomDataGenerator();
  }
  create() {


    const info = this.add.text(0, 0, 'Click to add objects', { fill: '#00ff00' });
    this.theme = this.registry.list['theme'] === themeEnum.christmas ? 'bg' : 'ground';
    this.grounds = this.physics.add.staticGroup({
      classType: Ground,
      key: 'ground',
      maxSize: 20,
      runChildUpdate: true,
      setScale: {x: 0.1, y: 0.1}
    });

    this.speed = Phaser.Math.GetSpeed(300, 1);

    this.add.image(800, 450, 'bg').setScale(0.8);
    this.scoreText = this.add.text(50, 50, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.ground = this.physics.add.staticGroup(
      {
        classType: Ground,
        maxSize: 10,
        runChildUpdate: true
      }
    );

    const ground = this.grounds.get() as Ground;
    this.add.existing(ground);
    this.physics.add.existing(ground);
    if (ground) {
      ground.fire(100, 600);
      ground.setScale(0.7, 0.7);
    }

    this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.addScore, callbackScope: this, loop: true });

    // for the player
    // this.player = this.physics.add.sprite(100, 490, 'char2');
    this.player = new Idiot(this, 101, 400, 'char2');
    this.add.existing(this.player);
    const playerPhysic = this.physics.add.existing(this.player);
    this.player.body.gravity.y = 300;
    this.physics.add.collider(this.grounds, this.player);
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('char2', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'char2', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('char2', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }
  preload() {
    this.load.image('logo', 'assets/img/logo.png');
    this.load.image('char1', 'assets/img/char1.png');
    this.load.image('bg', 'assets/img/christmas_bg.png');
    this.load.image('ground', 'assets/img/ground.png');
    this.load.image('spring', 'assets/img/spring.png');
    this.load.spritesheet('char1',
      'assets/img/char1.png',
      {
        frameWidth: 32,
        frameHeight: 38,
        startFrame: 0,
        endFrame: 11

      }
    );
    this.load.spritesheet('char2',
      'assets/img/char2.png',
      {
        frameWidth: 32,
        frameHeight: 38,
        startFrame: 0,
        endFrame: 11

      }
    );
  }
  update(time, delta) {
    this.cursors = this.input.keyboard.createCursorKeys();

    // for controlling the character
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-600);
    }

    // update grounds;
    const rndNum = this.rnd.between(0, 1000);
    if (rndNum <= 50) {
      const ground = this.grounds.get() as Ground;
      if (ground) {
        ground.fire(this.rnd.between(0, 1600), 1000);
        ground.setScale(0.7, 0.7);
      }
    }
  }

  addScore() {
    this.score += 10;
    this.scoreText.setText('Score:' + this.score);
  }


}

