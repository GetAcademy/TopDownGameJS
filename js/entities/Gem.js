
Gem = function (game, x, y) {
    x *= 16;
    y *= 16;
    Phaser.Sprite.call(this, game, x, y, "atlas", "gem/gem-1");
    this.animations.add("gem", Phaser.Animation.generateFrameNames("gem/gem-", 1, 4, '', 0), 10, true);
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.animations.play("gem");
    this.type = "gem";
}
Gem.prototype = Object.create(Phaser.Sprite.prototype);
Gem.prototype.constructor = Gem;
