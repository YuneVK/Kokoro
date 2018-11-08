function Sky(scene){
  // choose a number of clouds to be scattered in the sky
  this.nClouds = 25;
  
	// Create an empty container
  this.mesh = new THREE.Object3D();
  this.generateClouds();
	this.mesh.position.y = -600;


  this.scene = scene;
}

Sky.prototype.generateClouds = function() {
  // To distribute the clouds consistently,
	// we need to place them according to a uniform angle
	var stepAngle = Math.PI*2 / this.nClouds;
	
	// create the clouds
	for(var i=0; i<this.nClouds; i++){
		var cloud = new Cloud();

		// set the rotation and the position of each cloud;
		// for that we use a bit of trigonometry
		var finalAngle = stepAngle*i; // this is the final angle of the cloud
		var distanceFromCenter = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

		// Trigonometry!!! I hope you remember what you've learned in Math :)
		// in case you don't: 
		// we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		cloud.mesh.position.y = Math.sin(finalAngle)*distanceFromCenter;
		cloud.mesh.position.x = Math.cos(finalAngle)*distanceFromCenter;

		// rotate the cloud according to its position
		cloud.mesh.rotation.z = finalAngle + Math.PI/2;

		// for a better result, we position the clouds 
		// at random depths inside of the scene
		cloud.mesh.position.z = -300-Math.random()*250;
		
		// we also set a random scale for each cloud
		var scale = 1+Math.random()*2;
		cloud.mesh.scale.set(scale,scale,scale);

		// do not forget to add the mesh of each cloud in the scene
		this.mesh.add(cloud.mesh);  
	}  
}

Sky.prototype.addToScene = function() {
  this.scene.add(this.mesh);
}

Sky.prototype.generateIsland = function() {
	this.mesh.add(this.island.object);
	this.island.added = true;
}