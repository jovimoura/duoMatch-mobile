import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Entypo } from '@expo/vector-icons'

import logo from '../../assets/logo-nlw-esports.png'
import { styles } from './styles'
import { THEME } from '../../theme'

import { Background } from '../../components/Background'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GameParams } from '../../@types/navigation'
import { Heading } from '../../components/Heading'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  const route = useRoute()
  const navigation = useNavigation()
  const game = route.params as GameParams

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.0.19:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
              <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />
            <View style={styles.right} />
          </View>
          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="center"
          />
          <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard onConnect={() => {}} data={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              duos.length === 0 ? styles.emptyListContent : styles.contentList
            }
            style={styles.containerList}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}
