# Maze Rules with p5.js

**Maze rule** cellular automations in JavaScript using p5.js.

![demo](assets/preview-demo.gif)

## Description

This project visualizes [cellular automation](https://en.wikipedia.org/wiki/Cellular_automaton) rule **B3/S12345**, a one-dimensional binary cellular automaton. The rule is applied to a grid of cells, each of which can be either 0 (white) or 1 (black) (reverted in my color scheme). At each step of the simulation, cells transition between these states according to certain rules.

## Rules

The B3/S12345 rule is a specific type of cellular automaton rule. In this notation, **B** stands for **birth** and **S** stands for **survival**. The numbers following **B** indicate the number of live neighbors required for a dead cell to become alive (birth), and the numbers following **S** indicate the number of live neighbors required for a live cell to remain alive (survival).
- B3: A dead cell becomes alive if it has exactly 3 live neighbors.
- S12345: A live cell survives if it has 1, 2, 3, 4, or 5 live neighbors.

This rule often produces patterns that resemble mazes or labyrinths, hence its name. The specific conditions for birth and survival create structures that are both stable and intricate, mimicking the complexity found in natural systems.

## View Online

You can also view this project online in p5js Web Editor [here](https://editor.p5js.org/torshin5ergey/full/45gQMxamt).

## How to Use in Your Project

1. Clone the repository to your computer.
2. Include `p5.js` in your project.
3. Import `cellular-automata/maze-rule/sketch.js` into your project and use it in your code.
4. Customize.
    - If needed, you may need to adjust the following lines in the `sketch.js` file to fit your desired canvas size or container element:
        ```javascript
        let canvas = createCanvas(windowWidth, windowHeight);
        canvas.parent("canvas");
        ```
    - You can modify the dimensions passed to `createCanvas()` to adjust the size of the canvas. Additionally, you may need to change the parent element ID passed to `canvas.parent()`. Alternatively, you can use the following line and comment out the two lines above to use a fixed canvas size:
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
