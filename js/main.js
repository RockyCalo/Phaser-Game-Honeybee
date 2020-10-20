



var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', Honeybee.Boot);
game.state.add('Preloader', Honeybee.Preload);
game.state.add('MainMenu', Honeybee.MainMenu);
game.state.add('Game', Honeybee.Game);

game.state.start('Boot');

