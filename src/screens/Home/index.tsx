import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from './styles'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Background } from '../../components/Background'
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const [data, setData] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://192.168.0.19:3333/games')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 64 }}
        >
          <Image source={logoImg} style={styles.logo} />
          <Heading
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GameCard onPress={() => handleOpenGame(item)} data={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}
