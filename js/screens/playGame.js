
var playGame = {
    create: function () {

        this.addAudios();
        this.createTileMap(1);
        this.createGroups();
        this.createExit(46, 27);
        this.populate();
        this.createPlayer(47, 31);

        this.bindKeys();
        this.createCamera();
        this.createHud();

        this.startMusic();

        var attackKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackKey.onDown.add(this.prepareAttack, this);
        attackKey.onUp.add(this.releaseAttack, this);

    },

    createExit: function (x, y) {
        exit = game.add.sprite(x * 16, y * 16, "exit");
        exit.alpha = 0;
        game.physics.arcade.enable(exit);
    },

    startMusic: function () {
        if (!audioFlag) {
            return
        }

        this.music = game.add.audio("music");
        this.music.loop = true;

        this.music.play();

    },

    addAudios: function () {
        this.audioHurt = game.add.audio("hurt");
        this.audioItem = game.add.audio("item");
        this.audioEnemyDeath = game.add.audio("enemy-death");
        this.audioSlash = game.add.audio("slash");
    },

    prepareAttack: function () {
        if (attackFlag == 0) {
            attackFlag = 1;
        }
    },
    releaseAttack: function () {

        if (attackFlag == 1) {
            // reset if not pulled all the way
            attackFlag = 0;

        }

        if (attackFlag == 2) {
            attackFlag = 0;
            this.shoot();
        }

    },
    createHud: function () {

        this.hud_1 = game.add.sprite(10, 5, "atlas", "hearts/hearts-1");
        this.hud_2 = game.add.sprite(18, 5, "atlas", "hearts/hearts-1");
        this.hud_3 = game.add.sprite(26, 5, "atlas", "hearts/hearts-1");
        this.hud_1.fixedToCamera = true;
        this.hud_2.fixedToCamera = true;
        this.hud_3.fixedToCamera = true;

    },

    createCamera: function () {
        game.camera.follow(player);
    },
    bindKeys: function () {
        this.wasd = {
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            attack: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        }
        game.input.keyboard.addKeyCapture(
            [Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.DOWN,
                Phaser.Keyboard.UP]
        );
    },

    createTileMap: function () {

        //tilemap
        globalMap = game.add.tilemap("map");
        globalMap.addTilesetImage("collisions");
        globalMap.addTilesetImage("tileset");
        globalMap.addTilesetImage("objects");

        this.layer_collisions = globalMap.createLayer("Collisions Layer");
        this.layer = globalMap.createLayer("Tile Layer");
        this.layer2 = globalMap.createLayer("Tile Layer 2");

        // collisions
        globalMap.setCollision([0, 1]);

        this.layer.resizeWorld();
        this.layer2.resizeWorld();
        this.layer_collisions.resizeWorld();

        // this.layer_collisions.visible = true;
        // this.layer_collisions.debug = true;
        //this.layer.visible = false;

    },

    createPlayer: function (x, y) {
        var temp = new Player(game, x, y);
        game.add.existing(temp);
    },

    createGroups: function () {
        enemies_group = game.add.group();
        enemies_group.enableBody = true;
        //
        loot_group = game.add.group();
        loot_group.enableBody = true;
        //
        objects_group = game.add.group();
        objects_group.enableBody = true;
        //
        projectiles_group = game.add.group();
        projectiles_group.enableBody = true;
    },

    populate: function () {

        // populate enemies from the tiled map from the objects layer
        this.createMoles();
        this.createTreants();
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            //console.log(element);
            if (element.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact pixel position as in Tiled
                //console.log("Found " + element.type);
                element.y -= map.tileHeight;

                result.push(element);
            }
        });
        return result;
    },

    createMoles: function () {
        var enemies_array = this.findObjectsByType("mole", globalMap, "Object Layer");
        for (var i = 0; i < enemies_array.length; i++) {
            var sprite = enemies_group.add(new Mole(game, enemies_array[i].x / 16, enemies_array[i].y / 16, enemies_array[i].properties.vertical)); // create prefab
        }
    },

    createTreants: function () {
        var enemies_array = this.findObjectsByType("treant", globalMap, "Object Layer");
        for (var i = 0; i < enemies_array.length; i++) {
            var sprite = enemies_group.add(new Treant(game, enemies_array[i].x / 16, enemies_array[i].y / 16)); // create prefab
        }
    },

    shoot: function () {

        var shot;
        var dir = "s";
        if (player_state == PLAYER_STATE.WALKING_UP || player_state == PLAYER_STATE.UP) {
            dir = "n";
            shot = new Arrow(game, player.x, player.y, dir);
        } else if (player_state == PLAYER_STATE.WALKING_DOWN || player_state == PLAYER_STATE.DOWN) {
            dir = "s";
            shot = new Arrow(game, player.x, player.y, dir);
        } else if (player_state == PLAYER_STATE.WALKING_LEFT || player_state == PLAYER_STATE.LEFT) {
            dir = "w";
            shot = new Arrow(game, player.x, player.y + 4, dir);
        } else if (player_state == PLAYER_STATE.WALKING_RIGHT || player_state == PLAYER_STATE.RIGHT) {
            dir = "e";
            shot = new Arrow(game, player.x, player.y + 4, dir);
        }

        projectiles_group.add(shot);
        this.audioSlash.play();

    },

    update: function () {
        // physics
        game.physics.arcade.collide(player, this.layer_collisions);
        game.physics.arcade.collide(enemies_group, this.layer_collisions);
        //
        game.physics.arcade.overlap(enemies_group, projectiles_group, this.shotImpact, null, this);

        if (player.alive) {

            //overlaps
            game.physics.arcade.overlap(player, enemies_group, this.hurtPlayer, null, this);
            game.physics.arcade.overlap(player, loot_group, this.lootManager, null, this);

            // exit game if key is obtained
            game.physics.arcade.overlap(player, exit, this.exitManager, null, this);
        }

        this.movePlayer();

        //this.debugGame();
        this.hurtManager();
    },

    exitManager: function (player, exit) {
        if (kills <= 0) {
            this.game.state.start("GameOver");
            this.music.stop();
        }

    },

    lootManager: function (player, loot) {

        if (loot.type == "gem") {
            this.audioItem.play();
            loot.kill();
            if (player.health < 3) {
                player.health++;
                this.updateHealthHud();
            }

        }
        if (loot.type == "coin") {
            this.audioItem.play();
            loot.kill();

        }

    },

    hurtPlayer: function () {

        if (hurtFlag) {
            return;
        }
        hurtFlag = true;
        this.game.time.reset();

        player.alpha = 0.5;

        player.health--;
        this.updateHealthHud();

        this.audioHurt.play();
        if (player.health < 1) {
            this.gameOver();

        }
    },

    gameOver: function () {
        this.music.stop();
        this.game.state.start("GameOver");
    },

    updateHealthHud: function () {
        switch (player.health) {
            case 3:
                this.hud_1.loadTexture("atlas", "hearts/hearts-1", false);
                this.hud_2.loadTexture("atlas", "hearts/hearts-1", false);
                this.hud_3.loadTexture("atlas", "hearts/hearts-1", false);
                break;
            case 2:
                this.hud_1.loadTexture("atlas", "hearts/hearts-1", false);
                this.hud_2.loadTexture("atlas", "hearts/hearts-1", false);
                this.hud_3.loadTexture("atlas", "hearts/hearts-2", false);
                break;
            case 1:
                this.hud_1.loadTexture("atlas", "hearts/hearts-1", false);
                this.hud_2.loadTexture("atlas", "hearts/hearts-2", false);
                this.hud_3.loadTexture("atlas", "hearts/hearts-2", false);
                break;
            case 0:
                this.hud_1.loadTexture("atlas", "hearts/hearts-2", false);
                this.hud_2.loadTexture("atlas", "hearts/hearts-2", false);
                this.hud_3.loadTexture("atlas", "hearts/hearts-2", false);

                break;
        }
    },

    hurtManager: function () {
        if (hurtFlag && this.game.time.totalElapsedSeconds() > 2) {
            hurtFlag = false;
            player.alpha = 1;
        }
    },

    shotImpact: function (enemy, shot) {
        enemy.kill();
        shot.destroy();
        kills--;
        this.audioEnemyDeath.play();
        this.spawnCoin(enemy.x / 16, enemy.y / 16);
        this.spawnEnemyDeath(enemy.position.x, enemy.position.y);
        // sometimes drop gems or coins
        if (game.rnd.integerInRange(0, 2) == 0) {
            if (game.rnd.integerInRange(0, 1) == 0) {
                this.spawnCoin(enemy.x / 16, enemy.y / 16);
            } else {
                this.spawnGem(enemy.x / 16, enemy.y / 16);
            }

        }

        if (kills <= 0) {
            exit.alpha = 1;
        }

    },

    spawnEnemyDeath: function (x, y) {
        var temp = new EnemyDeath(game, x, y);
        game.add.existing(temp);
    },

    movePlayer: function () {

        var vel = 50;

        // attack animations
        if (attackFlag != 0) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            return;
        }

        // capture input
        if (this.wasd.down.isDown) {
            player_state = PLAYER_STATE.WALKING_DOWN;
            player.body.velocity.y = vel;
            player.body.velocity.x = 0;
        } else if (this.wasd.up.isDown) {
            player_state = PLAYER_STATE.WALKING_UP;
            player.body.velocity.y = -vel;
            player.body.velocity.x = 0;
        } else if (this.wasd.left.isDown) {
            player_state = PLAYER_STATE.WALKING_LEFT;
            player.body.velocity.x = -vel;
            player.body.velocity.y = 0;
        } else if (this.wasd.right.isDown) {
            player_state = PLAYER_STATE.WALKING_RIGHT;
            player.body.velocity.x = vel;
            player.body.velocity.y = 0;
        } else {
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
        }

        // idle
        if (player_state == PLAYER_STATE.WALKING_DOWN && player.body.velocity.y == 0) {
            player_state = PLAYER_STATE.DOWN;
        } else if (player_state == PLAYER_STATE.WALKING_UP && player.body.velocity.y == 0) {
            player_state = PLAYER_STATE.UP;
        } else if (player_state == PLAYER_STATE.WALKING_LEFT && player.body.velocity.x == 0) {
            player_state = PLAYER_STATE.LEFT;
        } else if (player_state == PLAYER_STATE.WALKING_RIGHT && player.body.velocity.x == 0) {
            player_state = PLAYER_STATE.RIGHT;
        }

    },

    spawnGem: function (x, y) {
        var temp = new Gem(game, x, y);
        game.add.existing(temp);
        loot_group.add(temp);
    },

    spawnCoin: function (x, y) {
        var temp = new Coin(game, x, y);
        game.add.existing(temp);
        loot_group.add(temp);
    },

    debugGame: function () {
        // return;
        //game.debug.spriteInfo(this.player, 30, 30);

        game.debug.body(player);
        enemies_group.forEachAlive(this.renderGroup, this);
        projectiles_group.forEachAlive(this.renderGroup, this);
        loot_group.forEachAlive(this.renderGroup, this);

    },
    renderGroup: function (member) {
        game.debug.body(member);
    }

}
