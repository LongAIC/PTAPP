import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";
import DiscountProduct from "../product/DiscountProduct";
import ProductPrice from "../product/ProductPrice";
import { View, Image, TouchableOpacity, Text } from "react-native";

export default function ProductSlice(props) {
  //? Props
  const { products, title="", slide = true } = props;

  //? handlers

  if (!products) return null
  //? Render(s)
  return (
    <FeedSectionContainer
      title={title}
      className="flex-1"
    >
      <FlashList
        data={products}
        horizontal={slide}
        numColumns={slide ? 1 : 2}
        className="flex-1"
        renderItem={({ item, index }) => (
          <Link
            className="w-[190px] mx-1"
            href={{
              pathname: ``,
            }}
            key={index}
            asChild
          >
            <TouchableOpacity className="overflow-hidden  p-2 border-[1px] rounded-lg border-[#F0F1F1]">
              <Image
                source={{
                  uri: item?.thumbnail_url,
                }}
                className="w-[100%] h-[212px] object-cover  z-50 rounded-lg"
              />
              <View className="py-3 border-b-[1px] border-[#F0F1F1]">
                <Text
                  numberOfLines={1}
                  className="text-[16px] font-[500] leading-5"
                >
                  {item?.title}
                </Text>
              </View>
              <View className="py-3">
                <Text className="text-[14px] font-[400] leading-5 text-[#FF4405]">
                  {item?.unit_name}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        estimatedItemSize={200}
      />
    </FeedSectionContainer>
  );
}
