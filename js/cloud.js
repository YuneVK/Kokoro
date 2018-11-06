function Cloud(){
	// Create an empty container that will hold the different parts of the cloud
	this.mesh = new THREE.Object3D();
	
	var nBlocs = 5+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){
		var mesh = new THREE.Mesh(GameConfig.geometries.clouds, GameConfig.materials.clouds); 
		
		mesh.position.x = i*5;
		mesh.position.y = Math.random()*1;
		mesh.position.z = Math.random()*15;
		
		var scale = .7 + Math.random()*.9;
		mesh.scale.set(scale,scale,scale);
		
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		
		this.mesh.add(mesh);
	} 
}