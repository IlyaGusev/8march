var game, loader;
var key = KeyboardJS;
var mySound = new buzz.sound( "res/Sounds/Menu1", {
    formats: [ "mp3" ]
});
function MainMenuSetup() {
	var b = [];
	for (var i = 0; i < 7; ++i) {
		b[i] = document.getElementById('ch_'+i);
        b[i].addEventListener ("click", start_load, false);
        b[i].myparam = i;
	}

    function start_load(event) {
        var manifest = [
                {src: "res/Images/sprites.png", id: "sprites"},
                {src: "res/Images/MainAnna.png", id: "anna"},
                {src: "res/Images/MainNadya.png", id: "nad"},
                {src: "res/Images/MainNastya.png", id: "anata"},
                {src: "res/Images/MainDinara.png", id: "din"},
                {src: "res/Images/MainKate.png", id: "kate"},
                {src: "res/Images/MainKsu.png", id: "ksu"},
                {src: "res/Images/MainRita.png", id: "rita"},
                {src: "res/Images/floor.png", id: "floor"},
                {src: "res/Images/wallU.png", id: "wallU"},
                {src: "res/Images/wallD.png", id: "wallD"},
                {src: "res/Images/wallL.png", id: "wallL"},
                {src: "res/Images/wallR.png", id: "wallR"},
                {src: "res/Images/wallDL.png", id: "wallDL"},
                {src: "res/Images/wallDR.png", id: "wallDR"},
                {src: "res/Images/wallUD.png", id: "wallUD"},
                {src: "res/Images/wallURD.png", id: "wallURD"},
                {src: "res/Images/wallULD.png", id: "wallULD"},
                {src: "res/Images/wallULs.png", id: "wallULs"},
                {src: "res/Images/wallDLs.png", id: "wallDLs"},
                {src: "res/Images/wallURs.png", id: "wallURs"},
                {src: "res/Images/wallDRs.png", id: "wallDRs"},
                {src: "res/Images/wallUsR.png", id: "wallUsR"},
                {src: "res/Images/wallUsL.png", id: "wallUsL"},
                {src: "res/Images/guy_door.png", id: "guy"},
                {src: "res/Images/roof.png", id: "roof"},
                {src: "res/Images/stairsBL.png", id: "stairsBL"},
                {src: "res/Images/stairsBR.png", id: "stairsBR"},
                {src: "res/Images/stairsUL.png", id: "stairsUL"},
                {src: "res/Images/stairsUR.png", id: "stairsUR"},
                {src: "res/Images/stairsBLr.png", id: "stairsBLr"},
                {src: "res/Images/stairsBRr.png", id: "stairsBRr"},
                {src: "res/Images/stairsULr.png", id: "stairsULr"},
                {src: "res/Images/stairsURr.png", id: "stairsURr"},
                {src: "res/Images/FSB.png", id: "FSB"},
                {src: "res/Images/FST.png", id: "FST"},
                {src: "res/Images/FSBr.png", id: "FSBr"},
                {src: "res/Images/FSTr.png", id: "FSTr"},
                {src: "res/Images/food.png", id: "food"},
                {src: "res/Images/ball.png", id: "ball"},
            {src: "res/Images/bullet.png", id: "bullet"},
                 {src: "res/Images/wave.png", id: "wave"},
                {src: "res/Images/flower.png", id: "flower"}
            ];
        loader = new createjs.LoadQueue(false);

        loader.addEventListener("complete", start);
        loader.loadManifest(manifest);
        loader.myparam = event.target.myparam;
    }

    function start(event){
        mySound.stop();
        document.getElementById("start-screen").style.display = 'none';
        document.getElementById("game-screen").style.display = "block";
        game = new Game(event.target.myparam);
    }
}
function MainMenuExec(){
   mySound.play().loop();
    document.getElementById ("game-screen").style.display = 'none';
    document.getElementById("start-screen").style.display = 'block';
}
MainMenuSetup();
MainMenuExec();
