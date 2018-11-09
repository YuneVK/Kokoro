function Island(scene) {
  this.object;
  this.rad = 0;
  this.added = false;

  this.scene = scene;

  var onProgress = function ( xhr ) {

    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
    }
  };

  var onError = function () { };

  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

  new THREE.MTLLoader()
    .setPath( './models/' )
    .load( 'low-poly-mill.mtl', function ( materials ) {

      materials.preload();

      new THREE.OBJLoader()
        .setMaterials( materials )
        .setPath( './models/' )
        .load( 'low-poly-mill.obj', function ( object ) {

          object.position.y = 260;
          object.position.x = 1200;
          object.position.z = -500;

          this.scene.add( object );
          this.object = object;
          
        }.bind(this), onProgress, onError );
      }.bind(this) );
}
  
Island.prototype.render = function() {
    this.object.rotation.y += THREE.Math.degToRad(0.3);
    this.object.position.x -= 2;

    if (this.object.position.x < -1200) this.object.position.x = 1200;
}