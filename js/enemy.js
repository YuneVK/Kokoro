function Enemy(scene, ground, finalAngle) {
  this.scene = scene;

  this.model = new Enemy3D();
  this.model.generateModel();
  this.setPosition(finalAngle);

  this.ground = ground;
}

Enemy.prototype.generateModel = function () {
  
}

Enemy.prototype.setPosition = function (finalAngle) {
  this.model.mesh.scale.set(.2, .2, .2);
  var distanceFromCenter = 650 + Math.random()*200;

  this.model.mesh.position.y = Math.sin(finalAngle)*distanceFromCenter;
  this.model.mesh.position.x = Math.cos(finalAngle)*distanceFromCenter;
}

Enemy.prototype.addToScene = function () {
  this.ground.mesh.add(this.model.mesh);

}

Enemy.prototype.draw = function () {
  this.model.mesh.rotation.x += THREE.Math.degToRad(2);
  this.model.mesh.rotation.z += THREE.Math.degToRad(2);
}