let Stage = {
  // Get the width and the height of the screen,
  // use them to set up the aspect ratio of the camera 
  // and the size of the renderer.
  HEIGHT: window.innerHeight,
  WIDTH: window.innerWidth,

  scene: null, 
  camera: null,
  renderer: null,

  ground: null,
  sky: null,

  numEnemies: 10,

  mousePos: {x: 0, y: 0},

  score: 0,

  createScenary: function() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.addToDOM();
    this.modeDebug3D(false);
  }, 

  createWorld: function() {
    lights = new Lights(this.scene);
    lights.addToScene();

    this.ground = new Ground(this.scene);
    this.ground.addToScene();

    this.sky = new Sky(this.scene);
    this.sky.addToScene();
  },

  createScene: function() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x2673ad, 100, 950);
  }, 

  createCamera: function () {
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

    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;
  }, 

  createRenderer: function() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // Allow transparency
      antialias: true
    });

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMap.enabled = true;
  },

  addToDOM: function() {
    this.container = document.getElementById('world');
    this.container.appendChild(this.renderer.domElement);
  },

  modeDebug3D: function(active) {
    if (active) {
      controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.85;
      controls.screenSpacePanning = false;
      controls.minDistance = 10;
      controls.maxDistance = 2000;
      controls.maxPolarAngle = Math.PI / 2;
    }
  }, 

  setListeners: function() {
    document.addEventListener('resize', this.windowResize.bind(this), false);
    document.addEventListener('mousemove', this.mouseMove.bind(this), false);

  }, 

  windowResize: function () {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
  }, 

  mouseMove: function (event) {
    if (Game.kokoro.lives > 0) {
      var directionX = -1 + (event.clientX / this.WIDTH) * 2;
      var directionY = 1 - (event.clientY / this.HEIGHT) * 2;
      
      this.mousePos = {
        x: directionX,
        y: directionY
      };
    }
  }, 

  generateEnemies: function() {
    var stepAngle = Math.PI*2 / this.numEnemies;
    var enemies = [];
  
    for (var i = 0; i <= this.numEnemies; i++) {
      var finalAngle = stepAngle*i;
      enemies.push(new Enemy(this.scene, this.ground, finalAngle));
      enemies[i].addToScene();
    }

    return enemies;
  },

  renderScenary: function() {
    this.ground.mesh.rotation.z += .005;
    this.sky.mesh.rotation.z += .001;
  }, 

  updateDOMInfo: function() {
    // SCORE
    this.score += .1;
    document.querySelector('div.info p span').innerHTML = Math.floor(this.score);

    // INFO
    var dom = document.querySelector('div.life');
    var htmlResult = "";

    for (var i = 1; i <= Game.kokoro.lives; i++) {
      htmlResult += "<span>X</span>";
    }

    dom.innerHTML = htmlResult;
    }
}