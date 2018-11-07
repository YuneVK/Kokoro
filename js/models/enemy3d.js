function Enemy3D() {
  this.mesh = new THREE.Object3D();
  this.ringTop;
  this.ringBottom;
  this.ball;
  this.light;
  this.isExpanding = false;
}

Enemy3D.prototype.generateModel = function() {
  var materialSphere = GameConfig.materials.enemies.sphere.clone();

  var ringTopAux = new THREE.Mesh(GameConfig.geometries.enemies.sphere.medium, materialSphere);
  ringTopAux.material.side = THREE.DoubleSide;
  this.ringTop = ringTopAux.clone();
  this.ringTop.rotation.x = THREE.Math.degToRad(90);
  this.mesh.add(this.ringTop);

  this.ringBottom = new THREE.Mesh(GameConfig.geometries.enemies.sphere.bigger, materialSphere);
  this.ringBottom.material.side = THREE.DoubleSide;
  this.mesh.add(this.ringBottom);

  this.light = new THREE.PointLight(0xB80000, 1, 20);
  this.light.position.set(0, 0, 0);
  this.mesh.add(this.light);

  this.ball = new THREE.Mesh(GameConfig.geometries.enemies.ball, GameConfig.materials.enemies.ball);
  this.ball.material.side = THREE.DoubleSide;
  this.mesh.add(this.ball);
}