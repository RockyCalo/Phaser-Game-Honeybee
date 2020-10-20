



Honeybee.Preload = function() {
	this.ready = false;
};

Honeybee.Preload.prototype = {
   preload: function (){

      this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY,'logo');
      this.splash.anchor.setTo(0.5);

      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128,'preloadbar');
      this.preloadBar.anchor.setTo(0.5);

      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('ground',  'assets/images/ground.png');
      this.load.image('background', 'assets/images/background.png');
      this.load.image('foreground',  'assets/images/foreground.png');
      this.load.image('bomb',           'assets/images/bomb.png');
      this.load.image('nuclear',            'assets/images/nuclear.png');             

      this.load.spritesheet('honeys', 'assets/images/honeys-ps.png',51,51, 7);
      this.load.spritesheet('player',  'assets/images/bear-ps.png',229,296, 4);
      this.load.spritesheet('bees',         'assets/images/bee-ps.png',   461, 218, 4);   
    
      this.load.audio('gameMusic', 'assets/audio/classical.mp3');  
      this.load.audio('buzz', 'assets/audio/buzz.wav');
      this.load.audio('bounce', 'assets/audio/bounce.wav');
      this.load.audio('honey', 'assets/audio/honey.wav');
      this.load.audio('gameover',  'assets/audio/gameover.wav');
      this.load.audio('bees', 'assets/audio/bees.wav');
      this.load.audio('bomb',    'assets/audio/bomb.wav');
      this.load.audio('nuclear',    'assets/audio/nuclear.wav');
      this.load.audio('shout',  'assets/audio/shout.wav');
      this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');
     
       this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    creat: function(){
     this.preloadBar.cropEnabled = false;
     },
     update: function(){
       if(this.cache.isSoundDecoded('gameMusic') && this.ready === true){
          this.state.start('MainMenu');
        }
     },
     onLoadComplete: function(){
       this.ready =true;
     }     
    }; 