import React from "react";
import Board from "./components/Board";
import { Props, State, ChipsPositions } from "./components/App/types.ts";
import styles from "./components/App.module.css";
export default class App extends React.PureComponent<Props, State> {
  state: State = {
    chipsPositions: {},
    playerTurn: "red",
    gameStatus: "It's red's turn"
  };
  calculateStatus = (playerTurn: string, chipsPositions: ChipsPositions): string => {
    const { columns, rows } = this.props;
    // Check four in a row horizontally
    for (let row = 0; row < rows; row++) {
      let repetitionCountStatus = { playerChip: "", count: 0 };
      for (let column = 0; column < columns; column++) {
        const chip = chipsPositions[`${row}:${column}`];

        // If there is a chip in that position, and belongs
        // to a player, count that chip for that player
        // (either increase the count or start over)
        if (chip && chip === repetitionCountStatus.playerChip) {
          repetitionCountStatus.count++;
        } else {
          repetitionCountStatus = { playerChip: chip, count: 1 };
        }
        // If the count for a player is 4, that player won
        if (repetitionCountStatus.count === 4) {
          return `Player ${repetitionCountStatus.playerChip} won!`;
        }
      }
    }
    // Check four in a row vertically
    for (let column = 0; column < columns; column++) {
      let repetitionCountStatus = { playerChip: "", count: 0 };

      for (let row = 0; row < rows; row++) {
        const chip = chipsPositions[`${row}:${column}`];
        // If there is a chip in that position, and belongs
        // to a player, count that chip for that player
        // (either increase the count or start over)
        if (chip && chip === repetitionCountStatus.playerChip) {
          repetitionCountStatus.count++;
        } else {
          repetitionCountStatus = { playerChip: chip, count: 1 };
        }
        // If the count for a player is 4, that player won
        if (repetitionCountStatus.count === 4) {
          return `Player ${repetitionCountStatus.playerChip} won!`;
        }
      }
    }
    // TODO: Check four in a row diagonally

    return `It's ${playerTurn}'s turn`;
  };
  handleClick = (tileId: string) => {
    const { chipsPositions, playerTurn } = this.state;
    // const column = parseInt(tileId.split(":")[1]);
    let lastEmptyTileId = tileId;
    // If there is no empty tile in the column, do nothing
    if (!lastEmptyTileId) {
      return;
    }
    // Add chip to empty tile
    const newChipsPositions = {
      ...chipsPositions,
      [lastEmptyTileId]: playerTurn
    };
    // Change player turn
    const newPlayerTurn = playerTurn === "red" ? "yellow" : "red";
    // Calculate game status
    const gameStatus = this.calculateStatus(newPlayerTurn, newChipsPositions);
    // Save new state
    this.setState({ chipsPositions: newChipsPositions, playerTurn: newPlayerTurn, gameStatus });
  };

  renderBoard() {
    const { columns, rows } = this.props;
    const { chipsPositions } = this.state;
    return (
        <Board
            columns={columns}
            rows={rows}
            chipsPositions={chipsPositions}
            onTileClick={this.handleClick}
        />
    );
  }
  renderStatusMessage() {
    const { gameStatus } = this.state;
    return <div className={styles.statusMessage}>{gameStatus}</div>;
  }
  render() {
    return (
        <div className={styles.app}>
          {this.renderBoard()}
          {this.renderStatusMessage()}
        </div>
    );
  }
}