let imgs = [];
let imgsIndex = 0;

// 将loadImage() 函数调用在preload() 里, 加载完成后再使用 - p5.js
function preload() {
  imgs.push(loadImage("imgs/gold-cross-50px.png"));
  imgs.push(loadImage("imgs/green-50px.png"));
  imgs.push(loadImage("imgs/pink-50px.png"));
  imgs.push(loadImage("imgs/white-50px.png"));
  imgs.push(loadImage("imgs/white-cross-50px.png"));
  imgs.push(loadImage("imgs/green-cross-50px.png"));
  imgs.push(loadImage("imgs/n95-50px.png"));
  imgs.push(loadImage("imgs/orange-50px.png"));
  imgs.push(loadImage("imgs/yellow-50px.png"));
}

const mouses = [];
function setup() {
  // 创造一个画布元素 - p5.js
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < 500; i++) {
    mouses.push(new Mouse(imgs[imgsIndex++]));
    // imgsIndex+=1;
    imgsIndex %= imgs.length;
  }
}

const imgBasicWidth = 35;
class Mouse {
  constructor(img) {
    this.img = img;
    this.x = 0;
    this.y = 0;
    this.randomX = Math.random() * 300;
    this.randomY = Math.random() * 300;
    this.speed = Math.random() * 0.00015 + 0.00001;
    this.width = Math.random() * imgBasicWidth + 5;
    this.height = this.width * (img.height / img.width);
  }

  update() {
    this.x =
      ((perlin.simplex3(this.randomX, 0, millis() * this.speed) + 1) / 2) *
      width;
    this.y =
      ((perlin.simplex3(this.randomY, 0, millis() * this.speed) + 1) / 2) *
      height;
  }

  draw() {
    // image(), 在p5 画布上画一个图像
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

function draw() {
  clear();
  mouses.forEach(mouse => {
    mouse.update();
    mouse.draw();
  });
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*
You have to try:

  // imgs.push(loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mouse.png'));
  // imgs.push(loadImage("https://gravatar.com/avatar/b056f3284cbe52542cf612d2772173b3?s=80&d=https://static.codepen.io/assets/avatars/user-avatar-80x80-bdcd44a3bfb9a5fd01eb8b86f9e033fa1a9897c3a15b33adfc2649a002dab1b6.png"));
  // imgs.push(loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mouse.png'), imgLoadDone, imgLoadFail);
  // imgs.push(loadImage("https://gravatar.com/avatar/b056f3284cbe52542cf612d2772173b3?s=80&d=https://static.codepen.io/assets/avatars/user-avatar-80x80-bdcd44a3bfb9a5fd01eb8b86f9e033fa1a9897c3a15b33adfc2649a002dab1b6.png"), imgLoadDone, imgLoadFail);
  // imgs.push(img);
  // imgs.push(loadImage("https://png2.cleanpng.com/sh/2aabdb37f7787f8dc254857a28032cd5/L0KzQoG3UsI5N6hweZH9cnHxg8HokvVvfF5yfdZyY3HvPb7okBsue6Z3f9tsYXywfbL6i702bWZmSdduNXO5QrKBV74zOWg3TqI7NkG4SIOCVsQ1PWQ9SaMCLoDxd1==/transparent-medical-mask-surgical-mask-5e5a1ee5c62a87.2172602615829644538117.png"));
  // imgs.push(loadImage("https://bifan.io/favicon.ico"));
  // img = loadImage("https://s.cdpn.io/profiles/user/3/80.jpg?48")
  
  // imgs.push(loadImage('imgs/mouse.png'));
  // imgs.push(loadImage("imgs/avatar.jpeg"));
*/
