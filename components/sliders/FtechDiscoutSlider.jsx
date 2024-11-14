import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";
import DiscountProduct from "../product/DiscountProduct";
import ProductPrice from "../product/ProductPrice";
import { View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function FtechDiscountSlider(props) {
  //? Props
  const { products, title, showMore = false } = props;
  const { width } = Dimensions.get("window"); // Lấy chiều rộng của màn hình
  const numColumns2 = 2; // Số lượng sản phẩm muốn hiển thị
  const itemWidth2 = width / numColumns2; // Chiều rộng của mỗi item
  const gap2 = 11; // Khoảng cách giữa các item
  //? handlers
  const handleJumptoMore = () => {
    console.log("more");
  };

  //? Render(s)
  return (
    <FeedSectionContainer
      title={title}
      showMore={showMore}
      onJumptoMore={handleJumptoMore}
      className="mb-3"
    >
      <FlashList
        data={products}
        renderItem={({ item }) => (
          <Link
            className="mx-1"
            style={{ width: itemWidth2 - gap2 }}
            href={{
              pathname: `/products/${item.ID}`,
            }}
            key={item.id}
            asChild
          >
            <TouchableOpacity className="overflow-hidden">
              <Image
                source={{
                  uri: item?.product_image,
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
            </TouchableOpacity>
          </Link>
        )}
        horizontal
        estimatedItemSize={200}
      />
    </FeedSectionContainer>
  );
}
