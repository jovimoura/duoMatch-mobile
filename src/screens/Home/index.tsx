import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView } from 'react-native'

import { styles } from './styles'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { GAMES } from '../../utils/games'
import { GameCard, GameCardProps } from '../../components/GameCard'

export function Home() {
  const [data, setData] = useState<GameCardProps[]>([])

  useEffect(() => {
    fetch('http://192.168.0.19:3333/games')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  return (
    <ScrollView
      style={styles.container}
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
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </ScrollView>
  )
}
