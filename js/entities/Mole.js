
Mole = function (game, x, y, verticalMove) {
    x *= 16;
    y *= 16;
    var vel = 8;
    Phaser.Sprite.call(this, game, x, y, "atlas", "idle/mole-idle-front");
    this.animations.add('walk-front', Phaser.Animation.generateFrameNames('walk/mole-walk-front/mole-walk-front-', 1, 4, '', 0), vel, true);
    this.animations.add('walk-back', Phaser.Animation.generateFrameNames('walk/mole-walk-back/mole-walk-back-', 1, 4, '', 0), vel, true);
    this.animations.add('walk-side', Phaser.Animation.generateFrameNames('walk/mole-walk-side/mole-walk-side-', 1, 4, '', 0), vel, true);
    this.animations.play("walk-front");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(10, 10, 7, 12);
    this.speed = 60;
    if (verticalMove) {
        this.body.velocity.y = this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    this.body.bounce.x = 1;
    this.body.bounce.y = 1;
    this.type = "mole";

}
Mole.prototype = Object.create(Phaser.Sprite.prototype);
Mole.prototype.constructor = Mole;
Mole.prototype.update = function () {
    if (this.body.velocity.y > 0) {
        this.animations.play("walk-front");
    } else if (this.body.velocity.y < 0) {
        this.animations.play("walk-back");
    } else if (this.body.velocity.y == 0) {
        this.animations.play("walk-side");
        if (this.body.velocity.x > 0) {
            this.scale.x = 1;
        } else {
            this.scale.x = -1;
        }

    }
}