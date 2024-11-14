import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";
import { View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { useChangeRoute } from "@/hooks";

export default function ListProducts(props) {
  //? Props
  const { products, title, showMore = false, hasNextPage, page } = props;
  const { width } = Dimensions.get("window");

  // Chiều rộng của mỗi item khi hiển thị dạng list
  const itemWidth = width - 20;

  //? handlers
  const handleJumptoMore = () => {
    console.log("more");
  };

  const changeRoute = useChangeRoute();
  const onEndReachedThreshold = () => {
    changeRoute({
      page: Number(page) + 1,
    });
  };

  //? Render item(s) dạng list
  const renderItem = ({ item }) => {
    return (
      <>
        <Link
          href={`/products/${item.ID}`}
          asChild
          style={{
            flexDirection: "row", // Hiển thị theo dòng
            alignItems: "center",
            width: itemWidth,
            marginHorizontal: 0,
            marginVertical: 5,
            backgroundColor: "#fff",
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }}>
            {/* Ảnh sản phẩm */}
            <Image
              source={{ uri: item?.product_image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                marginRight: 10,
              }}
              resizeMode="cover"
            />

            {/* Thông tin sản phẩm */}
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {item?.product_name}
              </Text>
              <Text style={{ fontSize: 12, color: "#FF4405" }}>
                Tư vấn trực tiếp
              </Text>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                <Text
                  style={{
                    color: "#808080",
                    textDecorationLine: "line-through",
                    marginRight: 5,
                  }}
                >
                  1.690.000 đ
                </Text>
                <Text
                  style={{ color: "#FF4405", fontSize: 16, fontWeight: "bold" }}
                >
                  1.490.000 đ
                </Text>
              </View>
              <Text
                style={{ fontSize: 12, color: "#FF4405", fontWeight: "bold" }}
              >
                {item.donvicungcap !== "" ? item.donvicungcap : "Tên đơn vị"}
              </Text>
              <Text style={{ fontSize: 12, color: "#808080" }}>
                38 sản phẩm
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#E0E0E0",
            width: "100%",
            marginTop: 10,
          }}
        />
      </>
    );
  };

  //? Render chính
  return (
    <View style={{ flex: 1 }}>
      <FeedSectionContainer
        title={title}
        showMore={showMore}
        onJumptoMore={handleJumptoMore}
        style={{ flex: 1 }}
      >
        <FlashList
          data={products}
          renderItem={renderItem}
          estimatedItemSize={200}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          onEndReached={onEndReachedThreshold}
          onEndReachedThreshold={0}
        />
      </FeedSectionContainer>
    </View>
  );
}