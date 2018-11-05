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

  this.enemy = new Enemy(this.scene);
  this.enemy.addToScene();

  // Mouse event
  document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  this.mousePos={x:0, y:0};
  
  // start a loop that will update the objects' positions 
  // and render the scene on each frame
  this.loop();

}

Game.prototype.createScene = function() {
  // Create the scene
  this.scene = new THREE.Scene();
  // Add a fog effect to the scene; same color as the
	// background color used in the style sheet
  this.scene.fog = new THREE.Fog(0x2673ad, 100, 950);
}


Game.prototype.createCamera = function() {
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

Game.prototype.createRenderer = function() {
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

Game.prototype.handleWindowResize = function() {
	// update height and width of the renderer and the camera
	this.HEIGHT = window.innerHeight;
	this.WIDTH = window.innerWidth;
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	this.camera.aspect = this.WIDTH / this.HEIGHT;
	this.camera.updateProjectionMatrix();
}

Game.prototype.loop = function () {
  this.kokoro.moveWings();
  this.kokoro.updatePosition(this.mousePos);
  
  this.ground.mesh.rotation.z += .005;
  this.sky.mesh.rotation.z += .001;

  //this.enemy.sphere.position.x += 1;

  // render the scene
  this.renderer.render(this.scene, this.camera);

  // call the loop function again
  requestAnimationFrame(this.loop.bind(this));
}

Game.prototype.handleMouseMove = function(event) {
  var directionX = -1 + (event.clientX / this.WIDTH)*2;
	var directionY = 1 - (event.clientY / this.HEIGHT)*2;

  this.mousePos = {x:directionX, y:directionY};
}