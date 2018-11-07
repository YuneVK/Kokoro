function Live(scene, ground, finalAngle) {
  this.scene = scene;

  this.model = new Live3D();
  this.model.generateModel();
  this.setPosition(finalAngle);

  this.ground = ground;

  this.isCollisioned = false;
}

Live.prototype.setPosition = function (finalAngle) {
  this.model.mesh.scale.set(.8, .8, .8);
  var distanceFromCenter = 650 + Math.random() * 200;

  this.model.mesh.position.y = Math.sin(finalAngle) * distanceFromCenter;
  this.model.mesh.position.x = Math.cos(finalAngle) * distanceFromCenter;
}

Live.prototype.addToScene = function () {
  this.ground.mesh.add(this.model.mesh);
}

Live.prototype.draw = function () {
  var livePos = this.model.mesh.localToWorld(new THREE.Vector3());
  this.model.mesh.rotation.z = THREE.Math.degToRad(90);

  if (livePos.y > 0) {
    this.model.mesh.rotation.x += THREE.Math.degToRad(2);
    this.model.mesh.rotation.z += THREE.Math.degToRad(2);
  
    if (this.isCollisioned) this.explosionRender();
  } else {
    if (this.model.ringTop.opacity !== 1) this.resetSize();
  }
}

Live.prototype.explosionRender = function () {

  if (this.model.isExpanding) {
    this.model.mesh.scale.x -= 0.1;
    this.model.mesh.scale.y -= 0.1;
    this.model.mesh.scale.z -= 0.1;

    if (this.model.mesh.scale.z < 0) {
      this.model.isExpanding = false;
      this.model.mesh.scale.x = 0;
      this.model.mesh.scale.y = 0;
      this.model.mesh.scale.z = 0;
    }
  }
}

Live.prototype.resetSize = function () {
  this.model.mesh.scale.x = 1;
  this.model.mesh.scale.y = 1;
  this.model.mesh.scale.z = 1;

  this.isCollisioned = false;
}