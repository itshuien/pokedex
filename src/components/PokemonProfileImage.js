import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View } from 'react-native'

export default function PokemonProfileImage({ pokemonId, themeColor }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`);
  }, []);

  return (
    <View style={{ ...styles.imageWrapper }}>
      <View style={{ ...styles.imageBackground, backgroundColor: themeColor }} />
      <Image
        source={{ uri: imageUrl }}
        style={{ ...styles.image }}
        resizeMethod="scale"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    height: 200,
    marginBottom: 8,
  },
  imageBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
    borderRadius: 8,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: -36,
    resizeMode: 'contain',
  },
})
