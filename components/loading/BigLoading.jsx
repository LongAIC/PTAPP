import { View, Image } from 'react-native'

import Loading from './Loading'
import Logo from '../svgs/logo'

import Address from '../svgs/address'

export default function BigLoading() {
  return (
    <View className="flex items-center p-4 mx-auto space-y-4 text-center rounded-lg bg-red-100/90 max-w-max ">
      <Address className="w-32 h-10 mx-auto" />
      <Loading />
    </View>
  )
}
