let GameConfig = {
  colors: {
    blue: 0x68c3c0,
    bgBlue: 0x68c0e9,
    bgDarkBlue: 0x2673ad, 
    black: 0x212121
  },
  
  materials: {
    kokoro: {
      body: new THREE.MeshPhongMaterial({color: 0x212121, flatShading: true}), 
      wings: new THREE.MeshBasicMaterial({color: 0x212121, side: THREE.DoubleSide}), 
      eyes: {
        iris: new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}),
        pupile: new THREE.MeshBasicMaterial({color: 0x212121, side: THREE.DoubleSide})
      }
    }
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
    }
  }

}

