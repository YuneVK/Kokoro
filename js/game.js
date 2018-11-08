let Game = {
  kokoro: null,
  enemies: [],

  init: function() {
    Stage.createScenary();
    Stage.createWorld();
    Stage.setListeners();

    Sounds.init();
    Sounds.music.play();

    this.kokoro = new Kokoro(Stage.scene);
    this.kokoro.addToScene();

    this.enemies = Stage.generateEnemies();
    this.lives = Stage.generateLives();

    this.render();
  }, 

  render: function() {
    if (Stage.score === 0.1) {
      Utils.addClass(document.querySelector('div.loading'), 'hidden');
      Utils.removeClass(document.querySelector('div.info'), 'hidden');
    }
    //console.log(Stage.sky.island.object)
    if (Stage.island.object !== undefined) {
      Stage.island.render();
    }

    //Stage.island.render();

    //if (Stage.sky.island.object) Stage.sky.island.render();

    Stage.checkDay();
    Stage.checkVelocity();
    
    Stage.ground.move();
    
    this.kokoro.render();
    
    this.enemies.forEach(function (enemy) {
      enemy.draw();
    }.bind(this));

    this.lives.forEach(function (live) {
      live.draw();
    }.bind(this));
    
    Stage.renderScenary();
    
    if (this.kokoro.isCollisioned) {
      this.kokoro.counterColisioned++;
      
      if (this.kokoro.counterColisioned % this.kokoro.timeColisioned === 0 && this.kokoro.lives > 0) {
        

        this.kokoro.isCollisioned = false;
        this.kokoro.counterColisioned = 0;
      }
    } else {
      this.kokoro.moveWings();
      this.checkCollisionEnemy();
    }

    this.checkCollisionLive();
    
    Stage.updateDOMInfo();
  
    Stage.renderer.render(Stage.scene, Stage.camera);
    
    if (this.kokoro.lives > 0) {
      requestAnimationFrame(this.render.bind(this));
    } else {
      Stage.gameOver = true;
      Stage.showGameOverScreen();
      this.gameOver();
    }
  }, 

  checkCollisionEnemy: function() {
    this.enemies.forEach(function(enemy) {
      if (!enemy.isCollisioned) {
        var enemyPos =  enemy.model.mesh.localToWorld(new THREE.Vector3());
  
        var kokoroPos = this.kokoro.model.mesh.position;
    
        var diffX = Math.abs(kokoroPos.x - enemyPos.x);
        var diffY = Math.abs(kokoroPos.y - enemyPos.y);
    
        if (diffX < 20 && diffY < 20) {
          this.kokoro.collisioned();
          this.kokoro.isCollisioned = true;
          this.kokoro.lives--;
  
          enemy.isCollisioned = true;
          enemy.model.isExpanding = true;

          this.kokoro.lives > 0 ? Sounds.collision.play() : Sounds.death.play();
        }
      }
    }.bind(this))
  }, 

  checkCollisionLive: function() {
    this.lives.forEach(function(live) {
      if (!live.isCollisioned) {
        var livePos =  live.model.mesh.localToWorld(new THREE.Vector3());
  
        var kokoroPos = this.kokoro.model.mesh.position;
    
        var diffX = Math.abs(kokoroPos.x - livePos.x);
        var diffY = Math.abs(kokoroPos.y - livePos.y);
    
        if (diffX < 20 && diffY < 20) {
          if (Game.kokoro.lives < Game.kokoro.maxLives) Game.kokoro.lives++;

          live.isCollisioned = true;
          live.model.isExpanding = true;

          Sounds.live.play();
        }
      }
    }.bind(this))
  }, 

  gameOver: function() {
    this.kokoro.updatePosition(Stage.mousePos);

    Stage.renderer.render(Stage.scene, Stage.camera);
    if (Stage.gameOver) {
      requestAnimationFrame(this.gameOver.bind(this));
    }
  },

  reload: function() {
    Stage.hideGameOverScreen();
    Stage.reset();

    Sounds.reload.play();

    this.render();
  }, 

}