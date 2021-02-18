import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Animated } from 'react-native'

export default function PokemonProfileImage({ pokemonId, themeColor, scrollY }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`);
  }, []);

  const opacityY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.1],
    extrapolateRight: 'clamp',
  })

  return (
    <Animated.View
      style={{
        ...styles.imageWrapper,
        opacity: opacityY
      }}
    >
      <View style={{ ...styles.imageBackground, backgroundColor: themeColor }} />
      <Image
        source={{ uri: imageUrl }}
        style={{ ...styles.image }}
        resizeMethod="scale"
      />
    </Animated.View>
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
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: -36,
    resizeMode: 'contain',
  },
})
