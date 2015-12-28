function Bullet(regX, regY, direction, char_id){
    this.regX = regX || SIZE*5;
    this.regY = regY || 120;
    this.id = char_id;
    this.direction = direction || 'd';
    this.init();
}
Bullet.prototype = {
    init : function(){
        if (this.id == 'rita'){
            this.data = {
                images: [loader.getResult("ball")],
                frames: {width:SIZE, height:SIZE},
                animations: {
                    move: {
                        frames: [0],
                        speed: 0.2
                    }
                }
            };
            this.sprites = new createjs.SpriteSheet(this.data);
            this.sprite = new createjs.Sprite(this.sprites, "move");
        }
        else if (this.id == 'nad'){
            this.data = {
                images: [loader.getResult("wave")],
                frames: {width:SIZE, height:SIZE},
                animations: {
                    move: {
                        frames: [0],
                        speed: 0.4
                    }
                }
            };
            this.sprites = new createjs.SpriteSheet(this.data);
            this.sprite = new createjs.Sprite(this.sprites, "move");
        }
        else if (this.id == 'ksu'){
            this.data = {
                images: [loader.getResult("bullet")],
                frames: {width:SIZE, height:SIZE},
                animations: {
                    move: {
                        frames: [0],
                        speed: 0.4
                    }
                }
            };
            this.sprites = new createjs.SpriteSheet(this.data);
            this.sprite = new createjs.Sprite(this.sprites, "move");
        }
        else {
            var rect = new createjs.Shape();
            rect.graphics.beginFill("#aaaaa0").drawRect(0, 0, SIZE, SIZE);
            this.sprite = rect;
            this.centerX = this.sprite.x + SIZE / 2;
            this.centerY = this.sprite.y + SIZE / 2;
        }

        this.done = false;
        this.sprite.visible = true;
        this.speed = 15;
        this.dist = 300;
        this.added = false;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        if (this.direction == 'd')
            this.dy = this.speed;
        if (this.direction == 'u')
            this.dy = -this.speed;
        if (this.direction == 'l')
            this.dx = -this.speed;
        if (this.direction == 'r')
            this.dx = this.speed;
    },

    update: function(camera_x, camera_y, map, dt){
        if (!this.done) {
            this.sprite.x = this.regX + this.x + camera_x;
            this.sprite.y = this.regY + this.y + camera_y;
            this.centerX = this.sprite.x + SIZE/2;
            this.centerY = this.sprite.y + SIZE/2;

            var up = (this.regY + this.y) / SIZE;
            var left = (this.regX + this.x) / SIZE;
            var down = (this.regY + this.y + 59) / SIZE;
            var right = (this.regX + this.x + 59) / SIZE;
            if ((this.direction == 'd' && map[Math.floor(up + 1)][Math.floor(left)] == 1 && map[Math.floor(up + 1)][Math.floor(right)] == 1) ||
                (this.direction == 'u' && map[Math.floor(down - 1)][Math.floor(left)] == 1 && map[Math.floor(down - 1)][Math.floor(right)] == 1))
                this.y += this.dy;

            else if ((this.direction == 'l' && map[Math.floor(up)][Math.floor(right - 1)] == 1 && map[Math.floor(down)][Math.floor(right - 1)] == 1) ||
                (this.direction == 'r' && map[Math.floor(up)][Math.floor(left + 1)] == 1 && map[Math.floor(down)][Math.floor(left + 1)] == 1))
                this.x += this.dx;
            else
                this.done = true;

            if (this.y >= this.dist || this.x >= this.dist || this.y <= -this.dist || this.x <= -this.dist)
                this.done = true;
        }
        else{
            this.sprite.visible = false;
        }
    }
};