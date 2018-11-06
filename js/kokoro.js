function Kokoro(scene) {
  this.propeller = null;
  this.mesh = new THREE.Object3D();
  this.generateModel();
  this.mesh.scale.set(.15, .15, .15);
  this.mesh.position.y = 100;

  this.box = new THREE.Box3().setFromObject(this.mesh);

  this.scene = scene;

  this.velocity = .1;
  this.flappingUp = true;
  this.initialRotationZ = THREE.Math.degToRad(280);

  this.addToScene();

  this.isColisioned = false;
  this.counterColisioned = 0;
  this.timeColisioned = 30;

  this.lives = 20;

};

Kokoro.prototype.generateModel = function () {
  groupHead = new THREE.Object3D();

  var bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x212121,
    flatShading: true
  });;
  var eyeBlackMaterial = new THREE.MeshBasicMaterial({
    color: 0x212121
  });;
  var eyeWhiteMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var wingMaterial = new THREE.MeshBasicMaterial({
    color: 0x212121
  });

  /* BEAK */
  var geometryBeak = new THREE.ConeBufferGeometry(25, 100, 32);
  var beak = new THREE.Mesh(geometryBeak, bodyMaterial);
  beak.position.y = 100;
  beak.position.x = 30;
  beak.rotation.z = THREE.Math.degToRad(-30);
  groupHead.add(beak);


  /* HEAD */
  var geometryHead = new THREE.CylinderGeometry(30, 30, 50, 32);
  var head = new THREE.Mesh(geometryHead, bodyMaterial);
  head.castShadow = true;
  head.receiveShadow = true;
  head.position.y = 50;
  head.rotation.x = Math.PI / 2;
  groupHead.add(head);

  /* EYE 1 */
  var geometryEye1 = new THREE.CircleGeometry(20, 20);
  var eye1 = new THREE.Mesh(geometryEye1, eyeWhiteMaterial);
  eye1.position.z = 26;
  eye1.position.y = 50;
  groupHead.add(eye1);

  /* EYE 2 */
  var geometryEye2 = new THREE.CircleGeometry(20, 20);
  var eye2 = new THREE.Mesh(geometryEye2, eyeWhiteMaterial);
  eye2.material.side = THREE.DoubleSide; // to show all sides
  eye2.position.z = -26;
  eye2.position.y = 50;
  groupHead.add(eye2);

  /* EYE 1 BLACK*/
  var geometryEye1Black = new THREE.CircleGeometry(15, 15);
  var eye1Black = new THREE.Mesh(geometryEye1Black, eyeBlackMaterial);
  eye1Black.position.z = 27;
  eye1Black.position.y = 50;
  groupHead.add(eye1Black);

  /* EYE 2 BLACK */
  var geometryEye2Black = new THREE.CircleGeometry(15, 15);
  var eye2Black = new THREE.Mesh(geometryEye2Black, eyeBlackMaterial);
  eye2Black.material.side = THREE.DoubleSide; // to show all sides
  eye2Black.position.z = -27;
  eye2Black.position.y = 50;
  groupHead.add(eye2Black);

  this.mesh.add(groupHead);


  groupBody = new THREE.Object3D();

  /* NECK */
  var geometryNeck = new THREE.CylinderGeometry(10, 10, 50, 32, 5);
  var neck = new THREE.Mesh(geometryNeck, bodyMaterial);
  neck.castShadow = true;
  neck.receiveShadow = true;
  neck.rotation.z = this.initialRotationZ;
  neck.position.x = 10;
  neck.position.y = 10;
  groupBody.add(neck);

  /* BODY */
  var geometryBody = new THREE.CylinderGeometry(10, 40, 100, 32, 5);
  var body = new THREE.Mesh(geometryBody, bodyMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  body.rotation.z = THREE.Math.degToRad(25);
  body.position.y = -45;
  body.position.x = 35;
  groupBody.add(body);

  this.mesh.add(groupBody);


  /* WING 1 */
  var geometryWing1 = new THREE.CircleGeometry(85, 32, 0, .8);
  wing1 = new THREE.Mesh(geometryWing1, wingMaterial);
  wing1.material.side = THREE.DoubleSide; // to show all sides
  wing1.position.x = 10;
  wing1.position.y = -10;
  wing1.rotation.y = THREE.Math.degToRad(100);
  wing1.rotation.x = THREE.Math.degToRad(180);
  wing1.rotation.z = THREE.Math.degToRad(20);
  this.mesh.add(wing1);

  /* WING 2 */
  var geometryWing2 = new THREE.CircleGeometry(85, 32, 0, .8);
  wing2 = new THREE.Mesh(geometryWing2, wingMaterial);
  wing2.material.side = THREE.DoubleSide; // to show all sides
  wing2.position.x = 10;
  wing2.position.y = -10;
  wing2.rotation.y = THREE.Math.degToRad(270);
  wing2.rotation.x = THREE.Math.degToRad(180);
  wing2.rotation.z = THREE.Math.degToRad(20);
  this.mesh.add(wing2);

  /*
  var radians = THREE.Math.degToRad( degrees );
  var degrees = THREE.Math.radToDeg( radians );
  */

  this.mesh.rotation.z = THREE.Math.degToRad(280);
}

Kokoro.prototype.addToScene = function () {

  this.scene.add(this.mesh);
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
    this.mesh.position.y += (remainingY - this.mesh.position.y) * .1;
    
    if (this.isColisioned) {
      //this.mesh.rotation.z -= THREE.Math.degToRad(1);
      this.mesh.position.x += .5;
      this.mesh.rotation.z += THREE.Math.degToRad(1);
      //this.mesh.rotation.z += .04;
      
    } else {
      this.mesh.rotation.y = (remainingY - this.mesh.position.y) * .001;
      this.mesh.position.x = remainingX;
      this.mesh.rotation.z = this.initialRotationZ + ((remainingY - this.mesh.position.y) * .0128);
      
      
    }
  } else {
    this.mesh.position.y -= 2;
    this.mesh.rotation.z += THREE.Math.degToRad(3);
    this.mesh.rotation.y += THREE.Math.degToRad(3);
    this.mesh.rotation.z += THREE.Math.degToRad(3);
    //this.mesh.position.x -= 5;
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
  this.mesh.rotation.z -= THREE.Math.degToRad(30);
  this.mesh.rotation.y -= THREE.Math.degToRad(30);
  //this.mesh.rotation.z += THREE.Math.degToRad(50);
  this.mesh.position.x -= 10;
}