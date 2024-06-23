# Chris Langton's Ant with p5.js

Chris Langton's cellular automaton "Langton's ant" in JavaScript using p5.js.

![demo](assets/multicolor-demo.gif)

## Description
This project implements [Langton's ant](https://en.wikipedia.org/wiki/Langton's_ant), a cellular automaton devised by Chris Langton in 1986. Langton's ant is a two-dimensional Turing machine with very simple rules but exhibits complex emergent behavior.

## Rules

1. At a **zero** square, turn 90° right, flip the color of the square, move forward one unit.
2. At a **nonzero** square, turn 90° left, flip the color of the square, move forward one unit.

## How to Run

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.

## View Online

You can also view this project online [here](https://editor.p5js.org/torshin5ergey/full/E5ZIZMqEi)

## How to Use in Your Project

1. Clone the repository to your computer.
2. Include `p5.js` in your project.
3. Import `sketch-singlecolor.js` into your project and use it in your code.
4. If needed, you may need to adjust the following lines in the `sketch-singlecolor.js` file to fit your desired canvas size or container element:
```javascript
let canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
canvas.parent("canvas");
```
You can modify the dimensions passed to createCanvas() to adjust the size of the canvas. Additionally, you may need to change the parent element ID passed to canvas.parent().
Alternatively, you can use the following line and comment out the two lines above to use a fixed canvas size:
```javascript
createCanvas(CANVAS_W, CANVAS_H);
```
Change CANVAS_W and CANVAS_H with the desired width and height of the canvas.

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
