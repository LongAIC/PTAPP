import { FlashList } from '@shopify/flash-list'
import { View, Image } from 'react-native'

import FeedSectionContainer from '../common/FeedSectionContainer'

export default function BannerTwoFtech(props) {
  //? Props
  const { data } = props
  //? Render(s)
  if (data.length === 0) return null

  return (
    <FeedSectionContainer title="Chủ đề được đề xuất">
      <FlashList
        data={data}
        renderItem={({ item, index }) => (
          <View className="h-[30vw] w-[70vw] mr-4" key={index}>
            <Image
              key={index}
              source={{
                uri: item.image,
              }}
              className="w-full h-full rounded-lg"
            />
          </View>
        )}
        horizontal
        estimatedItemSize={200}
      />
    </FeedSectionContainer>
  )
}
