// First let's define a Sea object :
function Ground(scene){
  this.mesh = null;
  this.createMesh();
  this.scene = scene;
}

Ground.prototype.createMesh = function() {
  // create the geometry (shape) of the cylinder;
	// the parameters are: 
	// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	var geom = new THREE.CylinderGeometry(600,600,800,40,10);
	
	// rotate the geometry on the x axis
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	
	// create the material 
	var mat = new THREE.MeshPhongMaterial({
		color: GameConfig.colors.blue,
		transparent:true,
		opacity:.6,
		flatShading:true,
  });
  
  // To create an object in Three.js, we have to create a mesh 
	// which is a combination of a geometry and some material
  this.mesh = new THREE.Mesh(geom, mat);
  // Allow the ground to receive shadows
  this.mesh.receiveShadow = true; 
  // push it a little bit at the bottom of the scene
  this.mesh.position.y = -600;
}

Ground.prototype.addToScene = function() {
  // add the mesh of the ground to the scene
  this.scene.add(this.mesh);
}
