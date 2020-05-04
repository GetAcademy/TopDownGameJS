
var gameOver = {
    create: function () {
        background = game.add.tileSprite(0, 0, gameWidth, gameHeight, "title-bg");
        this.title = game.add.image(game.width / 2, game.height / 2, 'gameover');
        this.title.anchor.setTo(0.5);

        //
        this.pressEnter = game.add.image(game.width / 2, game.height - 35, "enter");
        this.pressEnter.anchor.setTo(0.5);
        //
        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startKey.onDown.add(this.startGame, this);
        this.state = 1;
        //
        game.time.events.loop(900, this.blinkText, this);
        //
        var credits = game.add.image(game.width / 2, game.height - 15, "credits");
        credits.anchor.setTo(0.5);
    },
    startGame: function () {
        this.game.state.start('PlayGame');
    },
    blinkText: function () {
        if (this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    }
}
