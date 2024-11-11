# Tic-Tac-Toe Web Game

This is a web-based Tic-Tac-Toe game where you can play against a friend or challenge an AI. The game is simple, interactive, and provides an engaging experience for both casual players and those looking to challenge a computer opponent.

## Features

- **Two Game Modes**:
  - **2 Player Game**: Play with a friend, with Player X starting the game.
  - **VS Computer**: Choose whether you will be Player X or Player O to play against an AI opponent.

- **Score Tracking**:
  - Every time a player wins, their score is updated automatically.
  - The game tracks scores for both Player X and Player O.

- **End of Round Options**:
  - After a round ends, you can choose to continue to the next round or stop the game.
  - If you stop, the player with the highest score is declared the winner.

- **Restart Option**: After ending the game, you have the option to restart and play again.

## Code Design

- **Factory Functions**: The game logic is built using factory functions to create reusable and independent game objects (such as players and the game board), ensuring modularity and flexibility.

- **Closures**: Closures are used to maintain private state and provide encapsulation, making the game state (like scores and moves) securely accessible and manipulable only within appropriate scopes.

- **Module Pattern**: The application is structured with the Module Pattern to organize the code into self-contained modules. This allows for better maintainability, reusability, and separation of concerns.
