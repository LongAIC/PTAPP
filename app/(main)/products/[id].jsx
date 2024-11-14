import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Description,
  Icons,
  StoreCard,
  ProductSlice,
  Reviews,
  ShowWrapper,
  ProductDetailSlider,
  Button,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { useGetSingleProductDetailQuery } from "@/serviceFTECH";
import Stars from "react-native-stars";

export default function SingleProductScreen() {
  //? Assets
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  //? Store
  const { totalItems } = useAppSelector((state) => state.cart);

  //? Get Feeds Query
  const {
    data: productData,
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetSingleProductDetailQuery(
    { id },
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  );

  const product = productData || {};
  const {
    name,
    feature_image,
    gallery_image,
    description,
    numReviews,
    unit,
    product_related,
  } = product;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <>
              <Icons.Feather
                name="heart"
                size={20}
                color="#1F2937"
                className="px-2 py-1"
              />
            </>
          ),
          title: "Chi tiết sản phẩm",
          headerBackTitleVisible: false,
        }}
      />

      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="detail"
      >
        <View className="h-full bg-gray relative">
          <ScrollView>
            <View className="py-2 flex gap-y-2">
              <View className=" bg-white rounded-xl px-2 pb-3">
                <ProductDetailSlider imagesData={gallery_image} />

                <Text className="mr-auto text-lg font-bold my-1 px-2">
                  {name}
                </Text>

                {/* Đánh giá sao */}
                <View>
                  <View className="flex-row items-center ml-[7px] mb-4">
                    <Stars
                      default={4.5} // Giá trị đánh giá mặc định
                      count={5} // Tổng số sao
                      half={true} // Hỗ trợ đánh giá một nửa
                      fullStar={
                        <Icons.AntDesign
                          name="star"
                          style={{ color: "gold" }}
                          className="text-[20px]"
                        />
                      }
                      emptyStar={
                        <Icons.AntDesign
                          name="staro"
                          style={{ color: "gold" }}
                          className="text-[20px]"
                        />
                      }
                      halfStar={
                        <Icons.AntDesign
                          name="staro"
                          style={{ color: "gold" }}
                          className="text-[20px]"
                        />
                      }
                    />
                    <Text className="text-[14px] ml-2">(4.7)</Text>
                  </View>
                </View>

                {/* Giá sản phẩm */}
                <View className="px-2 flex-row mb-3">
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
                    style={{
                      color: "#FF4405",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    1.490.000 đ
                  </Text>
                </View>

                {/* Liên hệ button */}
                <View className="my-5">
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        backgroundColor: "#0068ff",
                        position: "relative",
                        height: 60,
                      }}
                      android_ripple={{
                        color: "rgba(255, 255, 255, 0.3)",
                        borderless: false,
                      }}
                    >
                      <Image
                        source={require("@/assets/app_images/zalo.png")}
                        style={{
                          width: 60,
                          height: 60,
                          position: "absolute",
                          top: 3,
                          left: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginLeft: 60,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Liên hệ qua Zalo
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="my-2">
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        backgroundColor: "#46cc6b",
                        position: "relative",
                        height: 60,
                      }}
                      android_ripple={{
                        color: "rgba(255, 255, 255, 0.3)",
                        borderless: false,
                      }}
                    >
                      <Image
                        source={require("@/assets/app_images/phone.png")}
                        style={{
                          width: 60,
                          height: 60,
                          position: "absolute",
                          top: 1,
                          left: 5,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginLeft: 60,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Liên hệ báo giá
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        backgroundColor: "#ffe869",
                        position: "relative",
                        height: 60,
                      }}
                      android_ripple={{
                        color: "rgba(255, 255, 255, 0.3)",
                        borderless: false,
                      }}
                    >
                      <Image
                        source={require("@/assets/app_images/email.png")}
                        style={{
                          width: 60,
                          height: 60,
                          position: "absolute",
                          top: 2,
                          left: 7,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginLeft: 60,
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        Gửi file nhận báo nhá
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Description description={description} />
              </View>

              <View className="bg-white rounded-xl px-2">
                <Reviews
                  numReviews={numReviews}
                  productID={product._id}
                  productTitle={product.title}
                />
              </View>

              <View className="bg-white rounded-xl px-2">
                <StoreCard data={unit} btn />
              </View>

              <View className="bg-white rounded-xl px-2 py-2">
                {unit?.products.length > 0 ? (
                  <ProductSlice
                    products={unit?.products?.map((p) => ({
                      ...p,
                      unit_name: unit.name,
                    }))}
                    title="Sản phẩm của cửa hàng"
                  />
                ) : (
                  ""
                )}

                <ProductSlice
                  products={product_related}
                  title="Sản phẩm liên quan"
                />

                {/* Add to Cart Operation */}
                <View className="fixed left-0 right-0 z-20">
                  <View className="flex items-center justify-between p-3 bg-white border-t border-gray-300 shadow-3xl mt-1">
                    <Button className="px-12 text-sm btn">
                      Liên hệ với người bán
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ShowWrapper>
    </>
  );
}
