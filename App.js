/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(0);
  const [update, setUpdate] = useState("12:00");


  const getBtc = async () => {

    try {
      const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=4db26338-a470-467c-83d7-b09b53395bed&symbol=BTC");
      const json = await response.json();
      console.log(JSON.stringify(json));
      setData(parseFloat(json.data.BTC.quote.USD.price).toFixed(2));
      let last_update = json.data.BTC.last_updated.slice(11, 16);
      let hora = parseFloat(last_update.slice(0, 2)) - 3;
      let minuto = last_update.slice(3);
      setUpdate(hora + ":" + minuto);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBtc();
  }, []);

  return (
    <View style={estilos.container}>
        <Text style={estilos.title}>Bitcoin Price</Text>
      <View style={estilos.priceContainer}>
        <Image style={estilos.imagem} source={require('./src/assets/img/bitcoin.png')} />
        {isLoading ? <ActivityIndicator /> : (
          <View>
            <Text style={estilos.priceText}>Price: U$ {data}</Text>
            <Text style={estilos.updateText}>Last Update: {update}</Text>
          </View>
        )}
      </View>
      <Text style={estilos.footer}>Desenvolvido por Leonardo Borges</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
  },
  imagem: {
    height: 100,
    marginBottom: 5,
    borderRadius: 50,
    width: 100,
  },
  priceText: {
    color: '#F2F2F2',
    fontSize: 20,
  },
  updateText: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#F2F2F2',
    marginTop: 5,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'orange',
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default App;