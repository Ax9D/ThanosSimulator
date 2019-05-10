var WIDTH, HEIGHT;
var sWIDTH, sHEIGHT;
let imgPth = "saitama.jpg";
let particles = [];

let particleSize = 20;

let img;

let hasSnapped = false;
let mX, mY = 0;
let offsetX, offsetY;

function distanceS(x1, y1, x2, y2) {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}
function preload() {
    img = loadImage(imgPth);
}
function averageSubBlock(img, xf, yf, xl, yl) {

    let totCol = [0, 0, 0];
    let col;
    for (let i = xf; i < xl; i++) {
        for (let j = yf; j < yl; j++) {
            col = img.get(i, j);
            totCol[0] += col[0];
            totCol[1] += col[1];
            totCol[2] += col[2];
        }
    }
    let numPixels = (xl - xf) * (yl - yf);
    return [totCol[0] / numPixels, totCol[1] / numPixels, totCol[2] / numPixels];
}
function sampleDown(img, pixSiz) {
    let particles = [];

    img.loadPixels();
    let xSquareLim = Math.floor(img.width / pixSiz) * pixSiz;
    let ySquareLim = Math.floor(img.height / pixSiz) * pixSiz;

    let xC = Math.ceil(img.width / pixSiz);
    let yC = Math.ceil(img.height / pixSiz);

    sWIDTH = particleSize * xC;
    sHEIGHT = particleSize * yC;

    WIDTH = sWIDTH * 2;
    HEIGHT = sHEIGHT * 2;

    offsetX = WIDTH / 2 - particleSize * xC / 2;
    offsetY = HEIGHT / 2 - particleSize * yC / 2

    let i;
    let x, y = 0;
    for (i = 0; i < ySquareLim; i += pixSiz, y += particleSize) {
        let j;
        for (j = 0; j < xSquareLim; j += pixSiz, x += particleSize) {
            particles.push(new Particle(offsetX + x, offsetY + y, particleSize, particleSize, averageSubBlock(img, j, i, j + pixSiz, i + pixSiz)));
        }
        if (j < img.width) {
            particles.push(new Particle(offsetX + x, offsetY + y, particleSize, particleSize, averageSubBlock(img, j, i, img.width, i + pixSiz)));
        }
        x = 0;
    }
    if (i < img.height) {
        let j = 0;
        for (j = 0; j < xSquareLim; j += pixSiz, x += particleSize) {
            particles.push(new Particle(offsetX + x, offsetY + y, particleSize, particleSize, averageSubBlock(img, j, i, j + pixSiz, img.height)));
        }
        if (j < img.width)
            particles.push(new Particle(offsetX + x, offsetY + y, particleSize, particleSize, averageSubBlock(img, j, i, img.width, i + pixSiz)));
    }
    return [particles, xC, yC];
}
function setup() {
    let imgvalPair = sampleDown(img, 10);
    particles = imgvalPair[0];
    createCanvas(WIDTH, HEIGHT);

    document.getElementById("defaultCanvas0").addEventListener('click', function () {

        if (!hasSnapped) {
            hasSnapped = true;
            mX = 300+WIDTH / 4;
            mY = 600+HEIGHT / 4;
        }
    });
}
function draw() {
    background(57);
    noStroke();
    if (!hasSnapped) {
        image(img, offsetX, offsetY, sWIDTH, sHEIGHT);
    }
    else {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
    }
    //fill(255,0,0);
    //rect(mX,mY,20,20);
}