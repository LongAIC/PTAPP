import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native";

import FeedSectionContainer from "../common/FeedSectionContainer";
import DiscountProduct from "../product/DiscountProduct";
import ProductPrice from "../product/ProductPrice";

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
            href={{
              pathname: `/products/${item.id}`,
            }}
            key={item.id}
            asChild
          >
            <TouchableOpacity className="w-fit h-fit bg-white mx-0.5 py-3">
              <Image
                source={{
                  uri: item?.product_image,
                }}
                className="w-32 h-32"
              />
              <View className="flex flex-row px-2 mt-1.5 justify-evenly items-start gap-x-2 ">
                <DiscountProduct discount={15} />
                <ProductPrice inStock={15} discount={15} price={15} />
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
