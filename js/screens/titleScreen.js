

var titleScreen = {
    create: function () {
        background = game.add.tileSprite(0, 0, gameWidth, gameHeight, "title-bg");
        this.title = game.add.image(game.width / 2, 130, "title");
        this.title.anchor.setTo(0.5, 1);
        var tween = game.add.tween(this.title);
        tween.to({y: 130 + 10}, 800, Phaser.Easing.Linear.In).yoyo(true).loop();

        tween.start();
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
        if (this.state == 1) {
            this.state = 2;
            this.title2 = game.add.image(game.width / 2, game.height / 2, 'instructions');
            this.title2.anchor.setTo(0.5);
            this.title.destroy();
        } else {
            this.game.state.start('PlayGame');
        }
    },
    blinkText: function () {
        if (this.pressEnter.alpha) {
            this.pressEnter.alpha = 0;
        } else {
            this.pressEnter.alpha = 1;
        }
    }
}