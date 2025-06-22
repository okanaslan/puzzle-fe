# Puzzle Game

A simple puzzle game built with React, Vite, and Tailwind CSS. The game features a grid-based logic puzzle inspired by nonograms (picross), where you fill in cells according to the numeric hints on the sides to reveal a hidden pattern.

## How to Play

- Choose a difficulty level to generate a new puzzle.
- Use the hints on the top and left of the grid to figure out which cells should be filled.
- Click a cell to fill it, double-click (or double-tap on mobile) to mark it as crossed out.
- When you complete the puzzle correctly, the solution will be revealed in green.

## Features

- Multiple difficulty levels with randomly generated puzzles.
- Responsive design for desktop and mobile.
- Simple, clean interface with clear visual feedback.
- Playable entirely in your browser—no installation needed.

## Tools

- [Vite](https://vitejs.dev/) - Fast build tool and development server.
- [React](https://reactjs.org/) - Library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
- [Lucide Icons](https://lucide.dev/) - Open-source icon collection.

Enjoy solving puzzles and challenge yourself!

## Example Usage

```javascript
<!doctype html>
<html>
  <body>
    <iframe src="https://unpkg.com/puzzle-game" style="width: 100%; height: 100vh; border: none"></iframe>
  </body>
</html>
```
