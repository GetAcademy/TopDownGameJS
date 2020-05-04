
Coin = function (game, x, y) {
    x *= 16;
    y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "coin/coin-1");
    this.animations.add("coin", Phaser.Animation.generateFrameNames("coin/coin-", 1, 4, '', 0), 10, true);
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.animations.play("coin");
    this.type = "coin";
}
Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;