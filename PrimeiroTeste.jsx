import React, { useState } from 'react'
import { Text, Button } from 'react-native'
import SegundoTeste from './SegundoTeste'

const PrimeiroTeste = () => {
    const texto = "PrimeiroTeste";
    const [counter, setCounter] = useState(0);
  
    const incrementCounter = () => {
      setCounter(counter + 1);
    };
  
    const decrementCounter = () => {
      setCounter(counter - 1);
    };
  
    return (
      <>
        <Text>{texto}</Text>
        <SegundoTeste texto="Segundo" />
        <Button title="Incrementar" onPress={incrementCounter} />
        <Button title="Decrementar" onPress={decrementCounter} />
        <Text style = {{fontSize: 80}}>{ counter }</Text>
      </>
    );
  };
export default PrimeiroTeste

