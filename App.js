import React from 'react';
import { FlatList, StyleSheet, Text, View, Linking, Image } from 'react-native';
import Header from './src/components/header';
import Button from './src/components/Button';

export default class App extends React.Component {
  state = {
    data: []
  };
  componentWillMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=API_KEY");
    const json = await response.json();
    this.setState({ data: json.articles })
  };
  render() {
    return (

      <View style={styles.container}>
        <Header headerText={'CryptoNews'} />
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <View style={styles.container2}>
              <Text style={styles.textStyle}>
                {item.title}.
              </Text>

              <Text style={styles.textStyleSub}>
                Date: {item.publishedAt}
              </Text>
              <Text style={styles.textStyleSub}>
                From: {item.source.name}
              </Text>
              <Text />
              <Image style={styles.imageStyle} source={{ uri: item.urlToImage }} />
              <Button onPress={() => Linking.openURL(item.url)}>
                View Article {item.name}
              </Button>
            </View>
          }
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1694a2',
  },
  textStyle: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '900'
  },
  container2: {
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'space-between',
    borderColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
  },
  textStyleSub: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '200'
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    margin: 10
  }
});
