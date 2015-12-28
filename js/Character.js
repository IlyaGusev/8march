
function Character(char_id){
    this.char_id = char_id;
    switch(char_id){
        case 0:
            this.id = "anna";
            this.sound = new buzz.sound( "res/Sounds/Anna1", {
                formats: [ "mp3" ]
            });
            break;
        case 1:
            this.id = "anata";
            this.sound = new buzz.sound( "res/Sounds/Anata1", {
                formats: [ "mp3" ]
            });
            break;
        case 2:
            this.id = "rita";
            this.sound = new buzz.sound( "res/Sounds/Rita1", {
                formats: [ "mp3" ]
            });
            break;
        case 3:
            this.id = "din";
            this.sound = new buzz.sound( "res/Sounds/Din1", {
                formats: [ "mp3" ]
            });
            break;
        case 4:
            this.id = "nad";
            this.sound = new buzz.sound( "res/Sounds/Nad1", {
                formats: [ "mp3" ]
            });
            break;
        case 5:
            this.id = "kate";
            this.sound = new buzz.sound( "res/Sounds/Kate1", {
                formats: [ "mp3" ]
            });
            break;
        case 6:
            this.id = "ksu";
            this.sound = new buzz.sound( "res/Sounds/Ksu1", {
                formats: [ "mp3" ]
            });
            break;
        default:
            this.id = "anna";
            this.sound = new buzz.sound( "res/Sounds/Anna1", {
                formats: [ "mp3" ]
            });
            break;
    }
    this.sound.play().loop();
    this.init();
}
Character.prototype = {
    init : function(){
        this.data = {
            images: [loader.getResult(this.id)],
            frames: {width:SIZE, height:SIZE},
            animations: {
                move_left: {
                    frames: [0,1,2,3],
                    speed: 0.2
                },
                move_right: {
                    frames: [4,5,6,7],
                    speed: 0.2
                },
                stand_left: 0,
                stand_right:4
            }
        };

        this.attack_timer = new Metronome(0, 4000);
        this.attack_animation_timer = new Metronome(0, 1000);
        switch(this.char_id){
            case 0:
                this.data.animations.attack = {frames: [8,9,10,11, 12, 13, 14, 15, 16, 17, 18], speed: 0.15};
                break;
            case 1:
                this.data.animations.move_cool_left = {frames: [8,9,10,11,12,13,12,11, 9], speed: 0.3};
                this.data.animations.stand_cool_left = {frames: [9]};
                this.data.animations.move_cool_right = {frames: [14,15,16,17,18,19,18,17, 16, 15], speed: 0.3};
                this.data.animations.stand_cool_right = {frames: [15]};
                this.attack_timer = new Metronome(0, 4000);
                this.attack_animation_timer = new Metronome(0, 1000);
                break;
            case 2:
                this.data.animations.attack = {frames: [13, 14, 15, 16, 17], speed: 0.1};
                this.attack_timer = new Metronome(0, 4000);
                this.attack_animation_timer = new Metronome(0, 500);
                break;
            case 3:
                this.data.animations.move_cool_right = {frames: [9,10,11,12,12,12,13,14,15,16], speed: 0.15};
                this.data.animations.move_cool_left = {frames: [17,18,19,20,21,21,22,23,24,25], speed: 0.15};
                this.attack_timer = new Metronome(0, 4000);
                this.attack_animation_timer = new Metronome(0, 1000);
                break;
            case 4:
                this.data.animations.attack = {frames: [8,9,10,11,12,13, 13,13,12,11], speed: 0.3};
                this.attack_timer = new Metronome(0, 4000);
                this.attack_animation_timer = new Metronome(0, 500);
                break;
            case 5:
                this.data.animations.move_cool_right = {frames: [8,9,10,11,12,13,14,15,16], speed: 0.15};
                this.data.animations.move_cool_left = {frames: [17,18,19,20,21,21,22,23,24,25], speed: 0.15};
                this.attack_timer = new Metronome(0, 4000);
                this.attack_animation_timer = new Metronome(0, 1000);
                break;
            case 6:
                this.data.animations.attack = {frames: [8,9,10,11,12,13,14, 14, 13,13,12,11], speed: 0.3};
                this.attack_timer = new Metronome(0, 4000);
                this.attack_animation_timer = new Metronome(0, 500);
                break;
            default:
                break;
        }

        this.sprites = new createjs.SpriteSheet(this.data);
        this.sprite = new createjs.Sprite(this.sprites, "move_left");

        this.sprite.x = 840/2-SIZE/2;
        this.sprite.y = 840/2-SIZE/2;
        this.centerX = this.sprite.x + SIZE/2;
        this.centerY = this.sprite.y + SIZE/2;
        this.xView = this.sprite.x;
        this.yView = this.sprite.y;
        this.x = SIZE*5;
        this.y = SIZE;
        this.speed = 3;
        this.direction = "d";
        this.attack = false;
        this.attack_animation = false;
        this.cool = false;
        this.casted = false;
        this.won = false;

        this.counter = new createjs.Text("0", "60px Arial", "#ff7700");
        this.counter.x = 80;
        this.counter.y = 30;

        this.status_bar = new createjs.Shape();
        this.status_bar.graphics.beginFill("#fff000").drawRect(20, 100, this.attack_timer.time/4000*200, 20);

        this.flower = new createjs.Bitmap(loader.getResult("flower"));
        this.flower.x = 20;
        this.flower.y = 30;
    },
    update: function(map, dt){
        if (this.attack_timer.tick == false)
            this.status_bar.graphics.beginFill("#fff000").drawRect(20, 100, this.attack_timer.time/4000*120, 20);
        else
            this.status_bar.graphics.beginFill("#ff0000").drawRect(20, 100, 120, 20);
        this.casted = false;
        this.attack = false;
        if (!this.attack_animation) {
            var move_l = "move_left";
            var move_r = "move_right";
            var stand_l = "stand_left";
            var stand_r = "stand_right";
            var up = this.y / SIZE;
            var left = this.x / SIZE;
            var down = (this.y + 59) / SIZE;
            var right = (this.x + 59) / SIZE;
            if (key.activeKeys().indexOf("down") != -1 && map[Math.floor(up + 1)][Math.floor(left)] == 1 && map[Math.floor(up + 1)][Math.floor(right)] == 1) {
                this.y += this.speed;
                if (this.sprite.currentAnimation!=move_l)
                    this.sprite.gotoAndPlay(move_l);
                this.direction = 'd';
            }

            else if (key.activeKeys().indexOf("up") != -1 && map[Math.floor(down - 1)][Math.floor(left)] == 1 && map[Math.floor(down - 1)][Math.floor(right)] == 1) {
                this.y -= this.speed;
                if (this.sprite.currentAnimation!=move_l)
                    this.sprite.gotoAndPlay(move_l);
                this.direction = 'u';
            }

            else if (key.activeKeys().indexOf("left") != -1 && map[Math.floor(up)][Math.floor(right - 1)] == 1 && map[Math.floor(down)][Math.floor(right - 1)] == 1) {
                this.x -= this.speed;
                if (this.sprite.currentAnimation!=move_l)
                    this.sprite.gotoAndPlay(move_l);
                this.direction = 'l';
            }

            else if (key.activeKeys().indexOf("right") != -1 && map[Math.floor(up)][Math.floor(left + 1)] == 1 && map[Math.floor(down)][Math.floor(left + 1)] == 1) {
                this.x += this.speed;
                if (this.sprite.currentAnimation!=move_r)
                    this.sprite.gotoAndPlay(move_r);
                this.direction = 'r';
            }
            else if (map[Math.floor(down - 1)][Math.floor(left)] == 10 || map[Math.floor(down - 1)][Math.floor(right)]==10 && key.activeKeys().indexOf("up") != -1){
                this.won = true;
            }
            else {
                if (this.direction == 'u' || this.direction == 'd' || this.direction == 'l')
                    this.sprite.gotoAndPlay(stand_l);
                else
                    this.sprite.gotoAndPlay(stand_r);
            }
            this.centerX = this.sprite.x + SIZE / 2;
            this.centerY = this.sprite.y + SIZE / 2;

            this.attack_timer.update(dt);
            if (key.activeKeys().indexOf("space") != -1 && this.attack_timer.getTick()) {
                if (this.id == "nad" || this.id=="rita" || this.id == 'ksu') {
                    this.attack_animation_timer.renew();
                    this.sprite.gotoAndPlay("attack");
                    this.attack_animation = true;
                    this.attack_timer.renew();
                }
                if (this.id == "din" || this.id == "anata"  || this.id == 'kate') {
                    this.cool = true;
                    this.attack_animation = true;
                    this.sprite.gotoAndPlay("attack");
                    this.attack_timer.renew();
                    this.attack_animation_timer.renew();
                }
                if (this.id == "anna") {
                    this.attack_animation_timer.renew();
                    this.attack_animation = true;
                    this.sprite.gotoAndPlay("attack");
                    this.attack_timer.renew();
                }
            }
        }
        else{
            if (this.id == 'nad' || this.id == 'rita' || this.id=='ksu') {
                this.attack_animation_timer.update(dt);
                if (this.attack_animation_timer.getTick()) {
                    this.attack_animation = false;
                    this.attack = true;
                }
            }
            else if (this.id == 'anna') {
                this.attack_animation_timer.update(dt);
                if (this.attack_animation_timer.getTick()) {
                    this.attack_animation = false;
                    this.casted = true;
                }
            }
            else if (this.id == 'din' || this.id == 'anata' || this.id == 'kate') {
                this.attack_animation_timer.update(dt);
                var ml = "move_cool_left";
                var mr = "move_cool_right";
                var up = this.y / SIZE;
                var left = this.x / SIZE;
                var down = (this.y + 59) / SIZE;
                var right = (this.x + 59) / SIZE;
                if (this.direction == 'r' && map[Math.floor(up)][Math.floor(left + 1)] == 1 && map[Math.floor(down)][Math.floor(left + 1)] == 1) {
                    this.x += this.speed * 2;
                    if (this.sprite.currentAnimation != mr)
                        this.sprite.gotoAndPlay(mr);
                }
                else if (this.direction == 'l' && map[Math.floor(up)][Math.floor(right - 1)] == 1 && map[Math.floor(down)][Math.floor(right - 1)] == 1) {
                    this.x -= this.speed * 2;
                    if (this.sprite.currentAnimation != ml)
                        this.sprite.gotoAndPlay(ml);
                }
                else if (this.direction == 'u' && map[Math.floor(down - 1)][Math.floor(left)] == 1 && map[Math.floor(down - 1)][Math.floor(right)] == 1) {
                    this.y -= this.speed * 2;
                    if (this.sprite.currentAnimation != ml)
                        this.sprite.gotoAndPlay(ml);
                }
                else if (this.direction == 'd' && map[Math.floor(up + 1)][Math.floor(left)] == 1 && map[Math.floor(up + 1)][Math.floor(right)] == 1){
                    this.y += this.speed * 2;
                    if (this.sprite.currentAnimation != ml)
                        this.sprite.gotoAndPlay(ml);
                }
                if (this.attack_animation_timer.getTick()) {
                    this.attack_animation = false;
                    this.cool = false;
                }
            }
        }
    },
    draw: function(status){
      if (status=="default"){
          this.sprite.graphics.beginFill("#00ff00").drawRect(0, 0, SIZE, SIZE);
      }
    }
};