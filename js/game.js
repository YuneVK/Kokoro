function Game() {
  // Get the width and the height of the screen,
  // use them to set up the aspect ratio of the camera 
  // and the size of the renderer.
  this.HEIGHT = window.innerHeight;
  this.WIDTH = window.innerWidth;

  // Create the scene
  this.scene = null;
  this.createScene();

  this.camera = null;
  this.createCamera();

  this.renderer = null;
  this.createRenderer();

  // Add the DOM element of the renderer to the 
  // container we created in the HTML
  this.container = document.getElementById('world');
  this.container.appendChild(this.renderer.domElement);

  /* -------------------------------------- */
  /* -------------- CONTROLS -------------- */
  /* -------------------------------------- */
  // controls
  // controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.85;
  // controls.screenSpacePanning = false;
  // controls.minDistance = 10;
  // controls.maxDistance = 2000;
  // controls.maxPolarAngle = Math.PI / 2;
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */

  // Listen to the screen: if the user resizes it
  // we have to update the camera and the renderer size
  window.addEventListener('resize', this.handleWindowResize.bind(this), false);

  this.lights = new Lights(this.scene);
  this.lights.addToScene();

  this.ground = new Ground(this.scene);
  this.ground.addToScene();

  this.sky = new Sky(this.scene);
  this.sky.addToScene();

  this.kokoro = new Kokoro(this.scene);
  this.kokoro.addToScene();

  this.numEnemies = 10;
  this.enemies = [];
  this.generateEnemies();

  // Mouse event
  document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  this.mousePos = {
    x: 0,
    y: 0
  };

  this.score = 0;

  // start a loop that will update the objects' positions 
  // and render the scene on each frame
  this.loop();
}

Game.prototype.createScene = function () {
  // Create the scene
  this.scene = new THREE.Scene();
  // Add a fog effect to the scene; same color as the
  // background color used in the style sheet
  this.scene.fog = new THREE.Fog(0x2673ad, 100, 950);
}

Game.prototype.createCamera = function () {
  // Create the camera
  var aspectRatio = this.WIDTH / this.HEIGHT;
  var fieldOfView = 60;
  var nearPlane = 1;
  var farPlane = 10000;
  this.camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  // Set the position of the camera
  this.camera.position.x = 0;
  this.camera.position.z = 200;
  this.camera.position.y = 100;
}

Game.prototype.createRenderer = function () {
  // Create the renderer
  this.renderer = new THREE.WebGLRenderer({
    // Allow transparency to show the gradient background
    // we defined in the CSS
    alpha: true,

    // Activate the anti-aliasing; this is less performant,
    // but, as our project is low-poly based, it should be fine :)
    antialias: true
  });

  // Define the size of the renderer; in this case,
  // it will fill the entire screen
  this.renderer.setSize(this.WIDTH, this.HEIGHT);

  // Enable shadow rendering
  this.renderer.shadowMap.enabled = true;
}

Game.prototype.handleWindowResize = function () {
  // update height and width of the renderer and the camera
  this.HEIGHT = window.innerHeight;
  this.WIDTH = window.innerWidth;
  this.renderer.setSize(this.WIDTH, this.HEIGHT);
  this.camera.aspect = this.WIDTH / this.HEIGHT;
  this.camera.updateProjectionMatrix();
}

Game.prototype.loop = function () {
  
  this.kokoro.updatePosition(this.mousePos);
  
  this.enemies.forEach(function (enemy) {
    enemy.draw();
  }.bind(this));
  
  this.ground.mesh.rotation.z += .005;
  this.sky.mesh.rotation.z += .001;
  
  // render the scene
  this.renderer.render(this.scene, this.camera);
  
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
  
  this.updateScore();
  this.updateLife();

  // call the loop function again
  if (this.kokoro.lives > 0) {
    requestAnimationFrame(this.loop.bind(this));
  } else {
    this.gameOver();
  }
}

Game.prototype.handleMouseMove = function (event) {
  if (this.kokoro.lives > 0) {
    var directionX = -1 + (event.clientX / this.WIDTH) * 2;
    var directionY = 1 - (event.clientY / this.HEIGHT) * 2;
    
    this.mousePos = {
      x: directionX,
      y: directionY
    };
  }
}

Game.prototype.generateEnemies = function() {
  var stepAngle = Math.PI*2 / this.numEnemies;

  for (var i = 0; i <= this.numEnemies; i++) {
    var finalAngle = stepAngle*i;
    this.enemies.push(new Enemy(this.scene, this.ground, finalAngle));
    this.enemies[i].addToScene();
  }
}

Game.prototype.updateScore = function() {
  this.score += .1;
  document.querySelector('div.info p span').innerHTML = Math.floor(this.score);
}

Game.prototype.updateLife = function() {
  var dom = document.querySelector('div.life');
  var htmlResult = "";

  for (var i = 1; i <= this.kokoro.lives; i++) {
    htmlResult += "<span>X</span>";
  }

  dom.innerHTML = htmlResult;
}

Game.prototype.checkCollision = function() {
  this.enemies.forEach(function(enemy) {
    var enemyPos =  enemy.mesh.localToWorld(new THREE.Vector3());
    var kokoroPos = this.kokoro.mesh.position;

    var diffX = Math.abs(kokoroPos.x - enemyPos.x);
    var diffY = Math.abs(kokoroPos.y - enemyPos.y);

    if (diffX < 20 && diffY < 20) {
      console.log("colisión");
      this.kokoro.collisioned();
      this.kokoro.isColisioned = true;
      this.kokoro.lives--;
    }
  }.bind(this))
}


Game.prototype.gameOver = function() {
  //alert("fin!")
  this.kokoro.updatePosition(this.mousePos);

  // render the scene
  this.renderer.render(this.scene, this.camera);

  requestAnimationFrame(this.gameOver.bind(this));
}

Game.prototype.reload = function() {

}