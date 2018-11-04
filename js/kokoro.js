function Kokoro(scene) {
  this.propeller = null;
  this.mesh = new THREE.Object3D();
  this.generateModel();
  this.mesh.scale.set(.25,.25,.25);
  this.mesh.position.y = 100;
  
  this.scene = scene;
	
	this.addToScene();
};

Kokoro.prototype.generateModel = function() {



  groupHead = new THREE.Object3D();

  /* BEAK */
  var geometryBeak = new THREE.ConeBufferGeometry(25, 100, 32);
  var materialBeak = new THREE.MeshPhongMaterial({
    color: 0x212121,
    flatShading: true
  });
  var beak = new THREE.Mesh(geometryBeak, materialBeak);
  beak.position.y = 100;
  beak.position.x = 30;
  beak.rotation.z = THREE.Math.degToRad(-30);
  groupHead.add(beak);


  /* HEAD */
  var geometryHead = new THREE.CylinderGeometry(30, 30, 50, 32);
  var materialHead = new THREE.MeshPhongMaterial({
    color: 0x212121,
    flatShading: true
  });
  var head = new THREE.Mesh(geometryHead, materialHead);
  head.castShadow = true;
  head.receiveShadow = true;
  head.position.y = 50;
  head.rotation.x = Math.PI / 2;
  groupHead.add(head);

  /* EYE 1 */
  var geometryEye1 = new THREE.CircleGeometry(20, 20);
  var materialEye1 = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var eye1 = new THREE.Mesh(geometryEye1, materialEye1);
  eye1.position.z = 26;
  eye1.position.y = 50;
  groupHead.add(eye1);

  /* EYE 2 */
  var geometryEye2 = new THREE.CircleGeometry(20, 20);
  var materialEye2 = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  var eye2 = new THREE.Mesh(geometryEye2, materialEye2);
  eye2.material.side = THREE.DoubleSide; // to show all sides
  eye2.position.z = -26;
  eye2.position.y = 50;
  groupHead.add(eye2);

  /* EYE 1 BLACK*/
  var geometryEye1Black = new THREE.CircleGeometry(15, 15);
  var materialEye1Black = new THREE.MeshBasicMaterial({
    color: 0x212121
  });
  var eye1Black = new THREE.Mesh(geometryEye1Black, materialEye1Black);
  eye1Black.position.z = 27;
  eye1Black.position.y = 50;
  groupHead.add(eye1Black);

  /* EYE 2 BLACK */
  var geometryEye2Black = new THREE.CircleGeometry(15, 15);
  var materialEye2Black = new THREE.MeshBasicMaterial({
    color: 0x212121
  });
  var eye2Black = new THREE.Mesh(geometryEye2Black, materialEye2Black);
  eye2Black.material.side = THREE.DoubleSide; // to show all sides
  eye2Black.position.z = -27;
  eye2Black.position.y = 50;
  groupHead.add(eye2Black);

  this.mesh.add(groupHead);


  groupBody = new THREE.Object3D();

  /* NECK */
  var geometryNeck = new THREE.CylinderGeometry(10, 10, 50, 32, 5);
  var materialNeck = new THREE.MeshPhongMaterial({
    color: 0x212121,
    flatShading: true
  });
  var neck = new THREE.Mesh(geometryNeck, materialNeck);
  neck.castShadow = true;
  neck.receiveShadow = true;
  neck.rotation.z = THREE.Math.degToRad(25);
  neck.position.x = 10;
  neck.position.y = 10;
  groupBody.add(neck);

  /* BODY */
  var geometryBody = new THREE.CylinderGeometry(10, 40, 100, 32, 5);
  var materialBody = new THREE.MeshPhongMaterial({
    color: 0x212121,
    flatShading: true
  });
  var body = new THREE.Mesh(geometryBody, materialBody);
  body.castShadow = true;
  body.receiveShadow = true;
  body.rotation.z = THREE.Math.degToRad(25);
  body.position.y = -45;
  body.position.x = 35;
  groupBody.add(body);

  this.mesh.add(groupBody);


  /* WING 1 */
  var geometryWing1 = new THREE.CircleGeometry(85, 32, 0, .8);
  var materialWing1 = new THREE.MeshBasicMaterial({
    color: 0x212121
  });
  wing1 = new THREE.Mesh(geometryWing1, materialWing1);
  wing1.material.side = THREE.DoubleSide; // to show all sides
  wing1.position.x = 10;
  wing1.position.y = -10;
  wing1.rotation.y = THREE.Math.degToRad(180);
  wing1.rotation.x = THREE.Math.degToRad(180);
  wing1.rotation.z = THREE.Math.degToRad(20);
  this.mesh.add(wing1);

  /*
  var radians = THREE.Math.degToRad( degrees );
  var degrees = THREE.Math.radToDeg( radians );
  */

  this.mesh.rotation.z = THREE.Math.degToRad(280);

}

Kokoro.prototype.addToScene = function() {
  this.scene.add(this.mesh);
}