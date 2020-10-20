
var Enemy = function(game, x, y, key, frame) { 
  key = 'bee';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(0.1);
  this.anchor.setTo(0.5);

  this.animations.add('fly');

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;

  this.onOutofBoundsKill = true;

  this.events.onRevived.add(this.onRevived, this);

}; 

var Enemy = function(game, x, y, key, frame){    // the enemies will rotate 360 the motion
  key = 'bees';
  Phaser.Sprite.call(this, game, x, y, key, frame);


  this.scale.setTo(0.1);
  this.anchor.setTo(0.5);

  this.animations.add('fly');

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;

  this.onOutofBoundsKill = true;

  this.events.onRevived.add(this.onRevived, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {

	this.game.add.tween(this).to({x: this.x - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

	this.body.velocity.x = -400;
	this.animations.play('fly', 10, true);    
};


//// rocky  

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {

  this.game.add.tween(this).to({x: this.y - 16}, 2000, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);  ////rocky  ,,,, speed 400

  this.body.velocity.x = -400;
  this.animations.play('fly', 10, true);


};



