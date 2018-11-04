function Cloud(){
	// Create an empty container that will hold the different parts of the cloud
	this.mesh = new THREE.Object3D();
	
	// create a cube geometry;
	// this shape will be duplicated to create the cloud
	var geom = new THREE.BoxGeometry(20,20,20);
	
	// create a material; a simple white material will do the trick
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.white,  
	});
	
	// duplicate the geometry a random number of times
	var nBlocs = 3+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){
		
		// create the mesh by cloning the geometry
		var mesh = new THREE.Mesh(geom, mat); 
		
		// set the position and the rotation of each cube randomly
		mesh.position.x = i*15;
		mesh.position.y = Math.random()*10;
		mesh.position.z = Math.random()*10;
		mesh.rotation.z = Math.random()*Math.PI*2;
		mesh.rotation.y = Math.random()*Math.PI*2;
		
		// set the size of the cube randomly
		var scale = .1 + Math.random()*.9;
		mesh.scale.set(scale,scale,scale);
		
		// allow each cube to cast and to receive shadows
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		
		// add the cube to the container we first created
		this.mesh.add(mesh);
	} 
}