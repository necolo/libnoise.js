class Libnoise {
    constructor (length, noise) {
        this.canvasScale = 100;
        this.length = length;
        this.octaves = 1;
        this.noise = noise;
    }

    setCanvasScale (s) {
        this.canvasScale = s;
    }

    setOctaves (n) {
        this.octaves = n;
    }

    coherentNoise (x, amplitudes = 1, frequency = 1) {
        amplitudes = ~~ this.canvasScale / amplitudes;
        frequency *= this.canvasScale;
        return this.noise.simplex2(x / frequency, 1) * amplitudes;
    }

    perlinNoise (x) {
        let y = 0;
        for (let i = 0, f = 1; i < this.octaves; i ++, f *= 2) {
            y += this.coherentNoise(x, undefined, f);
        } 
        return y;
    }
}

module.exports = Libnoise;