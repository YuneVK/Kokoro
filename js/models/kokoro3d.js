function Kokoro3D() {
  this.mesh = new THREE.Object3D();
  this.eyesNormal = new THREE.Object3D();
  this.eyesCrossed = new THREE.Object3D();
}

Kokoro3D.prototype.generateModel = function () {
  var groupHead = new THREE.Object3D();

  var beak = new THREE.Mesh(GameConfig.geometries.kokoro.beak, GameConfig.materials.kokoro.body);
  beak.position.set(30, 100, 0);
  beak.rotation.z = THREE.Math.degToRad(-30);
  groupHead.add(beak);

  var head = new THREE.Mesh(GameConfig.geometries.kokoro.head, GameConfig.materials.kokoro.body);
  head.castShadow = true;
  head.receiveShadow = true;
  head.position.y = 50;
  head.rotation.x = Math.PI / 2;
  groupHead.add(head);

  var eyeLeft = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.iris, GameConfig.materials.kokoro.eyes.iris);
  eyeLeft.position.set(0,50,26);
  groupHead.add(eyeLeft);

  var eyeRight = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.iris, GameConfig.materials.kokoro.eyes.iris);
  eyeRight.position.set(0,50,-26);
  groupHead.add(eyeRight);

  var pupileLeft = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.normal, GameConfig.materials.kokoro.eyes.pupile);
  pupileLeft.position.set(0,50,27);

  var pupileRight = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.normal, GameConfig.materials.kokoro.eyes.pupile);
  pupileRight.position.set(0,50,-27);

  this.eyesNormal.add(pupileLeft);
  this.eyesNormal.add(pupileRight);

  groupHead.add(this.eyesNormal);
  
  var pupileLeftCrossed = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.crossed, GameConfig.materials.kokoro.eyes.pupile);
  pupileLeftCrossed.position.set(0,50,27);
  pupileLeftCrossed.rotation.z = THREE.Math.degToRad(210);
  
  var pupileLeftCrossedCopy = pupileLeftCrossed.clone();
  pupileLeftCrossedCopy.rotation.z = THREE.Math.degToRad(310);
  
  var eyeLeftCrossed = new THREE.Object3D();
  eyeLeftCrossed.add(pupileLeftCrossed);
  eyeLeftCrossed.add(pupileLeftCrossedCopy);

  this.eyesCrossed.add(eyeLeftCrossed);
  
  var pupileRightCrossed = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.crossed, GameConfig.materials.kokoro.eyes.pupile);
  pupileRightCrossed.position.set(0,50,-27);
  pupileRightCrossed.rotation.z = THREE.Math.degToRad(210);
  
  var pupileRightCrossedCopy = pupileLeftCrossed.clone();
  pupileRightCrossedCopy.rotation.z = THREE.Math.degToRad(310);
  
  var eyeRightCrossed = new THREE.Object3D();
  eyeRightCrossed.add(pupileRightCrossed);
  eyeRightCrossed.add(pupileRightCrossedCopy);

  this.eyesCrossed.add(eyeRightCrossed);

  groupHead.add(this.eyesCrossed);

  this.mesh.add(groupHead);

  groupBody = new THREE.Object3D();

  var neck = new THREE.Mesh(GameConfig.geometries.kokoro.wings, GameConfig.materials.kokoro.wings);
  neck.castShadow = true;
  neck.receiveShadow = true;
  neck.rotation.z = this.initialRotationZ;
  neck.position.set(10,10,0);
  groupBody.add(neck);

  var body = new THREE.Mesh(GameConfig.geometries.kokoro.body, GameConfig.materials.kokoro.body);
  body.castShadow = true;
  body.receiveShadow = true;
  body.rotation.z = THREE.Math.degToRad(25);
  body.position.set(35,-45,0);
  groupBody.add(body);

  this.mesh.add(groupBody);

  wing1 = new THREE.Mesh(GameConfig.geometries.kokoro.wings, GameConfig.materials.kokoro.wings);
  wing1.position.set(10,-10,0);
  wing1.rotation.set(THREE.Math.degToRad(180), THREE.Math.degToRad(100), THREE.Math.degToRad(20));
  this.mesh.add(wing1);

  wing2 = new THREE.Mesh(GameConfig.geometries.kokoro.wings, GameConfig.materials.kokoro.wings);
  wing2.position.set(10,-10,0);
  wing2.rotation.set(THREE.Math.degToRad(180), THREE.Math.degToRad(270), THREE.Math.degToRad(20));
  this.mesh.add(wing2);

  this.mesh.rotation.z = THREE.Math.degToRad(280);
}