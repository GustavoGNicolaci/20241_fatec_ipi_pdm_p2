import { StatusBar } from 'expo-status-bar';
import { TheCatAPI } from "@thatapicompany/thecatapi"
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const { API_KEY } = process.env;
  const theCatAPI = new TheCatAPI(API_KEY || '');

  theCatAPI.images.searchImages({
    limit: 5,
  }).then((images) => {
    console.log(images);
  }).catch((error) => {
    console.error(error);
  });


  return (
    <View style={styles.container}>
      <Text>Gerador de fotos de gatos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});