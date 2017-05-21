
import THREE from 'n3d-threejs'

class Flow {
  constructor(rdrr, width, height, grid) {
    this.width = width == undefined ? 512 : width;
    this.height = height == undefined ? 512 : height;

    this.rdrr = rdrr;


    this.texture = new THREE.WebGLRenderTarget(this.width, this.height, {
      minFilter : THREE.LinearFilter,
      magFilter : THREE.LinearFiletr,
    });

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : {
          unif_texture : { type : "t", value : grid.getTexture()},
          unif_resolution : { type : "2f", value : [ grid.getWidth(), grid.getHeight()] }
        },
        fragmentShader : `
        #define PI ` + Math.PI + `
        uniform sampler2D unif_texture;
        uniform vec2 unif_resolution;

        varying vec2 vtex;

        void main() {

          vec2 offsetX = vec2(1.0, 0.0) / unif_resolution;
          vec2 offsetY = vec2(0.0, 1.0) / unif_resolution;

          vec4 data00 = texture2D(unif_texture, vtex + offsetX * 0.0 + offsetY * 0.0);
          vec4 data01 = texture2D(unif_texture, vtex + offsetX * 0.0 + offsetY * 1.0);
          vec4 data10 = texture2D(unif_texture, vtex + offsetX * 1.0 + offsetY * 0.0);
          vec4 data11 = texture2D(unif_texture, vtex + offsetX * 1.0 + offsetY * 1.0);

          vec2 grid00 = vec2(
            data00.x * sin(data00.y * 2.0 * PI),
            data00.x * cos(data00.y * 2.0 * PI)
          );
          vec2 grid01 = vec2(
            data01.x * sin(data01.y * 2.0 * PI),
            data01.x * cos(data01.y * 2.0 * PI)
          );
          vec2 grid10 = vec2(
            data10.x * sin(data10.y * 2.0 * PI),
            data10.x * cos(data10.y * 2.0 * PI)
          );
          vec2 grid11 = vec2(
            data11.x * sin(data11.y * 2.0 * PI),
            data11.x * cos(data11.y * 2.0 * PI)
          );
          vec2 grid = (vtex * unif_resolution - floor(vtex * unif_resolution));

          float ty = mix(
            dot(grid00, vec2(0.0 + grid.x , 0.0 + grid.y)),
            dot(grid10, vec2(1.0 - grid.x , 0.0 + grid.y)), grid.x);
          float by = mix(
            dot(grid01, vec2(0.0 + grid.x , 1.0 - grid.y)),
            dot(grid11, vec2(1.0 - grid.x , 1.0 - grid.y)), grid.x);
          float va = mix(ty, by, grid.y);

          gl_FragColor = vec4(vec3(va), 1.0);
        }
        `,
        vertexShader : `
        varying vec2 vtex;
        void main() {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `
      })
    ));
  }

  update(dt) {
    this.rdrr.render(this.scene, this.camera, this.texture);
  }

  getTexture() { return this.texture; }
}


export default Flow
