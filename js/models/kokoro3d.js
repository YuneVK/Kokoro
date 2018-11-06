function Kokoro3D() {
  this.mesh = new THREE.Object3D();
  this.eyesNormal = new THREE.Object3D();
  this.eyesCrossed = new THREE.Object3D();
}

Kokoro3D.prototype.generateModel = function () {
  var groupHead = new THREE.Object3D();

  var beak = new THREE.Mesh(GameConfig.geometries.kokoro.beak, GameConfig.materials.kokoro.body);
  beak.position.y = 100;
  beak.position.x = 30;
  beak.rotation.z = THREE.Math.degToRad(-30);
  groupHead.add(beak);

  var head = new THREE.Mesh(GameConfig.geometries.kokoro.head, GameConfig.materials.kokoro.body);
  head.castShadow = true;
  head.receiveShadow = true;
  head.position.y = 50;
  head.rotation.x = Math.PI / 2;
  groupHead.add(head);

  var eye1 = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.iris, GameConfig.materials.kokoro.eyes.iris);
  eye1.position.z = 26;
  eye1.position.y = 50;
  groupHead.add(eye1);

  var eye2 = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.iris, GameConfig.materials.kokoro.eyes.iris);
  eye2.position.z = -26;
  eye2.position.y = 50;
  groupHead.add(eye2);

  var pupile1 = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.normal, GameConfig.materials.kokoro.eyes.pupile);
  pupile1.position.z = 27;
  pupile1.position.y = 50;

  var pupile2 = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.normal, GameConfig.materials.kokoro.eyes.pupile);
  pupile2.position.z = -27;
  pupile2.position.y = 50;

  this.eyesNormal.add(pupile1);
  this.eyesNormal.add(pupile2);

  groupHead.add(this.eyesNormal);
  
  var crossPupile1 = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.crossed, GameConfig.materials.kokoro.eyes.pupile);
  crossPupile1.position.z = 27;
  crossPupile1.position.y = 50;
  crossPupile1.rotation.z = THREE.Math.degToRad(210);
  
  var crossPupile1Copy = crossPupile1.clone();
  crossPupile1Copy.rotation.z = THREE.Math.degToRad(310);
  
  var pupile1Crossed = new THREE.Object3D();
  pupile1Crossed.add(crossPupile1);
  pupile1Crossed.add(crossPupile1Copy);

  this.eyesCrossed.add(pupile1Crossed);
  
  var crossPupile2 = new THREE.Mesh(GameConfig.geometries.kokoro.eyes.pupiles.crossed, GameConfig.materials.kokoro.eyes.pupile);
  crossPupile2.position.z = -27;
  crossPupile2.position.y = 50;
  crossPupile2.rotation.z = THREE.Math.degToRad(210);
  
  var crossPupile2Copy = crossPupile1.clone();
  crossPupile2Copy.rotation.z = THREE.Math.degToRad(310);
  
  var pupile2Crossed = new THREE.Object3D();
  pupile2Crossed.add(crossPupile2);
  pupile2Crossed.add(crossPupile2Copy);

  this.eyesCrossed.add(pupile2Crossed);

  groupHead.add(this.eyesCrossed);

  this.mesh.add(groupHead);

  groupBody = new THREE.Object3D();

  var neck = new THREE.Mesh(GameConfig.geometries.kokoro.wings, GameConfig.materials.kokoro.wings);
  neck.castShadow = true;
  neck.receiveShadow = true;
  neck.rotation.z = this.initialRotationZ;
  neck.position.x = 10;
  neck.position.y = 10;
  groupBody.add(neck);

  var body = new THREE.Mesh(GameConfig.geometries.kokoro.body, GameConfig.materials.kokoro.body);
  body.castShadow = true;
  body.receiveShadow = true;
  body.rotation.z = THREE.Math.degToRad(25);
  body.position.y = -45;
  body.position.x = 35;
  groupBody.add(body);

  this.mesh.add(groupBody);

  wing1 = new THREE.Mesh(GameConfig.geometries.kokoro.wings, GameConfig.materials.kokoro.wings);
  wing1.position.x = 10;
  wing1.position.y = -10;
  wing1.rotation.y = THREE.Math.degToRad(100);
  wing1.rotation.x = THREE.Math.degToRad(180);
  wing1.rotation.z = THREE.Math.degToRad(20);
  this.mesh.add(wing1);

  wing2 = new THREE.Mesh(GameConfig.geometries.kokoro.wings, GameConfig.materials.kokoro.wings);
  wing2.position.x = 10;
  wing2.position.y = -10;
  wing2.rotation.y = THREE.Math.degToRad(270);
  wing2.rotation.x = THREE.Math.degToRad(180);
  wing2.rotation.z = THREE.Math.degToRad(20);
  this.mesh.add(wing2);

  this.mesh.rotation.z = THREE.Math.degToRad(280);
}