import THREE from 'n3d-threejs'
import Grid from './src/grid.js'


class Perlin {
  constructor(rdrr, width, height) {
    if(rdrr == undefined) {
      this.rdrr = new THREE.WebGLRenderer({alpha : false});
      this.rdrr.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.rdrr.domElement);
    } else { this.rdrr = rdrr; }
    // console.log(THREE);


    this.grid = new Grid(this.rdrr, width, height);

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({ map : this.grid.getTexture() })
    ));
  }

  update(dt) {
    this.grid.update(dt);
  }

  renderForDebug() {
    this.rdrr.render(this.scene, this.camera);
  }
}

export default Perlin
