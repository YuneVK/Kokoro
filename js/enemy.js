function Enemy(scene, ground, finalAngle) {
  this.scene = scene;
  this.mesh = new THREE.Object3D();
  this.generateModel();
  this.setPosition(finalAngle);
  this.ground = ground;
}

Enemy.prototype.generateModel = function () {
  var material = new THREE.MeshPhongMaterial({
    color: 0x34495E
  });
  material.transparent = true;
  material.opacity = 01;
  material.needsUpdate = true;
  material.castShadow = true;
  material.receiveShadow = true;

  var geometry1 = new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 0, .8);
  var sphere1 = new THREE.Mesh(geometry1, material);
  sphere1.material.side = THREE.DoubleSide;

  this.mesh.add(sphere1);

  var geometry2 = new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 0, .8);
  var sphere2 = new THREE.Mesh(geometry2, material);
  sphere2.material.side = THREE.DoubleSide;

  sphere2.rotation.z = THREE.Math.degToRad(180);

  this.mesh.add(sphere2);

  var geometry3 = new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 1.15, .25);
  var sphere3 = new THREE.Mesh(geometry3, material);
  sphere3.material.side = THREE.DoubleSide;
  this.mesh.add(sphere3);

  var geometry4 = new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 1.7, .25);
  var sphere4 = new THREE.Mesh(geometry4, material);
  sphere4.material.side = THREE.DoubleSide;
  this.mesh.add(sphere4);

  var light = new THREE.PointLight(0xff0000, 5, 100);
  light.position.set(0, 0, 0);
  this.mesh.add(light);

  var geometry5 = new THREE.SphereGeometry(10, 32, 32);
  var material5 = new THREE.MeshPhongMaterial({
    color: 0xff0000
  });
  var ball = new THREE.Mesh(geometry5, material5);
  ball.material.side = THREE.DoubleSide;
  this.mesh.add(ball);
}

Enemy.prototype.setPosition = function (finalAngle) {
  this.mesh.scale.set(.2, .2, .2);
  var distanceFromCenter = 650 + Math.random()*200;

  this.mesh.position.y = Math.sin(finalAngle)*distanceFromCenter;
  this.mesh.position.x = Math.cos(finalAngle)*distanceFromCenter;
  //this.mesh.rotation.z = finalAngle + Math.PI/2;
}

Enemy.prototype.addToScene = function () {
  this.ground.mesh.add(this.mesh);

}

Enemy.prototype.draw = function () {
  this.mesh.rotation.x += THREE.Math.degToRad(2);
  this.mesh.rotation.z += THREE.Math.degToRad(2);
}