var preload = {
    preload: function () {
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        // load title screen
        game.load.image("title-bg", "assets/sprites/title-screen-bg.png");
        game.load.image("title", "assets/sprites/title-screen.png");
        game.load.image("enter", "assets/sprites/press-enter-text.png");
        game.load.image("credits", "assets/sprites/credits-text.png");
        game.load.image("instructions", "assets/sprites/instructions.png");
        game.load.image("gameover", "assets/sprites/game-over.png");

        // tileset
        game.load.image("tileset", "assets/environment/tileset.png");
        game.load.image("objects", "assets/environment/objects.png");
        game.load.image("collisions", "assets/environment/collisions.png");
        game.load.tilemap("map", "assets/maps/map.json", null, Phaser.Tilemap.TILED_JSON);
        // atlas
        game.load.atlasJSONArray("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json");
        game.load.atlasJSONArray("atlas-props", "assets/atlas/atlas-props.png", "assets/atlas/atlas-props.json");

        // images
        game.load.image('exit', 'assets/environment/exit-open.png');

        // audio
        game.load.audio("music", ["assets/sound/ancient_path.ogg", "assets/sound/ancient_path.mp3"]);
        game.load.audio("hurt", ["assets/sound/hurt.ogg", "assets/sound/hurt.mp3"]);
        game.load.audio("slash", ["assets/sound/slash.ogg", "assets/sound/slash.mp3"]);
        game.load.audio("item", ["assets/sound/item.ogg", "assets/sound/item.mp3"]);
        game.load.audio("enemy-death", ["assets/sound/enemy-death.ogg", "assets/sound/enemy-death.mp3"]);

    },
    create: function () {
        //this.game.state.start('PlayGame');
        this.game.state.start("TitleScreen");
    }
}
