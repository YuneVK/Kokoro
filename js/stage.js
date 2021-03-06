let Stage = {
  HEIGHT: window.innerHeight,
  WIDTH: window.innerWidth,

  scene: null, 
  camera: null,
  renderer: null,

  ground: null,
  sky: null,

  island: null,

  numEnemies: 20,
  numLives: 5,

  velocity: 0.005,
  vInitial: 0.005,
  vIncrement: 0.001,
  vMax: 0.02,

  mousePos: {x: 0, y: 0},

  score: 0,

  scoreDOM: 0,
  prevScoreDOMVelocity: 0,
  prevScoreDOMChangeDay: 0,
  
  gameOver: false,
  started: false,

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


    this.island = new Island(this.scene);
  },

  createScene: function() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xE0FFFE, 100, 950);
    //this.scene.fog = new THREE.Fog(0x212b48, 100, 950);
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
    document.addEventListener('click', this.clickReload.bind(this), false);

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

  generateLives: function() {
    var stepAngle = Math.PI*2 / this.numLives;
    var lives = [];
  
    for (var i = 0; i <= this.numLives; i++) {
      var finalAngle = stepAngle*i;
      lives.push(new Live(this.scene, this.ground, finalAngle));
      lives[i].addToScene();
    }

    return lives;
  },

  renderScenary: function() {
    //this.ground.mesh.rotation.z += this.velocity;
    this.sky.mesh.rotation.z += this.velocity;
  }, 

  updateDOMInfo: function() {
    // SCORE
    this.score += .1;
    document.querySelector('div.info span').innerHTML = Math.floor(this.score);

    // INFO
    var dom = document.querySelector('div.life');
    var htmlResult = "";

    for (var i = 1; i <= Game.kokoro.maxLives; i++) {
      if (i > Game.kokoro.lives) {
        htmlResult += "<span class='life false'></span>";
      } else {
        htmlResult += "<span class='life true'></span>";
      }
    }

    dom.innerHTML = htmlResult;
  }, 

  clickReload: function() {
    if (this.gameOver) {
      if (Utils.hasClass(document.querySelector('div.info'), 'dark')) {
        Animations.toDay(this.scene);
        Sounds.music.playbackRate = 1;
        this.velocity -= 0.005;
      }
      Game.reload();
    } else if (!this.started) {
      this.started = true;
      Utils.addClass(document.querySelector('div.start'), 'hidden');
      Sounds.music.play();
      Game.render();
    }
  }, 

  showGameOverScreen: function() {
    document.querySelector('div.replay p.score span').innerHTML = Math.floor(this.score);
    Utils.addClass(document.querySelector("div.replay"), "active");
  }, 

  hideGameOverScreen: function() {
    Utils.removeClass(document.querySelector("div.replay"), "active");
  },

  reset: function() {
    Game.kokoro.lives = Game.kokoro.maxLives;
    this.gameOver = false;
    this.score = 0;
    this.velocity = this.vInitial;
    this.prevScoreDOMVelocity = 0;
    this.prevScoreDOMChangeDay = 0;

    
  }, 

  checkVelocity: function() {
    this.scoreDOM = parseInt(document.querySelector('div.score span').innerHTML);
    if ((this.scoreDOM > 0) && (this.scoreDOM % 30 === 0) && (this.scoreDOM !== this.prevScoreDOMVelocity)) {
      this.velocity += this.vIncrement;
      this.prevScoreDOMVelocity = this.scoreDOM;
    }
  },

  checkDay: function() {
    this.scoreDOM = parseInt(document.querySelector('div.score span').innerHTML);
    if ((this.scoreDOM > 0) && (this.scoreDOM % 100 === 0) && (this.scoreDOM !== this.prevScoreDOMChangeDay)) {
      if (Utils.hasClass(document.querySelector('div.info'), 'dark')) {
        Animations.toDay(this.scene);
        Sounds.music.playbackRate = 1;
        this.velocity -= 0.003;
      } else {
        Animations.toNight(this.scene);
        Sounds.music.playbackRate = 2;
        this.velocity += 0.003;
      }
      Sounds.changeDay.play();
      this.prevScoreDOMChangeDay = this.scoreDOM;
    }
  }
}