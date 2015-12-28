"use strict";
var timerGO  = new Metronome(0, 5000);
function Game(char_id){
    this.world = new World(char_id);
    this.init();
}
Game.prototype = {
    init : function(){
        this.canvas = document.getElementById('game-screen');
        this.ctx = this.canvas.getContext('2d');
        this.stage = new createjs.Stage("game-screen");
        this.stage.snapToPixelEnabled = true;

        this.lastTime = Date.now();
        this.finished = false;

        createjs.Ticker.setInterval(16);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.on("tick", this.update, this);

        var i = 0;
        for (i=0; i<this.world.objects.length; i++)
            this.stage.addChild(this.world.objects[i]);
        for (i=0; i<this.world.enemies.length; i++)
            this.stage.addChild(this.world.enemies[i].sprite);
        this.stage.addChild(this.world.char.sprite);
        this.stage.addChild(this.world.char.counter);
        this.stage.addChild(this.world.char.status_bar);
        this.stage.addChild(this.world.char.flower);
    },
    update: function(){
        this.curTime = Date.now();
        var dt = this.curTime - this.lastTime;
        if (!this.world.gameOver && !this.world.char.won) {
            var i = 0;
            for (i = 0; i < this.world.bullets.length; i++) {
                if (!this.world.bullets[i].added) {
                    this.stage.addChild(this.world.bullets[i].sprite);
                    this.world.bullets[i].added = true;
                }
            }
            for (i = 0; i < this.world.traps.length; i++) {
                if (!this.world.traps[i].added) {
                    this.stage.addChild(this.world.traps[i].sprite);
                    this.world.traps[i].added = true;
                }
            }
            this.world.update(dt);
            this.stage.update(dt);
            timerGO.renew();
        }
        else{
            var text ="@";
            var x = 0;
            if (this.world.char.won){
                text = "YOU WON";
                x = 280;
            }
            if (this.world.gameOver){
                text = "GAME OVER";
                x = 220;
            }
            timerGO.update(dt);
            if (timerGO.getTick() || this.finished){
                if (!this.finished) {
                    MainMenuExec();
                    this.finished = true;
                }
            }
            else {
                this.stage.removeAllChildren();
                this.world.char.sound.stop();
                this.textGO = new createjs.Text(text, "60px Arial", "#000000");
                this.textGO.x = x;
                this.textGO.y = 320;
                this.stage.addChild(this.textGO);
                this.stage.update(dt);
            }
        }
        this.lastTime = this.curTime;
    }
};


