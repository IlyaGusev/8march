function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var SIZE = 60;
function World(char_id){
    this.char = new Character(char_id);
    this.init();
}
World.prototype = {
    init : function(){
        this.gameOver = false;
        this.map =
            [   [0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0],
                [0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 10, 6, 6, 0, 0, 0],
                [0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0],
                [0, 0, 0, 6, 2, 1, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 1, 2, 6, 0, 0, 0],
                [0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0],
                [0, 0, 0, 6, 2, 1, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 1, 2, 6, 0, 0, 0],
                [0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 6, 6, 0, 0, 0],
                [0, 0, 0, 6, 2, 1, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 1, 2, 6, 0, 0, 0],
                [0, 0, 0, 6, 6, 1, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 1, 6, 6, 0, 0, 0],
                [0, 0, 0, 6, 2, 1, 3, 4, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 12, 11, 1, 2, 6, 0, 0, 0],
                [6, 6, 6, 6, 6, 1, 7, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 13, 1, 6, 6, 6, 6, 6],
                [6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6],
                [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
                [6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6],
                [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]];

        this.overmap =
            [   [0, 0, 0, 0, 5, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 7, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 10, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 9, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0],
                [5, 1, 1, 1, 9, 0, 11, 12, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 12, 13, 0, 10, 1, 1, 1, 7],
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        this.objects = [];
        this.enemies = [];
        this.bullets = [];
        this.traps = [];
        for (var i=0; i<this.map.length; i++){
            for (var j=0; j<this.map[i].length; j++){
                if (this.map[i][j]!=0) {
                    var rect = new createjs.Shape();
                    rect.graphics.beginFill("#ffca86").drawRect(0, 0, 60, 60);
                    if (this.map[i][j] == 6 || this.map[i][j] == 2) {
                        rect = new createjs.Shape();
                        rect.graphics.beginFill("#ffca86").drawRect(0, 0, 60, 60);
                    }
                    if (this.map[i][j] == 1 || this.map[i][j] == 10)
                        rect = new createjs.Bitmap(loader.getResult("floor"));
                    if (this.map[i][j] == 3)
                        rect = new createjs.Bitmap(loader.getResult("stairsBL"));
                    if (this.map[i][j] == 4)
                        rect = new createjs.Bitmap(loader.getResult("stairsBR"));
                    if (this.map[i][j] == 7)
                        rect = new createjs.Bitmap(loader.getResult("stairsUL"));
                    if (this.map[i][j] == 8)
                        rect = new createjs.Bitmap(loader.getResult("stairsUR"));
                    if (this.map[i][j] == 11)
                        rect = new createjs.Bitmap(loader.getResult("stairsBLr"));
                    if (this.map[i][j] == 12)
                        rect = new createjs.Bitmap(loader.getResult("stairsBRr"));
                    if (this.map[i][j] == 13)
                        rect = new createjs.Bitmap(loader.getResult("stairsULr"));
                    if (this.map[i][j] == 14)
                        rect = new createjs.Bitmap(loader.getResult("stairsURr"));
                    if (i==9 && j==5)
                        rect = new createjs.Bitmap(loader.getResult("FST"));
                    if (i==10 && j==5)
                        rect = new createjs.Bitmap(loader.getResult("FSB"));
                    if (i==9 && j==31)
                        rect = new createjs.Bitmap(loader.getResult("FSTr"));
                    if (i==10 && j==31)
                        rect = new createjs.Bitmap(loader.getResult("FSBr"));
                    rect.x = j * SIZE;
                    rect.y = i * SIZE;
                    rect.i = i;
                    rect.j = j;
                    this.objects.push(rect);


                    if (this.overmap[i][j]!=0) {
                        rect = new createjs.Shape();
                        rect.graphics.beginFill("#ffca86").drawRect(0, 0, 60, 60);
                        if (this.overmap[i][j] == 1)
                            rect = new createjs.Bitmap(loader.getResult("wallU"));
                        if (this.overmap[i][j] == 2)
                            rect = new createjs.Bitmap(loader.getResult("wallR"));
                        if (this.overmap[i][j] == 3)
                            rect = new createjs.Bitmap(loader.getResult("wallL"));
                        if (this.overmap[i][j] == 4)
                            rect = new createjs.Bitmap(loader.getResult("wallD"));
                        if (this.overmap[i][j] == 5)
                            rect = new createjs.Bitmap(loader.getResult("wallULs"));
                        if (this.overmap[i][j] == 6)
                            rect = new createjs.Bitmap(loader.getResult("wallDLs"));
                        if (this.overmap[i][j] == 7)
                            rect = new createjs.Bitmap(loader.getResult("wallURs"));
                        if (this.overmap[i][j] == 8)
                            rect = new createjs.Bitmap(loader.getResult("wallDRs"));
                        if (this.overmap[i][j] == 9)
                            rect = new createjs.Bitmap(loader.getResult("wallDR"));
                        if (this.overmap[i][j] == 10)
                            rect = new createjs.Bitmap(loader.getResult("wallDL"));
                        if (this.overmap[i][j] == 11)
                            rect = new createjs.Bitmap(loader.getResult("wallULD"));
                        if (this.overmap[i][j] == 12)
                            rect = new createjs.Bitmap(loader.getResult("wallUD"));
                        if (this.overmap[i][j] == 13)
                            rect = new createjs.Bitmap(loader.getResult("wallURD"));
                        if (this.overmap[i][j] == 14)
                            rect = new createjs.Bitmap(loader.getResult("wallUsL"));
                        if (this.overmap[i][j] == 15)
                            rect = new createjs.Bitmap(loader.getResult("wallUsR"));
                        rect.x = j * SIZE;
                        rect.y = i * SIZE;
                        rect.i = i;
                        rect.j = j;
                        this.objects.push(rect);
                    }
                }

                if (this.map[i][j]==2){
                    var ch_ud = 'u';
                    var ch_rl = 'r';
                    if ((getRandomInt(0, 1))==1) {
                        ch_ud = 'd';
                        ch_rl = 'l';
                    }
                    if (this.map[i+1][j]==1)
                        this.enemies.push(new Enemy(j * SIZE, (i + 1) * SIZE, ch_rl, 'u'));
                    if (this.map[i-1][j]==1)
                        this.enemies.push(new Enemy(j*SIZE, (i-1)*SIZE, ch_rl, 'd'));
                    if (this.map[i][j+1]==1)
                        this.enemies.push(new Enemy((j+1)*SIZE, i*SIZE, ch_ud, 'l'));
                    if (this.map[i][j-1]==1)
                        this.enemies.push(new Enemy((j-1)*SIZE, i*SIZE, ch_ud, 'r'));
                }
            }
        }
    },

    update: function(dt){
        if (parseInt(this.char.counter.text)<10) {
            var i = 0;
            var dx = this.char.xView - this.char.x;
            var dy = this.char.yView - this.char.y;
            this.char.update(this.map, dt);
            if (this.char.attack) {
                this.bullets.push(new Bullet(this.char.sprite.x - dx, this.char.sprite.y - dy, this.char.direction, this.char.id));
            }
            if (this.char.casted) {
                this.traps.push(new Trap(this.char.sprite.x - dx, this.char.sprite.y - dy));
            }
            for (i = 0; i < this.objects.length; i++) {
                var rect = this.objects[i];
                this.objects[i].x = rect.j * SIZE + dx;
                this.objects[i].y = rect.i * SIZE + dy;
                if (rect.x < 900 && rect.x > -SIZE && rect.y > -SIZE && rect.y < 900)
                    this.objects[i].visible = true;
                else
                    this.objects[i].visible = false;
            }

            for (i = 0; i < this.bullets.length; i++)
                this.bullets[i].update(dx, dy, this.map, dt);
            for (i = 0; i < this.traps.length; i++)
                this.traps[i].update(dx, dy, dt);
            for (i = 0; i < this.enemies.length; i++)
                this.enemies[i].update(dx, dy, this.map, this.char, this.bullets, this.traps, dt);
        }
        else{
            this.gameOver = true;
        }

    }
};