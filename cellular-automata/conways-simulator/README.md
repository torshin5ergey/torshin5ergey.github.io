# John Conway's Game of Life with p5.js

John Conway's famous cellular automaton "Game of Life" in JavaScript using p5.js.

![thumbnail](assets/preview-demo.gif)

## Description

Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) is a cellular automaton devised by the British mathematician John Horton Conway in 1970. The simulation consists of a grid of cells, each of which can be in one of two states: alive or dead. At each step of the simulation, cells transition between these states according to certain rules.

## Rules

1. **Survival:** A live cell survives if it has 2 or 3 neighbors (other live cells). Otherwise, it dies due to "loneliness" or "overcrowding".
2. **Birth:** An empty (dead) cell with exactly 3 live neighbors becomes alive.

## Variations

- **Conways vanilla** implements classic Game of Life rules.
![game of life classic](assets/demo-conways-vanilla.gif)

- **Conways generations** extends classic Game of Life rules with the *generations* or *ages* rule:

    **Generations:** Each cell can have a value between 0 and a specified maximum (10 for this example). The brightness of a cell's color represents its *age* or *generation* level. Cells age based on the rules defined by their neighbors in the grid, with brighter cells indicating a higher generation value.
![game of life classic](assets/demo-conways-generations.gif)

## View Online

You can also view this project online in p5.js Web Editor:
- [Conways vanilla](https://editor.p5js.org/torshin5ergey/full/GNVlnPY3O)
- [Conways generations]()

This projects also available on its own project page [here](https://torshin5ergey.github.io/cellular-automata/conways-simulator/index.html).

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
