import * as THREE from "three"

import Perlin from "./perlin/perlin.js"


(function() {
    this.setup();
    this.animate(0, 0);
}).bind({
    setup : function() {
        this.perlin = new Perlin();


    },

    update : function(t, dt) {
        this.perlin.update(dt);
        this.perlin.renderForDebug();

    },

    animate : function(oldt, nowt) {
        this.update(nowt * 0.001, (nowt - oldt) * 0.001);
        requestAnimationFrame(this.animate.bind(this, nowt));
    }
})();