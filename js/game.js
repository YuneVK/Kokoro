let Game = {
  kokoro: null,
  enemies: [],

  init: function() {
    Stage.createScenary();
    Stage.createWorld();
    Stage.setListeners();
    this.kokoro = new Kokoro(Stage.scene);
    this.kokoro.addToScene();

    this.enemies = Stage.generateEnemies();

    this.render();
  }, 

  render: function() {
    this.kokoro.render();
    
    this.enemies.forEach(function (enemy) {
      enemy.draw();
    }.bind(this));
    
    Stage.renderScenary();
    
    if (this.kokoro.isColisioned) {
      this.kokoro.counterColisioned++;
      
      if (this.kokoro.counterColisioned % this.kokoro.timeColisioned === 0 && this.kokoro.lives > 0) {
        this.kokoro.isColisioned = false;
        this.kokoro.counterColisioned = 0;
      }
    } else {
      this.kokoro.moveWings();
      this.checkCollision();
    }
    
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

  checkCollision: function() {
    this.enemies.forEach(function(enemy) {
      var enemyPos =  enemy.model.mesh.localToWorld(new THREE.Vector3());
      var kokoroPos = this.kokoro.model.mesh.position;
  
      var diffX = Math.abs(kokoroPos.x - enemyPos.x);
      var diffY = Math.abs(kokoroPos.y - enemyPos.y);
  
      if (diffX < 20 && diffY < 20) {
        this.kokoro.collisioned();
        this.kokoro.isColisioned = true;
        this.kokoro.lives--;
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
    this.render();
  }, 

}