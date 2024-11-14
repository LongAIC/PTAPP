import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";
import DiscountProduct from "../product/DiscountProduct";
import ProductPrice from "../product/ProductPrice";
import { View, Image, TouchableOpacity, Text } from "react-native";

export default function ProductSlice(props) {
  //? Props
  const { products, title = "", slide = true } = props;

  //? handlers

  if (!products) return null;
  //? Render(s)
  return (
    <FeedSectionContainer title={title} className="flex-1 mt-2">
      <FlashList
        data={products}
        horizontal={slide}
        numColumns={slide ? 1 : 2}
        className="flex-1"
        renderItem={({ item, index }) => (
          <Link href={`/products/${item.ID}`} asChild key={item.ID}>
            <View className="overflow-hidden p-[5px]">
              <Image
                source={{
                  uri: item?.thumbnail_url,
                }}
                className="w-[100%] h-[212px] object-cover  z-50 rounded-lg"
              />

              <View className="h-[50px]">
                <Text
                  numberOfLines={1}
                  className="text-[14px] font-[400] leading-5 pt-1"
                >
                  {item?.product_name}
                </Text>
                <Text className="text-[10px] text-[#FF4405]">
                  Tư vấn trực tiếp
                </Text>
                <View className="flex flex-row my-1">
                  <Text className="text-[#808080] mr-1 line-through">
                    1.690.000 đ
                  </Text>
                  <Text className="text-[#FF4405] mr-1 text-[15px] font-bold">
                    1.490.000 đ
                  </Text>
                </View>
              </View>
              <View className="mt-3 pt-1 border-t-[1px] border-[#F0F1F1] ">
                <Text className="text-[14px] font-[400] leading-5 text-[#FF4405] font-bold">
                  {item?.donvicungcap ? item?.donvicungcap : "FTECH"}
                </Text>
                <Text className="text-[#808080]">38 sản phẩm </Text>
              </View>
            </View>
          </Link>
        )}
        estimatedItemSize={200}
      />
    </FeedSectionContainer>
  );
}
