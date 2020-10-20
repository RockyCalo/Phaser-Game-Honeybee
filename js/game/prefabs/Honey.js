


var Honey = function(game, x, y, key, frame) {      ////// honey bottle
	key = 'honeys';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.scale.setTo(0.5);
	this.anchor.setTo(0.5);

	this.animations.add( 'spin' ); 

	this.game.physics.arcade.enableBody(this); //enable physics
	this.body.allowGravity = false; // not allow the honeybote to fall down sa ground

	this.checkWorldBounds = true; // Phaser will check if honeybottle is inside the gameworld or not
	this.onOutOfBoundsKill = true; 

	this.events.onKilled.add(this.onKilled, this); 
	this.events.onRevived.add(this.onRevived, this);

};

 //standard javascript inheritance
 Honey.prototype = Object.create(Phaser.Sprite.prototype);
 Honey.prototype.constructor = Honey;

 Honey.prototype.onRevived = function(){
 	this.body.velocity.x = -300; //horizontal speed of the honeybottle so that the bottle will see like spin
 	this.animations.play('spin', 10, true); // spin animation at 10fps perfect spin for me
 };
 
 Honey.prototype.onKilled = function (){
  this.animations.frame = 0; //the honeybottle will face the screen when it spin it has a motion
 };  	

