function Ground(scene){
  this.mesh = null;
  this.createMesh();
  this.scene = scene;
}

Ground.prototype.createMesh = function() {
	GameConfig.geometries.ground.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

  this.mesh = new THREE.Mesh(GameConfig.geometries.ground, GameConfig.materials.ground);
  this.mesh.receiveShadow = true; 
  this.mesh.position.y = -600;
}

Ground.prototype.addToScene = function() {
  this.scene.add(this.mesh);
}
