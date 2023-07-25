import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Jogo 4 em Linha!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Jogo')}
        >
          <Text style={styles.buttonText}>Iniciar Jogo</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacing} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Historico')}
        >
          <Text style={styles.buttonText}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  buttonSpacing: {
    height: 10,
  },
});

export default HomeScreen;
