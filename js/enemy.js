function Enemy(scene, ground, finalAngle) {
  this.scene = scene;

  this.model = new Enemy3D();
  this.model.generateModel();
  this.setPosition(finalAngle);

  this.ground = ground;

  this.isCollisioned = false;
}

Enemy.prototype.setPosition = function (finalAngle) {
  this.model.mesh.scale.set(.2, .2, .2);
  var distanceFromCenter = 650 + Math.random() * 200;

  this.model.mesh.position.y = Math.sin(finalAngle) * distanceFromCenter;
  this.model.mesh.position.x = Math.cos(finalAngle) * distanceFromCenter;
}

Enemy.prototype.addToScene = function () {
  this.ground.mesh.add(this.model.mesh);
}

Enemy.prototype.draw = function () {
  this.model.mesh.rotation.x += THREE.Math.degToRad(2);
  this.model.mesh.rotation.z += THREE.Math.degToRad(2);

  if (this.isCollisioned) {
    this.explosionRender();

    var enemyPos = this.model.mesh.localToWorld(new THREE.Vector3());
    if (enemyPos.y < 0) this.resetSize();
  }

}

Enemy.prototype.explosionRender = function () {
  this.model.ringTop.opacity = .5;
  this.model.ringTop.material.opacity -= .05;

  this.model.ringTop.scale.x += .1;
  this.model.ringBottom.scale.x += .1;

  if (this.model.isExpanding) {
    this.model.ball.scale.x += .1;
    this.model.ball.scale.y += .1;
    this.model.ball.scale.z += .1;

    this.model.light.intensity += 1;

    if (this.model.light.intensity > 15) this.model.isExpanding = false;
  } else {
    if (this.model.ball.scale.x > 0) {
      this.model.ball.scale.x -= .5;
      this.model.ball.scale.y -= .5;
      this.model.ball.scale.z -= .5;
  
      this.model.light.intensity -= 1;
    } else if (this.model.ball.scale.x < 0) {
      this.model.ball.scale.x = 0;
      this.model.ball.scale.y = 0;
      this.model.ball.scale.z = 0;

      this.model.light.intensity = 0;
    }
  }
}

Enemy.prototype.resetSize = function () {
  this.model.ringTop.opacity = 1;
  this.model.ringTop.material.opacity = 1;

  this.model.ringTop.scale.x = 1;
  this.model.ringBottom.scale.x = 1;

  this.model.ball.scale.x = 1;
  this.model.ball.scale.y = 1;
  this.model.ball.scale.z = 1;

  this.model.light.intensity = 5;

  this.isCollisioned = false;
}