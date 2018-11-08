let Animations = {
  toNight: function(scene) {
    scene.fog = new THREE.Fog(0x212b48, 100, 950);
    
    Utils.addClass(document.querySelector('div.night'), 'fadeIn');
    Utils.addClass(document.querySelector('div.info'), 'dark');

    GameConfig.materials.kokoro.body.color.setHex(0xfefaed);
    GameConfig.materials.kokoro.wings.color.setHex(0xfefaed);
    GameConfig.materials.kokoro.eyes.pupile.color.setHex(0xfefaed);
    GameConfig.materials.kokoro.eyes.iris.color.setHex(0x212121);

    GameConfig.materials.ground.color.setHex(0x00392c);

    GameConfig.materials.lives.color.setHex(0xfafafa);

    Game.enemies.forEach(function(enemy) {
      enemy.model.ringTop.material.color.setHex(0xf0ed0f);
      enemy.model.ball.material.color.setHex(0xf0ed0f);
    })
  },

  toDay: function(scene) {
    scene.fog = new THREE.Fog(0xE0FFFE, 100, 950);

    Utils.addClass(document.querySelector('div.night'), 'fadeOut');
    Utils.removeClass(document.querySelector('div.night'), 'fadeIn');
    Utils.removeClass(document.querySelector('div.info'), 'dark');

    GameConfig.materials.kokoro.body.color.setHex(0x212121);
    GameConfig.materials.kokoro.wings.color.setHex(0x212121);
    GameConfig.materials.kokoro.eyes.pupile.color.setHex(0x212121);
    GameConfig.materials.kokoro.eyes.iris.color.setHex(0xfefaed);

    GameConfig.materials.ground.color.setHex(0xadd370);

    GameConfig.materials.lives.color.setHex(0xfe3500);

    Game.enemies.forEach(function(enemy) {
      enemy.model.ringTop.material.color.setHex(0x880E4F);
      enemy.model.ball.material.color.setHex(0x880E4F);
    })
  }
}