function Lights(scene) {
  this.hemisphereLight = null;
  this.createHemisphereLight();

  this.shadowLight = null;
  this.createShadowLight();

  this.scene = scene;
}

Lights.prototype.createHemisphereLight = function () {
  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  //this.hemisphereLight = new THREE.HemisphereLight(0x272f3d,0xfefaed, .2);
  //this.hemisphereLight = new THREE.AmbientLight(0x111122)

}

Lights.prototype.createShadowLight = function () {
  // A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	
	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Set the direction of the light  
	this.shadowLight.position.set(150, 350, 350);
	
	// Allow shadow casting 
	this.shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	this.shadowLight.shadow.camera.left = -400;
	this.shadowLight.shadow.camera.right = 400;
	this.shadowLight.shadow.camera.top = 400;
	this.shadowLight.shadow.camera.bottom = -400;
	this.shadowLight.shadow.camera.near = 1;
	this.shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	this.shadowLight.shadow.mapSize.width = 2048;
	this.shadowLight.shadow.mapSize.height = 2048;
	
}

Lights.prototype.addToScene = function () {
  // to activate the lights, just add them to the scene
  //this.scene.add(this.hemisphereLight);
  //this.scene.add(this.shadowLight);


  globalLight = new THREE.AmbientLight(0xffffff, .9);

  shadowLight = new THREE.DirectionalLight(0xffffff, 1);
  shadowLight.position.set(-30, 40, 20);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 2000;
  shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

  this.scene.add(globalLight);
  this.scene.add(shadowLight);

}