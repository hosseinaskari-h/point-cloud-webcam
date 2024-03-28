let video;

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.size(width / 10, height / 10);
  video.hide();
}

function draw() {
  background(0);

  video.loadPixels();

  // Processing each pixel
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const index = (x + y * video.width) * 4;
      const r = video.pixels[index + 0];
      const g = video.pixels[index + 1];
      const b = video.pixels[index + 2];

      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        const bright = brightness(color(r, g, b));
        // Calculating a z-coordinate based on brightness
        let z = map(bright, 0, 255, -100, 100);

        // Mirroring and rendering a point for each pixel
        push();
        // Flipping the x-coordinate for mirroring
        translate(width - x * 10 - width / 2, y * 10 - height / 2, z);
        fill(r, g, b);
        noStroke();
        sphere(2); // Adjust the size of the sphere
        pop();
      }
    }
  }
}
