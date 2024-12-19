import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import FeedSectionContainer from "../common/FeedSectionContainer";
import { View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { useChangeRoute } from "@/hooks";
import Stars from "react-native-stars";
import { Icons } from "@/components";

export default function ListProducts(props) {
  //? Props
  const { products, title, showMore = false, page } = props;
  const { width } = Dimensions.get("window");

  // Chiều rộng của mỗi item khi hiển thị dạng list
  const itemWidth = width - 20;

  console.log(products);

  //? handlers
  const handleJumptoMore = () => {
    console.log("more");
  };

  const changeRoute = useChangeRoute();

  // Sửa lại hàm onEndReached để kiểm tra hasNextPage
  const onEndReached = () => {
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

              {/* Đánh giá sao */}
              <View>
                <View className="flex-row items-center  mb-1 mt-1">
                  <Stars
                    default={item?.rating || 0} // Giá trị đánh giá mặc định
                    count={5} // Tổng số sao
                    half={true} // Hỗ trợ đánh giá một nửa
                    fullStar={
                      <Icons.AntDesign
                        name="star"
                        style={{ color: "gold", fontSize: 14 }}
                        className="text-[14px]"
                      />
                    }
                    emptyStar={
                      <Icons.AntDesign
                        name="staro"
                        style={{ color: "gold", fontSize: 14 }}
                        className="text-[14px]"
                      />
                    }
                    halfStar={
                      <Icons.AntDesign
                        name="staro"
                        style={{ color: "gold", fontSize: 14 }}
                        className="text-[14px]"
                      />
                    }
                  />
                  <Text className="text-[14px] ml-2">({item?.rating})</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }} className="mb-2">
                {/* <Text
                  style={{
                    color: "#808080",
                    textDecorationLine: "line-through",
                    marginRight: 5,
                  }}
                >
                  1.690.000 đ
                </Text> */}
                <Text
                  style={{ color: "#FF4405", fontSize: 16, fontWeight: "bold" }}
                >
                  {item?.price != "" && item?.price !== 0
                    ? `${item?.price
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`
                    : "Liên hệ"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF4405",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {item.donvicungcap !== "" ? item.donvicungcap : "Gian hàng"}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#808080",
                    marginHorizontal: 4,
                  }}
                >
                  •
                </Text>

                <Text style={{ fontSize: 12, color: "#808080" }}>
                  {item?.product_count_donvi} sản phẩm
                </Text>
              </View>

              <TouchableOpacity
                style={{ position: "absolute", bottom: 0, right: 14 }}
              >
                <Icons.AntDesign name="message1" size={24} color="black" />
              </TouchableOpacity>
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
        />
      </FeedSectionContainer>
    </View>
  );
}
