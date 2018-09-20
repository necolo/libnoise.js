
const createNoise = require('noisejs');
const noise = new createNoise.Noise(0.5);

class Noise {
    constructor (length) {
        this.canvasScale = 100;
        this.length = length;
        this.octaves = 1;
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
        return noise.simplex2(x / frequency, 1) * amplitudes;
    }

    perlinNoise (x) {
        let y = 0;
        for (let i = 0, f = 1; i < this.octaves; i ++, f *= 2) {
            y += this.coherentNoise(x, undefined, f);
        } 
        return y;
    }
}

function start () {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = '1px solid black';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        canvas.innerText = 'no ctx';
    }

    const origin = [20, 400];
    const length = 700;
    const height = 350;
    const width = length;
    drawCoord(ctx, origin, length, height);

    drawYValue(ctx, origin, 0, '0');

    const myNoise = new Noise(length);
    myNoise.setOctaves(1);

    for (let x = 0; x < length; x += 1 / 100) {
        const y = myNoise.perlinNoise(x);
        drawPoint(ctx, origin, x, y);
    }
}

start();


function drawPoint (ctx, origin, x, y, style = 'black', size = 1) {
    ctx.fillStyle = style;
    ctx.fillRect(x + origin[0], -y + origin[1], size, size);
}

function drawXValue (ctx, origin, x, text, font = '14px serif', style = 'red') {
    ctx.fillStyle = style;
    ctx.font = font;
    ctx.fillText(text, origin[0] + x, origin[1] + 8);
}

function drawYValue (ctx, origin, y, text, font = '14px serif', style = 'red') {
    ctx.fillStyle = style;
    ctx.font = font;
    ctx.fillText(text, origin[0] - 8, origin[1] - y);
}

function drawCoord (ctx, origin, length, height, style = 'red') {
    const size = 1;
    ctx.fillStyle = style;
    drawLine(ctx, origin, [origin[0] + length, origin[1]], size);
    drawLine(ctx, origin, [origin[0], origin[1] - height], size);
}

function drawLine (ctx, from, to, size = 2) {
    ctx.beginPath();
    ctx.moveTo(...from);
    ctx.lineTo(...to);
    ctx.lineTo(to[0] + size, to[1] + size);
    ctx.lineTo(from[0] + size, from[1] + size);
    ctx.fill();
}