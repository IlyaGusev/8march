function Enemy(regX, regY, direction, from){
    this.regX = regX || SIZE*5;
    this.regY = regY || 120;
    this.direction = direction || 'd';
    this.from = from || 'r';
    this.init();
}
Enemy.prototype = {
    init : function(){
        this.sprite = null;
        this.timer = new Metronome(getRandomInt(8000, 12000), getRandomInt(2000, 12000));
        this.timerStop = new Metronome(1000, 4000);
        this.speed = 2;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;

        this.data = {
            images: [loader.getResult("guy")],
            frames: {width:SIZE, height:SIZE},
            animations: {
                door_closed: 0,
                ready: 5,
                stopped: {
                    frames: [22, 23, 24],
                    speed: 0.2
                },
                move_left: {
                    frames: [12, 13, 14],
                    speed: 0.2
                },
                move_right:{
                    frames: [15, 16, 17],
                    speed: 0.2
                }
            }
        };

        if (this.from == 'r')
            this.data.animations.door_closed = 3;
        else if (this.from == 'l')
            this.data.animations.door_closed = 1;
        else if (this.from == 'u')
            this.data.animations.door_closed = 2;
        else if (this.from == 'd')
            this.data.animations.door_closed = 0;

        if (this.from == 'r' && this.direction=='u')
            this.data.animations.ready = 10;
        else if (this.from == 'r' && this.direction=='d')
            this.data.animations.ready = 11;
        else if (this.from == 'd' && this.direction=='r')
            this.data.animations.ready = 4;
        else if (this.from == 'd' && this.direction=='l')
            this.data.animations.ready = 5;
        else if (this.from == 'l' && this.direction=='u')
            this.data.animations.ready = 7;
        else if (this.from == 'l' && this.direction=='d')
            this.data.animations.ready = 6;
        else if (this.from == 'u' && this.direction=='r')
            this.data.animations.ready = 9;
        else if (this.from == 'u' && this.direction=='l')
            this.data.animations.ready = 8;

        if (this.direction == 'd')
            this.dy = this.speed;
        else if (this.direction == 'u')
            this.dy = -this.speed;
        else if (this.direction == 'l')
            this.dx = -this.speed;
        else if (this.direction == 'r')
            this.dx = this.speed;



        this.sprites = new createjs.SpriteSheet(this.data);
        this.sprite = new createjs.Sprite(this.sprites, "door_closed");

        this.centerX = this.sprite.x + SIZE/2;
        this.centerY = this.sprite.y + SIZE/2;

        this.moving = false;
        this.ready = false;
        this.collided = false;
        this.returning = false;
        this.stopped = false;
        this.killed = false;
    },

    update: function(camera_x, camera_y, map, char, bullets, traps, dt){

        if (!this.killed) {
            var OBS_DIST = 180;
            var RET_DIST = 180;
            var COLLIDE_DIST = 10;
            this.sprite.x = this.regX + this.x + camera_x;
            this.sprite.y = this.regY + this.y + camera_y;
            this.centerX = this.sprite.x + SIZE / 2;
            this.centerY = this.sprite.y + SIZE / 2;
            var i = 0;

            if (!this.stopped) {
                //Observers
                if (this.ready &&
                    ((this.direction == 'd' && char.centerY - this.centerY >= 0 && char.centerY - this.centerY <= OBS_DIST && this.centerX - char.centerX == 0) ||
                    (this.direction == 'u' && char.centerY - this.centerY <= 0 && char.centerY - this.centerY >= -OBS_DIST && this.centerX - char.centerX == 0) ||
                    (this.direction == 'l' && char.centerX - this.centerX <= 0 && char.centerX - this.centerX >= -OBS_DIST && this.centerY - char.centerY == 0) ||
                    (this.direction == 'r' && char.centerX - this.centerX >= 0 && char.centerX - this.centerX <= OBS_DIST && this.centerY - char.centerY == 0)))
                    this.moving = true;

                for (i=0; i<traps.length; i++) {
                    if (this.ready &&
                        ((this.direction == 'd' && traps[i].centerY - this.centerY >= 0 && traps[i].centerY - this.centerY <= OBS_DIST && this.centerX - traps[i].centerX == 0) ||
                        (this.direction == 'u' && traps[i].centerY - this.centerY <= 0 && traps[i].centerY - this.centerY >= -OBS_DIST && this.centerX - traps[i].centerX == 0) ||
                        (this.direction == 'l' && traps[i].centerX - this.centerX <= 0 && traps[i].centerX - this.centerX >= -OBS_DIST && this.centerY - traps[i].centerY == 0) ||
                        (this.direction == 'r' && traps[i].centerX - this.centerX >= 0 && traps[i].centerX - this.centerX <= OBS_DIST && this.centerY - traps[i].centerY == 0)))
                        this.moving = true;
                }


                //Main
                this.timer.update(dt);
                if (this.moving) {
                    if (!this.returning) {
                        var up = (this.regY + this.y) / SIZE;
                        var left = (this.regX + this.x) / SIZE;
                        var down = (this.regY + this.y + 59) / SIZE;
                        var right = (this.regX + this.x + 59) / SIZE;
                        if (this.direction == 'd' && map[Math.floor(up + 1)][Math.floor(left)] == 1 && map[Math.floor(up + 1)][Math.floor(right)] == 1){
                            this.y += this.dy;
                            if (this.sprite.currentAnimation!="move_left")
                                this.sprite.gotoAndPlay("move_left");
                        }
                        else if (this.direction == 'u' && map[Math.floor(down - 1)][Math.floor(left)] == 1 && map[Math.floor(down - 1)][Math.floor(right)] == 1) {
                            this.y += this.dy;
                            if (this.sprite.currentAnimation!="move_left")
                                this.sprite.gotoAndPlay("move_left");
                        }

                        else if (this.direction == 'l' && map[Math.floor(up)][Math.floor(right - 1)] == 1 && map[Math.floor(down)][Math.floor(right - 1)] == 1){
                            this.x += this.dx;
                            if (this.sprite.currentAnimation!="move_left")
                                this.sprite.gotoAndPlay("move_left");
                        }
                        else if (this.direction == 'r' && map[Math.floor(up)][Math.floor(left + 1)] == 1 && map[Math.floor(down)][Math.floor(left + 1)] == 1) {
                            this.x += this.dx;
                            if (this.sprite.currentAnimation!="move_right")
                                this.sprite.gotoAndPlay("move_right");
                        }
                        else
                            this.returning = true;

                        if (this.y >= RET_DIST || this.x >= RET_DIST || this.y <= -RET_DIST || this.x <= -RET_DIST)
                            this.returning = true;
                    }
                    else {
                        if (this.direction == 'l' || this.direction == 'u' || this.direction == 'd') {
                            if (this.sprite.currentAnimation != "move_right")
                                this.sprite.gotoAndPlay("move_right");
                        }
                        else {
                            if (this.sprite.currentAnimation != "move_left")
                                this.sprite.gotoAndPlay("move_left");
                        }
                        this.x -= this.dx;
                        this.y -= this.dy;
                        if ((this.y == 0 && this.dy != 0) || (this.x == 0 && this.dx != 0)) {
                            this.renew();
                        }
                    }
                }
                else {
                    if (this.timer.getTick())
                        this.ready = !this.ready;
                    if (this.ready)
                        this.sprite.gotoAndPlay("ready");
                    else
                        this.sprite.gotoAndPlay("door_closed");
                }

                //Colliders
                if (Math.abs(char.centerX - this.centerX) <= COLLIDE_DIST && Math.abs(char.centerY - this.centerY) <= COLLIDE_DIST && this.ready && !this.collided) {
                    if (!char.cool) {
                        if (this.moving) {
                            this.returning = true;
                            this.collided = true;
                        }
                        else
                            this.renew();
                        char.counter.text = parseInt(char.counter.text) + 1
                    }
                    else{
                        this.stopped = true;
                    }
                }

                for (i=0; i<bullets.length; i++) {
                    if (!bullets[i].done) {
                        if (Math.abs(bullets[i].centerX - this.centerX) <= COLLIDE_DIST && Math.abs(bullets[i].centerY - this.centerY) <= COLLIDE_DIST && this.ready) {
                            this.stopped = true;
                            this.timerStop.renew();
                        }
                    }
                }
                for (i=0; i<traps.length; i++) {
                    if (!traps[i].done) {
                        if (Math.abs(traps[i].centerX - this.centerX) <= COLLIDE_DIST && Math.abs(traps[i].centerY - this.centerY) <= COLLIDE_DIST && this.ready) {
                            this.stopped = true;
                            this.timerStop.renew();
                        }
                    }
                }
            }
            else if (this.stopped){
                if (this.sprite.currentAnimation != "stopped")
                    this.sprite.gotoAndPlay("stopped");
                this.timerStop.update(dt);
                if (this.timerStop.getTick()){
                    this.stopped = false;
                }
            }
        }
        else {
        }
    },
    renew: function() {
        this.returning = false;
        this.moving = false;
        this.ready = false;
        this.timer.time = 0;
        this.timer.tick = false;
        this.collided = false;
        this.sprite.gotoAndPlay("door_closed");
    }

};