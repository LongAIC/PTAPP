import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";

import DiscountProduct from "./DiscountProduct";
import ProductPrice from "./ProductPrice";
import FeedSectionContainer from "../common/FeedSectionContainer";
import Skeleton from "../common/Skeleton";

import { useGetProductsQuery } from "@/services";

export default function MostFavoriteProductsFtech(props) {
  //? Props
  const { products } = props;
  const { nameSection } = props;
  //? Get Products Query
  const { width } = Dimensions.get("window"); // Lấy chiều rộng của màn hình
  const numColumns2 = 2; // Số lượng sản phẩm muốn hiển thị
  const itemWidth2 = width / numColumns2; // Chiều rộng của mỗi item
  const gap2 = 20; // Khoảng cách giữa các item
  //? Render(s)
  return (
    <FeedSectionContainer title={nameSection}>
      <View className="w-full flex flex-row flex-wrap">
        {products[0]?.dataproduct?.map((product, index) => (
          <Link
            className="mx-1 mb-2"
            style={{ width: itemWidth2 - gap2 }}
            href={{
              pathname: `/products/${product.ID}`,
            }}
            key={product.id}
            asChild
          >
            <TouchableOpacity className="overflow-hidden border border-[#F0F1F1] p-2">
              <Image
                source={{
                  uri: product?.product_image,
                }}
                className="w-[100%] h-[212px] object-cover  z-50"
              />
              <View className="h-[50px]">
                <Text
                  numberOfLines={2}
                  className="text-[14px] font-[400] leading-5 pt-1"
                >
                  {product?.product_name}
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
                <Text className="text-[13px] font-[400] leading-5 text-[#FF4405] font-[400]">
                  {product?.donvicungcap}
                </Text>
                <Text className="text-[#808080] text-[11px]">
                  Đã bán 38 sản phẩm{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </FeedSectionContainer>
  );
}
