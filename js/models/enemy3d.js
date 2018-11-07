function Enemy3D() {
  this.mesh = new THREE.Object3D();
  this.ringTop;
  this.ringBottom;
  this.ball;
  this.light;
  this.isExpanding = false;
}

Enemy3D.prototype.generateModel = function() {
  var texture = new THREE.CanvasTexture( generateTexture() );
  texture.magFilter = THREE.NearestFilter;
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set( 1, 3.5 );

  var material = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    alphaMap: texture,
    alphaTest: 0.1, 
    opacity: 1, 
    transparent: true
  } );

  var materialSphere = GameConfig.materials.enemies.sphere.clone();
  var sphere1 = new THREE.Mesh(GameConfig.geometries.enemies.sphere.lower, materialSphere);
  sphere1.material.side = THREE.DoubleSide;
  //materialSphere.color.multiplyScalar( 1.5 );

  this.mesh.add(sphere1);

  var sphere2 = new THREE.Mesh(GameConfig.geometries.enemies.sphere.lower, materialSphere);
  sphere2.material.side = THREE.DoubleSide;
  sphere2.rotation.z = THREE.Math.degToRad(180);

  this.mesh.add(sphere2);

  

  var ringTopAux = new THREE.Mesh(GameConfig.geometries.enemies.sphere.medium, materialSphere);
  ringTopAux.material.side = THREE.DoubleSide;
  this.ringTop = ringTopAux.clone();
  this.mesh.add(this.ringTop);

  this.ringBottom = new THREE.Mesh(GameConfig.geometries.enemies.sphere.bigger, materialSphere);
  this.ringBottom.material.side = THREE.DoubleSide;
  this.mesh.add(this.ringBottom);

  this.light = new THREE.PointLight(0xB80000, 1, 20);
  this.light.position.set(0, 0, 0);
  this.mesh.add(this.light);

  this.ball = new THREE.Mesh(GameConfig.geometries.enemies.ball, GameConfig.materials.enemies.ball);
  this.ball.material.side = THREE.DoubleSide;
  this.mesh.add(this.ball);


  function generateTexture() {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 2;
    canvas.height = 2;
    var context = canvas.getContext( '2d' );
    context.fillStyle = 'white';
    context.fillRect( 0, 0, 2, 2 );
    return canvas;
  }
}