import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HistoricoScreen = () => {
  const route = useRoute();
  const { historico } = route.params || { historico: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Partidas</Text>
      {historico.map((item, index) => (
        <Text key={index} style={styles.item}>
          Partida {index + 1}: {item === 'red' ? 'Vermelho' : item === 'blue' ? 'Azul' : 'Empate'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HistoricoScreen;
