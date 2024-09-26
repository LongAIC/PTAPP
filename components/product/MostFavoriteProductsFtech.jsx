import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

import DiscountProduct from "./DiscountProduct";
import ProductPrice from "./ProductPrice";
import FeedSectionContainer from "../common/FeedSectionContainer";
import Skeleton from "../common/Skeleton";

import { useGetProductsQuery } from "@/services";

export default function MostFavoriteProductsFtech(props) {
  //? Props
  const { products } = props;

  //? Get Products Query

  //? Render(s)
  return (
    <FeedSectionContainer title="Sản phẩm hot">
      <View className="w-full flex flex-row flex-wrap">
        {products?.map((product, index) => (
          <Link
            className="w-[48%] mx-1 my-1"
            href={{
              pathname: ``,
            }}
            key={product.ID}
            asChild
          >
            <TouchableOpacity className="overflow-hidden  p-2 border-[1px] rounded-lg border-[#F0F1F1]">
              <Image
                source={{
                  uri: product.product_image,
                }}
                className="w-[100%] h-[212px] object-cover  z-50 rounded-lg"
              />
              <View className="py-3 border-b-[1px] border-[#F0F1F1]">
                <Text
                  numberOfLines={2}
                  className="text-[16px] font-[500] leading-5"
                >
                  {product?.product_name}
                </Text>
              </View>
              <View className="py-3">
                <Text className="text-[14px] font-[400] leading-5 text-[#FF4405]">
                  {product?.donvicungcap}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </FeedSectionContainer>
  );
}
