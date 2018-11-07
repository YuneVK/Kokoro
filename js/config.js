let GameConfig = {
  colors: {
    blue: 0x68c3c0,
    bgBlue: 0x68c0e9,
    bgDarkBlue: 0x2673ad, 
    black: 0x212121
  },
  
  materials: {
    kokoro: {
      body: new THREE.MeshPhongMaterial({color: 0xfafafa, shading:THREE.FlatShading }), 
      wings: new THREE.MeshBasicMaterial({color: 0x212121, side: THREE.DoubleSide}), 
      eyes: {
        iris: new THREE.MeshBasicMaterial({color: 0xfefaed, side: THREE.DoubleSide}),
        pupile: new THREE.MeshBasicMaterial({color: 0x212121, side: THREE.DoubleSide})
      }
    }, 
    clouds: new THREE.MeshPhongMaterial({color: 0xffffff,flatShading: true}),
    enemies: {
      sphere: new THREE.MeshPhongMaterial({color: 0x5414aa,transparent: true,opacity: 01,needsUpdate: true}),
      ball: new THREE.MeshBasicMaterial({color: 0xeca2df})
    }, 
    ground: new THREE.MeshPhongMaterial({color: 0x597080,transparent:true,opacity:1,flatShading:true,})
  }, 

  geometries: {
    kokoro: {
      beak: new THREE.ConeBufferGeometry(25, 100, 32), 
      head: new THREE.CylinderGeometry(30, 30, 50, 32),
      eyes: {
        iris: new THREE.CircleGeometry(20, 20),
        pupiles: {
          normal: new THREE.CircleGeometry(15, 15),
          crossed: new THREE.PlaneGeometry(5, 32)
        }
      }, 
      neck: new THREE.CylinderGeometry(10, 10, 50, 32, 5), 
      body: new THREE.CylinderGeometry(10, 40, 100, 32, 5), 
      wings: new THREE.CircleGeometry(85, 32, 0, .8)
    }, 
    clouds: new THREE.OctahedronGeometry(10,2), 
    enemies: {
      sphere: {
        lower: new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 0, .8),
        medium: new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 1.15, .25),
        bigger: new THREE.SphereGeometry(60, 32, 32, 0, 6.3, 1.7, .25)
      }, 
      ball: new THREE.SphereGeometry(10, 32, 32)
    }, 
    ground: new THREE.CylinderGeometry(600,600,800,40,10)
  }
}
