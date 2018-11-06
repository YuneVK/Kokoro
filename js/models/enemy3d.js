function Enemy3D() {
  this.mesh = new THREE.Object3D();
}

Enemy3D.prototype.generateModel = function() {
  var sphere1 = new THREE.Mesh(GameConfig.geometries.enemies.sphere.lower, GameConfig.materials.enemies.sphere);
  sphere1.material.side = THREE.DoubleSide;

  this.mesh.add(sphere1);

  var sphere2 = new THREE.Mesh(GameConfig.geometries.enemies.sphere.lower, GameConfig.materials.enemies.sphere);
  sphere2.material.side = THREE.DoubleSide;
  sphere2.rotation.z = THREE.Math.degToRad(180);

  this.mesh.add(sphere2);

  var sphere3 = new THREE.Mesh(GameConfig.geometries.enemies.sphere.medium, GameConfig.materials.enemies.sphere);
  sphere3.material.side = THREE.DoubleSide;
  this.mesh.add(sphere3);

  var sphere4 = new THREE.Mesh(GameConfig.geometries.enemies.sphere.bigger, GameConfig.materials.enemies.sphere);
  sphere4.material.side = THREE.DoubleSide;
  this.mesh.add(sphere4);

  var light = new THREE.PointLight(0xff0000, 5, 100);
  light.position.set(0, 0, 0);
  this.mesh.add(light);

  var ball = new THREE.Mesh(GameConfig.geometries.enemies.ball, GameConfig.materials.enemies.ball);
  ball.material.side = THREE.DoubleSide;
  this.mesh.add(ball);
}