class Noise {
    constructor (length, noise) {
        this.scale = 100;
        this.length = length;
        this.octaves = 1;
        this.noise = noise;
        this.persistence = 1;
        this.lacunarity = 1;
    }

    setScale (s) {
        this.scale = s || 100;
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

    coherentNoise1 (x, frequency = 1, amplitudes = 1) {
        amplitudes *= this.scale;
        frequency = this.scale / frequency;
        return this.noise.simplex2(x / frequency, 1) * amplitudes;
    }

    coherentNoise2 (x, y, frequency = 1, amplitudes = 1) {
        amplitudes *= this.scale;
        frequency = this.scale / frequency;
        return this.noise.simplex2(x / frequency, y / frequency) * amplitudes;
    }

    noise1 (x) {
        let r = 0;
        for (let i = 0, f = 1; i < this.octaves; i ++, f *= 2) {
            r += this.coherentNoise1(x, f * this.lacunarity, 1 / f * this.persistence);
        } 
        return r;
    }

    noise2 (x, y) {
        let r = 0;
        for (let i = 0, f = 1; i < this.octaves; i ++, f *= 2 ) {
            r += this.coherentNoise2(x, y, f * this.lacunarity, 1 / f * this.persistence);
        }
        return r;
    }
}

module.exports = Noise;