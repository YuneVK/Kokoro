function Kokoro(scene) {
  this.model = new Kokoro3D();
  this.model.generateModel();
  
  this.model.mesh.scale.set(.15, .15, .15);
  this.model.mesh.position.y = 100;

  this.scene = scene;

  this.velocity = .1;
  this.flappingUp = true;
  this.initialRotationZ = THREE.Math.degToRad(280);

  this.addToScene();

  this.isColisioned = false;
  this.counterColisioned = 0;
  this.timeColisioned = 30;

  this.maxLives = 5;
  this.lives = this.maxLives;
};

Kokoro.prototype.addToScene = function () {

  Stage.scene.add(this.model.mesh);
}

Kokoro.prototype.moveWings = function () {
  var angleWing1 = Math.floor(THREE.Math.radToDeg(wing1.rotation.y));

  if (angleWing1 >= 150) {
    this.flappingUp = false;
  } else if (angleWing1 <= 90) {
    this.flappingUp = true;
  }

  wing1.rotation.y += this.flappingUp ? this.velocity : -this.velocity;
  wing2.rotation.y += this.flappingUp ? -this.velocity : this.velocity;
}

Kokoro.prototype.updatePosition = function (mousePos) {
  if (this.lives > 0) {
    var remainingX = normalizePosition(mousePos.x, -1, 1, -120, 120);
    var remainingY = normalizePosition(mousePos.y, -1, 1, 15, 195);

    // Move at each frame by adding a fraction of the remaining distance
    this.model.mesh.position.y += (remainingY - this.model.mesh.position.y) * .1;
    
    if (this.isColisioned) {
      this.model.mesh.position.x += .5;
      this.model.mesh.rotation.z += THREE.Math.degToRad(1);
      
    } else {
      this.model.mesh.rotation.y = (remainingY - this.model.mesh.position.y) * .001;
      this.model.mesh.position.x = remainingX;
      this.model.mesh.rotation.z = this.initialRotationZ + ((remainingY - this.model.mesh.position.y) * .0128);
    }
  } else {
    this.checkPupiles();
    this.model.mesh.position.y -= 2;
    this.model.mesh.rotation.z += THREE.Math.degToRad(3);
    this.model.mesh.rotation.y += THREE.Math.degToRad(3);
    this.model.mesh.rotation.z += THREE.Math.degToRad(3);
  }

  function normalizePosition(position, positionMin, positionMax, axisMin, axisMax) {
    var newPosition = Math.max(Math.min(position, positionMax), positionMin);
    var distancePosition = positionMax - positionMin;
    var pc = (newPosition - positionMin) / distancePosition;
    var distanceAxis = axisMax - axisMin;
    var positionAxis = axisMin + (pc * distanceAxis);
    return positionAxis;
  }
}

Kokoro.prototype.collisioned = function() {
  this.model.mesh.rotation.z -= THREE.Math.degToRad(30);
  this.model.mesh.rotation.y -= THREE.Math.degToRad(30);
  this.model.mesh.position.x -= 10;

  this.checkPupiles();
}

Kokoro.prototype.checkPupiles = function() {
  var colisioned = this.isColisioned;
  
  this.model.eyesNormal.visible = !colisioned;
  this.model.eyesCrossed.visible = colisioned;
}

Kokoro.prototype.render = function() {
  this.updatePosition(Stage.mousePos);
  this.checkPupiles();
}