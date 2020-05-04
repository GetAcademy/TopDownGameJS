/*
 * TINY RPG Forest Demo Code
 * @copyright    2018 Ansimuz
 * @license      {@link https://opensource.org/licenses/MIT | MIT License}
 * Get free assets and code at: www.pixelgameart.org
 * 
 * */

var audioFlag = true;
var attackFlag = 0;
var game;
var player;
var gameWidth = 272;
var gameHeight = 192;
var globalMap;
var enemies_group;
var loot_group;
var objects_group;
var projectiles_group;
var player_state;
var PLAYER_STATE = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
    WALKING_LEFT: 4,
    WALKING_RIGHT: 5,
    WALKING_UP: 6,
    WALKING_DOWN: 7
};
var hurtFlag;
var exit;
var kills = 5;

