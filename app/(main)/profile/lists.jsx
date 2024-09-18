'use client'

import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { FavoritesListEmpty } from '@/components'

const ListsScreen = () => {
  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Bộ sưu tập của tôi',
          headerBackTitleVisible: false,
        }}
      />
      <View className="py-20 bg-white h-full">
        <FavoritesListEmpty className="mx-auto h-52 w-52" />
        <Text className="text-center">Danh sách yêu thích của bạn trống</Text>
        <Text className="block my-3 text-base text-center text-amber-500">（Sắp ra mắt）</Text>
      </View>
    </>
  )
}

export default ListsScreen
