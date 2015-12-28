function Trap(regX, regY){
    this.regX = regX || SIZE*5;
    this.regY = regY || 120;
    this.init();
}
Trap.prototype = {
    init : function(){
        this.sprite = new createjs.Bitmap(loader.getResult("food"));
        this.centerX = this.sprite.x + SIZE/2;
        this.centerY = this.sprite.y + SIZE/2;
        this.done = false;
        this.sprite.visible = true;
        this.dist = 300;
        this.added = false;
        this.attack_animation_timer = new Metronome(0, 8000);
    },

    update: function(camera_x, camera_y, dt){
        if (!this.done) {
            this.sprite.x = this.regX + camera_x;
            this.sprite.y = this.regY + camera_y;
            this.centerX = this.sprite.x + SIZE/2;
            this.centerY = this.sprite.y + SIZE/2;

            this.attack_animation_timer.update(dt);
            if (this.attack_animation_timer.getTick())
                this.done = true;
        }
        else{
            this.sprite.visible = false;
        }
    }
};