function Ground(scene){
  this.mesh = null;
	this.createMesh();
	this.setVertices();
  this.scene = scene;
}

Ground.prototype.createMesh = function() {
  var geometry = GameConfig.geometries.ground;

  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  
  // important: by merging vertices we ensure the continuity of the waves
	geometry.mergeVertices();

	// get the vertices
	var l = geometry.vertices.length;

	// create an array to store new data associated to each vertex
	this.waves = [];

	for (var i=0; i<l; i++){
		// get each vertex
		var v = geometry.vertices[i];

		// store some data associated to it
		this.waves.push({y:v.y,
										x:v.x,
										z:v.z,
										// a random angle
										ang:Math.random()*Math.PI*2,
										// a random distance
										amp:5 + Math.random()*15,
										// a random speed between 0.016 and 0.048 radians / frame
										speed:0.016 + Math.random()*0.032
			});
	};

  this.mesh = new THREE.Mesh(geometry, GameConfig.materials.ground);
  this.mesh.receiveShadow = true; 
  this.mesh.position.y = -600;
}

Ground.prototype.addToScene = function() {
  this.scene.add(this.mesh);
}

Ground.prototype.setVertices = function() {
	var verts = this.mesh.geometry.vertices;
	var l = verts.length;
	
	for (var i=0; i<l; i++){
		var v = verts[i];
		
		// get the data associated to it
		var vprops = this.waves[i];
		
		// update the position of the vertex
		v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
		v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;

		// increment the angle for the next frame
		vprops.ang += vprops.speed;
	}

	// Tell the renderer that the geometry of the sea has changed.
	// In fact, in order to maintain the best level of performance, 
	// three.js caches the geometries and ignores any changes
	// unless we add this line
	this.mesh.geometry.verticesNeedUpdate=true;
}

Ground.prototype.move = function() {
  

	this.mesh.rotation.z += Stage.velocity;
}
