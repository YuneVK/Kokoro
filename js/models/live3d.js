function Live3D() {
  this.mesh = new THREE.Object3D();
  this.ringTop;
  this.ringBottom;
  //this.ball;
  this.light;
  this.isExpanding = false;
}

Live3D.prototype.generateModel = function() {
  var material = new THREE.MeshBasicMaterial( {color: 0x424242} );
  material.transparent = true;
  material.opacity = 1;
  material.needsUpdate = true;


  var geometry3 = new THREE.SphereGeometry( 60, 32, 32, 0, 6.3, 1.55, .1 );
  this.ringTop = new THREE.Mesh( geometry3, material );
  this.ringTop.material.side = THREE.DoubleSide;
  this.ringTop.rotation.x = THREE.Math.degToRad(90);
  //this.mesh.add(this.ringTop);

  var geometry4 = new THREE.SphereGeometry( 60, 32, 32, 0, 6.3, 1.55, .1 );
  this.ringBottom = new THREE.Mesh( geometry4, material );
  this.ringBottom.material.side = THREE.DoubleSide;
  //this.mesh.add(this.ringBottom);

  var x = 0, y = 0;

var heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );



var geometryH = new THREE.ShapeGeometry( heartShape );
var materialH = new THREE.MeshBasicMaterial( { color: 0xfe3500, side: THREE.DoubleSide } );
var meshH = new THREE.Mesh( geometryH, materialH ) ;

  this.mesh.add(meshH);
}