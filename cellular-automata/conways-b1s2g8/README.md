# Chris Langton's Ant (rule b2s2d8) with p5.js

Conway's "Game of Life" cellular automaton variation with B1S2G8 rule in JavaScript using p5.js.

![demo](assets/preview-demo.gif)

## Description
This project implements John Conway's [Game of Life](https://w.wiki/3kQz) cellular automaton with multi-state cells (0-8) that simulates a gradual dying process. The rules are based on neighbor counts.

## Rules

1. A cell **becomes fully alive** (state 8) if it has exactly one living neighbor (state 8).
2. A living cell **remains alive** if it has exactly two living neighbors.
3. Otherwise, the cell's state **decreases by one** (simulating gradual death).

## View Online

You can also view this project online in p5.js Web Editor [here](https://editor.p5js.org/torshin5ergey/full/m_3P4vz-y) or on this project page [here](https://torshin5ergey.github.io/cellular-automata/conways-b1s2g8/index.html).

## How to Use in Your Project

1. Clone the repository to your computer.
2. Include `p5.js` in your project.
3. Import `sketch-pulsar-mono.js`, `sketch-pulsar-color.js` or `sketch-frost-pattern.js` into your project and use it in your code.
4. If needed, you may need to adjust the following lines in the `sketch-pulsar-mono.js`, `sketch-pulsar-color.js` or `sketch-frost-pattern.js` file to fit your desired canvas size or container element:
```javascript
let canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("canvas");
```
You can modify the dimensions passed to `createCanvas()` to adjust the size of the canvas. Additionally, you may need to change the parent element ID passed to `canvas.parent()`.
Alternatively, you can use the following line and comment out the two lines above to use a fixed canvas size:
```javascript
createCanvas(CANVAS_W, CANVAS_H);
```
Change `CANVAS_W` and `CANVAS_H` with the desired width and height of the canvas.

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
