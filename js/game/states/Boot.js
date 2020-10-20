var Honeybee = function() {};

Honeybee.Boot = function() {};

Honeybee.Boot.prototype = {       ////assets will boot 
	preload: function(){
	   this.load.image('logo', 'assets/images/logo.png');
	   this.load.image('preloadbar', 'assets/images/preloader-bar.png');
},
create: function(){
  this.game.stage.backgroundColor = '#fff';


  this.input.maxPointers = 1;

  if (this.game.device.desktop){

  this.scale.pageAlignHorizontally = true;
  } else{


  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = 568;
  this.scale.minHeight = 600;
  this.scale.maxWidth = 2048;
  this.scale.maxHeight = 1536;
  this.scale.forceLandscape = true;
  this.scale.pageAlignHorizontally = true;
  this.scale.setScreensize(true);
}



this.state.start('Preloader');
}
};
