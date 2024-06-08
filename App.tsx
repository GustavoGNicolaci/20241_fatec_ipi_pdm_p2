import { useState } from 'react';
import { TheCatAPI } from "@thatapicompany/thecatapi"
import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';

type Gatos = {
  id: string;
  url: string;
  limit?: string;
}

export default function App() {
  const { API_KEY } = process.env;
  const theCatAPI = new TheCatAPI(API_KEY || '');
  const [gatos, setGatos] = useState<Gatos[]>([]);

  const gerarGato = async () => {
    const gatos = await theCatAPI.images.searchImages({
      limit: 5,
    });

    setGatos(gatos);
    console.log(gatos);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerador de fotos de gatos</Text>
      <Pressable
        style={styles.button}
        onPress={gerarGato}
      >
        <Text>Gerar</Text>
      </Pressable>

      <FlatList
        keyExtractor={(item) => item.id!}
        data={gatos}
        style={styles.list}
        renderItem={gatos => (
        <View>
          <Image
            source={{ uri: gatos.item.url }}
            style={styles.imagem}
          />
        </View>
        )}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  titulo: {
    fontSize: 20,
    marginBottom: 20,
  },

  button: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 4,
    marginTop: 15,
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'arial',
    marginBottom: 20,
  },

  list: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    width: '80%',
    padding: 10,
  },

  imagem: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  }

});