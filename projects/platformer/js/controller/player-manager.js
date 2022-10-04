/* global Phaser */
(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
        
    opspark.createPlayerManager = function (player, game) {
        let 
            cursors, 
            asset = player.asset;
        
        cursors = game.cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addCallbacks(this, onDown, onUp, onPress);

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        var aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        function onDown() {
            
        }
        
        function onUp() {
            player.stop();
        }
        
        function onPress() {
            
        }
        
        /* 
        // Fire on Spacebar Code:
        
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        var fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        fireKey.onDown.add(fire, player.asset);
        
        function fire() {
            console.log('playerManager says to fire!');
            player.fire();
        }
        */
        
        function update() {
            // todo : fix states to include velocity or keyup/cursorLeft //
            if (asset.body && player.getStateName() !== 'flyingJump') asset.body.velocity.x = 0;
            if (cursors.left.isDown || aKey.isDown) {
                player.setDirection(-1);
                player.run();
            } else if (cursors.right.isDown || dKey.isDown) {
                player.setDirection(1);
                player.run();
            } else if (cursors.down.isDown || sKey.isDown) {
                player.duck();
            } else {}
            
            //  Allow the player to jump if they are touching the ground.
            if ((cursors.up.isDown || wKey.isDown) && asset.body.touching.down) {
                player.flyingJump();
            }
        }
        
        return {
            update: update
        };
    };
    
})(window);