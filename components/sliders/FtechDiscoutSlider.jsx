import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";
import DiscountProduct from "../product/DiscountProduct";
import ProductPrice from "../product/ProductPrice";
import { View, Image, TouchableOpacity, Text } from "react-native";

export default function FtechDiscountSlider(props) {
  //? Props
  const { products } = props;

  //? handlers
  const handleJumptoMore = () => {
    console.log("more");
  };

  //? Render(s)
  return (
    <FeedSectionContainer
      title="Đang giảm giá"
      showMore
      onJumptoMore={handleJumptoMore}
    >
      <FlashList
        data={products}
        renderItem={({ item }) => (
          <Link
            className="w-[200px] mx-1"
            href={{
              pathname: `/products/${item.id}`,
            }}
            key={item.id}
            asChild
          >
            <TouchableOpacity className="overflow-hidden  p-2 border-[1px] rounded-lg border-[#F0F1F1]">
              <Image
                source={{
                  uri: item?.product_image,
                }}
                className="w-[100%] h-[212px] object-cover  z-50 rounded-lg"
              />
              <View className="py-3 border-b-[1px] border-[#F0F1F1]">
                <Text
                  numberOfLines={2}
                  className="text-[16px] font-[500] leading-5"
                >
                  {item?.product_name}
                </Text>
              </View>
              <View className="py-3">
                <Text className="text-[14px] font-[400] leading-5 text-[#FF4405]">
                  {item?.donvicungcap}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        horizontal
        estimatedItemSize={200}
      />
    </FeedSectionContainer>
  );
}
