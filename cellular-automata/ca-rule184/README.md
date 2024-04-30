# Cellular Automaton Rule 184 with p5.js

Cellular automaton "Rule 184" in JavaScript using p5.js.

![demo](assets/demo.gif)

## Description
This project implements a cellular automaton [Rule 184](https://en.wikipedia.org/wiki/Rule_184).

## Rules

1. Each cell in a one-dimensional grid can be in one of two states: alive (1) or dead (0).
2. The evolution of the grid is determined by a simple rule:
- If a cell is alive in the current generation and its left neighbor is dead while its right neighbor is alive, the cell will be alive in the next generation.
- Otherwise, the cell will be dead in the next generation.
3. These rules are applied simultaneously to every cell in the grid to generate the next generation.
4. The process repeats for multiple generations, with each new generation being generated based on the previous one according to the same rules.

## How to Run

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.

## View Online

You can also view this project online [here](https://editor.p5js.org/torshin5ergey/full/CHG4PIw2g)

## How to Use in Your Project

1. Clone the repository to your computer.
2. Include `p5.js` in your project.
3. Import `sketch-multicolor.js` into your project and use it in your code.
4. If needed, you may need to adjust the following lines in the `sketch-multicolor.js` file to fit your desired canvas size or container element:
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
