

Honeybee.Game = function () {
  this.playerMinAngle = -20;  //minimum player rotation
  this.playerMaxAngle = 20;  // maximum player rotation

  this.honeyRate = 1000;    //  mag generate ang bote sa honey 1000ms
  this.honeyTimer = 0;       ///   mag create ang bote sa honeybote every game or loop 

  this.enemyRate = 500;   // this will spawn bee senemy every 500 ms
  this.enemyTimer = 0;
  this.bombTime = 0;
  this.nuclearTime = 0;
  this.score = 0;
  this.kill= 0;
};

Honeybee.Game.prototype = { //extend the Game method prototype
	create: function(){
		
		this.background = this.game.add.tileSprite(0,0, this.game.width, 512, 'background');        
        this.background.autoScroll(-100,0);

        this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height - 533, 'foreground');
        this.foreground.autoScroll(-100, 0);

        this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
        this.ground.autoScroll(-400, 0);

        this.player = this.add.sprite(200, this.game.height/2, 'player');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.3);

        this.player.animations.add('fly', [0,1,2,3,2,1]);
        this.player.animations.play('fly', 8, true);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;

        this.game.physics.arcade.enableBody(this.ground); //  gravity to the ground 
        this.ground.body.allowGravity = false;  /// the gravity in the ground is not affected 
        this.ground.body.immovable = true; // this will keep the ground stay in play

        this.game.physics.arcade.enableBody(this.player); // apply physics to our player
        this.player.body.collideWorldBounds = true; // mahulog ang player mawala sa screen kung dili i-enable
        this.player.body.bounce.set(0.25); // player  bounce when it runs to to much tama tama lng
      
        this.enemies = this.game.add.group();        
        this.honeys = this.game.add.group();    
        this.enemies = this.game.add.group();
        this.bombs = game.add.group();          /// controls of bombs spacebar key
        this.nuclears = game.add.group();
        this.nuclears.enableBody = true;     /// controls of nulcear bomb is TAB key 
        this.bombs.enableBody = true;
        
              

          /// ma enable ang physics sa bomb to fire

        this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
        this.nuclears.physicsBodyType = Phaser.Physics.ARCADE;
       
        this.bombs.createMultiple(1,'bomb'); // shoot the bomb single shoot
        this.bombs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBomb, this);
        this.bombs.setAll('checkWorldBounds', true);     

        this.nuclears.createMultiple(1,'nuclear');
        this.nuclears.callAll('events.onOutOfBounds.add',  'events.onOutOfBounds', this.resetNuclear, this);
        this.nuclears.setAll('checkWorldBounds', true);


       
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.TABKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);  /// tab key controls
   
        // add text to upper left with font details
        this.scoreText = this.game.add.bitmapText(10,10, 'minecraftia',  'Score: 0', 24);
        this.killText = this.game.add.bitmapText(50,50, 'minecraftia', 'kill: 0', 24);


        this.jetSound = this.game.add.audio('buzz');
        this.honeySound = this.game.add.audio('honey');
        this.gameoverSound = this.game.add.audio('gameover');  
        this.gameMusic = this.game.add.audio('gameMusic');
        this.beeSound = this.game.add.audio('bees');  //// bees audio is always in the game so that you can feel the bees
        this.bombSound = this.game.add.audio('bomb'); 
        this.nuclearSound = this.game.add.audio('nuclear');    // audio 2 by nuclear
        this.shoutSound = this.game.add.audio('shout');        ///  shout noise
        this.gameMusic.play('', 0, true);


    },
        update: function(){
           if(this.game.input.activePointer.isDown) { // active pointer can be a mouse  or touch movement 
              this.player.body.velocity.y -= 25; // this will move our player to the upward motion
              }

               if( this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown){ // change player angle if we are trying to move it up
                   if(this.player.angle > 0) {
                      this.player.angle = 0; // reset angle
                    }
                    if(this.player.angle > this.playerMinAngle){
                       this.player.angle -= 0.5; // lean backward
                    }
                } else if(this.player.body.velocity.y >=0 && ! this.game.input.activePointer.isDown){ //
                  if(this.player.angle < this.playerMaxAngle){
                     this.player.angle += 0.5;// lean forward
                  }
                }

                if(this.honeyTimer < this.game.time.now){
                   this.createHoney();  ///// create another bote of honey
                   this.honeyTimer = this.game.time.now + this.honeyRate; // increment the honey
                }

                if(this.enemyTimer < this.game.time.now) {
                   this.createEnemy();
                   this.enemyTimer = this.game.time.now + this.enemyRate;
                }
                
                if(this.spaceKey.isDown){
                   this.fireBomb(); ////// mo buto ang bomb towards to enemy controls of this spacebar
                }


                 if(this.TABKey.isDown){            /// the Nuclear bomb keys jus press TAB key
                    this.fireNuclear();      /// press TAB key for fire the nuclear bomb that has message
                 }

                  this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);

                   // this will check when player and honey bote overlap, refer to honeyhit function below
                   this.game.physics.arcade.overlap(this.player, this.honeys, this.honeyHit, null, this);  

                   // this will check when player and enemy overlap, refer to enemyHit function below
                   this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);

                   this.game.physics.arcade.overlap(this.enemies, this.bombs, this.enemyShot, null, this);  //  will hit the bees
                   
                   this.game.physics.arcade.overlap(this.enemies, this.nuclears, this.enemyfire, null, this);  /// bomb number 2 which is the nuclear bomb that has a message to us people in this planet
          
                 },

                  shutdown: function() {
                  	  this.honeys.destroy();
                  	  this.enemies.destroy();
                       this.bombs.destroy();
                        this.nuclears.destroy();
                  	   this.score = 0;
                  	   this.honeyTimer = 0;
                  	   this.enemyTimer = 0;
                       this.kill = 0;


                  },
                  
                  createHoney: function(){                // honey bottle 
                  	var x = this.game.width; // x position
                    var y = this.game.rnd.integerInRange(50, this.game.world.height - 192); 

                  	var honey = this.honeys.getFirstExists(false);        
                  	if(!honey){                                         
                  	   honey = new Honey(this.game, 0, 0); //x,y
                  		this.honeys.add(honey); //add honey bote if not exist     
                  	}
                  	
                  	honey.reset(x,y); // set the sprite bee 
                  	honey.revive();
                
                 },
                  createEnemy: function() {
                   var x = this.game.width;
                   var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);

                   var enemy = this.enemies.getFirstExists(false);
                   if(!enemy) {
                      enemy = new Enemy(this.game, 0, 0);
                      this.enemies.add(enemy);
                    }
                    enemy.reset(x, y);
                    enemy.revive();
                    this.beeSound.play(); /// bees always play audio

                   },

                  

                  fireBomb:function(){   ///sprite has a bomb
                         if(this.game.time.now > this.bombTime){           ////bomb number 1 the key is spacebar
                             bomb = this.bombs.getFirstExists(false)          
                            
                           if (bomb){                                               
                              bomb.reset(this.player.x + 6, this.player.y - 8);     /// pa upper ang bomb x axis
                              bomb.body.velocity.x = 6000      ///10000 I try but to fast the sprite will not see                      
                              
                            }
                          }                 
                  },
                    
                   fireNuclear:function(){
                             if(this.game.time.now > this.nuclearTime){           //// bomb2 which the big nuclear the key is TAB and this bomb has a message
                                nuclear = this.nuclears.getFirstExists(false)         ///  but once you press the nuclear key or TAB key it late explode like a true bomb latency audio 10seconds

                               if(nuclear){
                                   nuclear.reset(this.player.x + 6, this.player.y - 8);
                                   nuclear.body.velocity.x = 400
                                   var str = "fireNuclear";      
                                   var res = str.split("")        
                                   
                                }  

                             }
                   },

                  
                  groundHit: function(player, ground){
                      player.body.velocity.y = -300; //bounce the player when hit the ground 
                   
                   },
                   honeyHit: function(player, honey) {     
                      this.score++; // increase the score
                      this.honeySound.play();  //play the honey sound when player hits the honey, no need to loop // 
                      honey.kill(); // hide the  bote of honey
                      this.scoreText.text = 'Score: HONEYBOTTLE:' + this.score; // will update the score and honeybottle that the player hit
                      

                      var dummyHoney = new Honey(this.game, honey.x, honey.y);    ////// kuha ang position sa bote sa honey 
                      this.game.add.existing(dummyHoney);

                      dummyHoney.animations.play('spin', 40, true);          /// animation when the honey get hit, "animation name", 'speed', 'loop'  balik ang bote sa honey 


                      // transition to upper left when the honey bote get hit
                      var scoreTween = this.game.add.tween(dummyHoney).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

                      scoreTween.onComplete.add(function()  {
                      	dummyHoney.destroy();    // destroy honey     mawala ang bote sa honey 
                      	this.scoreText.text = 'Score:' + this.score;     ///show the score when the honeybottle flies towards upper left
                      }, this);

                   },
                   enemyHit: function(player, enemy){
                     player.kill(); // will kill the player
                     enemy.kill();     // will kill the enemy     
                     enemy.kill();     /// enemy2                       
                     

                     this.shoutSound.play();           ///// play shout if it is gameover ,,, 
                     this.gameoverSound.play();       /// play the death sound when the player hit the enemy
                     this.gameMusic.stop();        // end the game music

                     this.ground.stopScroll();       // will stop ground from scrolling
                     this.background.stopScroll();   // will stop background from scrolling
                     this.foreground.stopScroll();    // will stop foreground from scrolling

                     this.enemies.setAll('body.velocity.x', 0); // we stop enemies from moving forward
                     this.honeys.setAll('body.velocity.x', 0);  // the same with honeybottle 

                     this.enemyTimer = Number.MAX_VALUE; // stop generating bees
                     this.honeyTimer = Number.MAX_VALUE;   // stop generating honeybottle timer 

                     var scoreboard = new Scoreboard(this.game);
                     scoreboard.show(this.score);

                   },

                   resetBomb: function(bomb){              //// bomb1 key spacebar
                              bomb.kill();
                             this.bombSound.play();             /// audio will play if you press the key that designated controls key this one spacebar
                   },

                   resetNuclear: function(nuclear){                   /// bomb2 TAB key
                                  nuclear.kill();                      
                                  this.nuclearSound.play();        /// play the audio if press the Tab key


                   },

                   enemyShot: function(bomb, enemy){
                    this.score+=2;
                    this.kill++;
                    this.honeySound.play();   ///// honeybottle audio
                    bomb.kill();
                    enemy.kill();
                    this.scoreText.text = 'Score: ' + this.score;
                    this.killText.text = 'killedbee: ' + this.kill; /// this text if no one will kill the display is "kill" once if there is killed bee already it will display "killedbee".
                   },
                       
                   
                   enemyfire: function(nuclear, enemy){
                    this.score+=2;
                    this.kill++;
                    nuclear.kill();
                    enemy.kill();
                    this.scoreText.text = 'Score: ' + this.score;
                    this.killText.text = 'killedbee: ' + this.kill;
                   }

                
                  };

                   



