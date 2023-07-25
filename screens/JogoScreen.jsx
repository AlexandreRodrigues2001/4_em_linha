import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const JogoScreen = ({ navigation, route }) => {
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);

  const historico = route.params?.historico || [];
  const setHistorico = route.params?.setHistorico || (() => {});

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const initialBoard = [];
    for (let i = 0; i < 6; i++) {
      initialBoard.push(Array(7).fill(null));
    }
    setBoard(initialBoard);
    setCurrentPlayer('red');
    setWinner(null);
  };

  const handlePress = (row, col) => {
    if (!board[row][col] && !winner) {
      const updatedBoard = [...board];
      const lowestEmptyCell = getLowestEmptyCell(updatedBoard, col);
      if (lowestEmptyCell !== -1) {
        updatedBoard[lowestEmptyCell][col] = currentPlayer;
        setBoard(updatedBoard);
        if (checkWinner(updatedBoard, currentPlayer)) {
          setWinner(currentPlayer);
          setHistorico([...historico, currentPlayer]);
          showResultAlert(currentPlayer);
        } else if (board.flat().every((cell) => cell !== null)) {
          setWinner('Empate');
          setHistorico([...historico, 'Empate']);
          showResultAlert('Empate');
        } else {
          setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
        }
      }
    }
  };

  const showResultAlert = (result) => {
    const message =
      result === 'Empate' ? 'O jogo terminou em empate!' : `O jogador ${result} ganhou!`;
    Alert.alert(
      'Fim do Jogo',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            if (result !== 'Empate') {
              updateHistorico(result);
            }
            navigation.navigate('Home'); // Navigate back to HomeScreen
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateHistorico = (result) => {
    setHistorico([...historico, result]);
  };

  const getLowestEmptyCell = (board, col) => {
    for (let row = 5; row >= 0; row--) {
      if (!board[row][col]) {
        return row;
      }
    }
    return -1;
  };


  const checkWinner = (board, player) => {
    // Check rows
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          board[i][j] === player &&
          board[i][j + 1] === player &&
          board[i][j + 2] === player &&
          board[i][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j] === player &&
          board[i + 2][j] === player &&
          board[i + 3][j] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonals (ascending)
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          board[i][j] === player &&
          board[i - 1][j + 1] === player &&
          board[i - 2][j + 2] === player &&
          board[i - 3][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonals (descending)
    for (let i = 3; i < 6; i++) {
      for (let j = 3; j < 7; j++) {
        if (
          board[i][j] === player &&
          board[i - 1][j - 1] === player &&
          board[i - 2][j - 2] === player &&
          board[i - 3][j - 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    const isPlayable = !cellValue;

    return (
      <View style={styles.cell}>
        <TouchableOpacity
          onPress={() => handlePress(row, col)}
          disabled={!isPlayable || winner !== null}
        >
          <View
            style={[
              styles.circle,
              { backgroundColor: isPlayable ? 'white' : cellValue },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBoard = () => {
    return (
      <View style={styles.boardContainer}>
        {board.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((col, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      </View>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return <Text style={styles.statusText}>Vencedor: {winner}</Text>;
    } else if (board.flat().every((cell) => cell !== null)) {
      return <Text style={styles.statusText}>Empate!</Text>;
    } else {
      const currentPlayerText = currentPlayer === 'red' ? '🔴' : '🔵';
      return <Text style={styles.statusText}>Jogador Atual: {currentPlayerText}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderStatus()}
      {renderBoard()}
      <TouchableOpacity style={styles.button} onPress={initializeBoard}>
        <Text style={styles.buttonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 20,
    marginBottom: 20,
  },
  boardContainer: {
    borderWidth: 4,
    borderColor: '#8B4513', // Brown color for wooden board
    padding: 5,
    backgroundColor: '#8B4513', // Background color for wooden board
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  button: {
    marginTop: 10,
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default JogoScreen;