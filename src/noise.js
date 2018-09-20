class Libnoise {
    constructor (length, noise) {
        this.canvasScale = 100;
        this.length = length;
        this.octaves = 1;
        this.noise = noise;
        this.persistence = 1;
        this.lacunarity = 1;
    }

    setCanvasScale (s) {
        this.canvasScale = s || 100;
    }

    setOctaves (o) {
        this.octaves = o || 1;
    }

    setPersistence (p) {
        this.persistence = p || 1;
    }

    setLacunarity (l) {
        this.lacunarity = l || 1;
    }

    coherentNoise (x, frequency = 1, amplitudes = 1) {
        amplitudes *= this.canvasScale;
        frequency = this.canvasScale / frequency;
        return this.noise.simplex2(x / frequency, 1) * amplitudes;
    }

    perlinNoise (x) {
        let y = 0;
        for (let i = 0, f = 1; i < this.octaves; i ++, f *= 2) {
            y += this.coherentNoise(x, f * this.lacunarity, 1 / f * this.persistence);
        } 
        return y;
    }
}

module.exports = Libnoise;