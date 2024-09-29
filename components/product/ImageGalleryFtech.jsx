import { View, Image } from 'react-native'
import { FlashList } from '@shopify/flash-list'

import ResponsiveImage from '../common/ResponsiveImage'

const ImageGalleryFtech = props => {
  //? Porps
  const { images} = props

  //? Render(s)
  return (
    <View className="mb-5 mt-2">
      <FlashList
        data={images}
        renderItem={({ item, index }) => (
          <View className="h-[20vw] w-[20vw] mr-4" key={index}>
            <Image
              key={index}
              source={{
                uri: item,
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
        )}
        horizontal
        estimatedItemSize={200}
      />
    </View>
  )
}

export default ImageGalleryFtech
