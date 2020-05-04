
EnemyDeath = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "atlas", "enemy-death/enemy-death-1");
    this.anchor.setTo(0.5);
    var anim = this.animations.add("death", Phaser.Animation.generateFrameNames("enemy-death/enemy-death-", 1, 6, '', 0), 18, false);
    this.animations.play("death");
    anim.onComplete.add(function () {
            this.kill();
        }, this
    );
}

EnemyDeath.prototype = Object.create(Phaser.Sprite.prototype);
EnemyDeath.prototype.constructor = EnemyDeath;
