import THREE from 'n3d-threejs'

class Perlin {
  constructor(rdrr) {
    if(rdrr == undefined) {
      this.rdrr = new THREE.WebGLRenderer({alpha : true});
      this.rdrr.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.rdrr.domElement);
    } else { this.rdrr = rdrr; }
    // console.log(THREE);

  }
}

export default Perlin
