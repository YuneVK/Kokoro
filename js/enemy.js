function Enemy(scene) {
  this.scene = scene;

  
  this.mesh = new THREE.Object3D();
  this.generateModel();





}

Enemy.prototype.generateModel = function() {
  var geometry = new THREE.SphereGeometry( 10, 32, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var sphere = new THREE.Mesh( geometry, material );

  this.mesh.add(sphere);
  this.mesh.position.y = 100;
  this.mesh.position.x = 30;
  
}


Enemy.prototype.addToScene = function () {
  this.scene.add(this.mesh);
}