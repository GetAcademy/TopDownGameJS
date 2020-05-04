
Arrow = function (game, x, y, dir) {

    Phaser.Sprite.call(this, game, x, y, "atlas", "arrow");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(5, 8, 0, 7);
    var vel = 270;
    switch (dir) {
        case   'n':
            this.body.velocity.y = -vel;
            break;
        case   's':
            this.body.velocity.y = vel;
            this.scale.y = -1;
            break;
        case   'e':
            this.body.velocity.x = vel;
            this.angle = 90;
            break;
        case   'w':
            this.body.velocity.x = -vel;
            this.angle = 270;
            break;

    }

}
Arrow.prototype = Object.create(Phaser.Sprite.prototype);
Arrow.prototype.constructor = Arrow;
Arrow.prototype.update = function () {
    if (!this.inWorld) {
        this.destroy();
    }
}
