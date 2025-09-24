# dangerous web

An interactive sketch that creates dynamic geometric pattern effect with parallax effect using p5.js.

![demo](assets/preview-demo.gif)

## Description

This interactive visualization generates a grid of circles that dynamically respond to mouse/touch movement and create an organic, parallax, web-like effect.

## View Online

You can also view this project online in p5.js Web Editor [here](https://editor.p5js.org/torshin5ergey/full/xAtSE39-a) or on this project page [here](https://torshin5ergey.github.io/drafts/langtons-ant-b2s2d8/index.html).

## How to Use in Your Project

1. Clone the repository to your computer.
2. Include `p5.js` in your project.
3. Import `sketch.js` or `sketch-interactive.js` into your project and use it in your code.
4. If needed, you may need to adjust the following lines in the `sketch.js` or `sketch-interactive.js` file to fit your desired canvas size or container element:
```javascript
const canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("canvas");
```
You can modify the dimensions passed to `createCanvas()` to adjust the size of the canvas. Additionally, you may need to change the parent element ID passed to `canvas.parent()`.
Alternatively, you can use the following line and comment out the two lines above to use a fixed canvas size:
```javascript
createCanvas(<WIDTH>, <HEIGHT>);
```
Change `WIDTH` and `HEIGHT` with the desired width and height of the canvas.

## License

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

## Author

Sergey Torshin [@torshin5ergey](https://github.com/torshin5ergey)
