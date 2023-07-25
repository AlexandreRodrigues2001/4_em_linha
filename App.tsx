import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import JogoScreen from './screens/JogoScreen';
import HistoricoScreen from './screens/HistoricoScreen';

const Stack = createStackNavigator();

const App = () => {
  const [historico, setHistorico] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Jogo"
          component={JogoScreen}
          initialParams={{ historico, setHistorico }}
        />
        <Stack.Screen
          name="Historico"
          component={HistoricoScreen}
          initialParams={{ historico }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
