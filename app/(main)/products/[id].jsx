import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AddToCartOperation,
  Description,
  FreeShipping,
  Icons,
  ImageGalleryFtech,
  StoreCard,
  ProductSlice,
  FtechDiscountSlider,
  Info,
  InitialStore,
  OutOfStock,
  ProductCard,
  Reviews,
  SelectColor,
  SelectSize,
  ShowWrapper,
  SmilarProductsSlider,
  Specification,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { useGetSingleProductDetailQuery } from "@/serviceFTECH";
import { ResponsiveImage } from "@/components";
import { formatNumber } from "@/utils";

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
              <Link href="/cart" asChild className="relative">
                <Pressable>
                  <Icons.AntDesign
                    name="shoppingcart"
                    size={24}
                    color="#1F2937"
                    className="px-2 py-1"
                  />
                  {formatNumber(totalItems) && (
                    <Pressable className="absolute outline outline-2 bottom-3.5 left-5 bg-red-500 rounded-md w-5 h-5 p-0.5">
                      <Text className="text-center text-xs text-white">
                        {formatNumber(totalItems)}
                      </Text>
                    </Pressable>
                  )}
                </Pressable>
              </Link>

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
            <View className="py-4 flex gap-y-2">
              <View className="h-fit bg-white rounded-xl px-2">
                {/* Product Banner */}
                <ResponsiveImage
                  className="h-[100vw] w-full rounded-lg"
                  imageStyles="h-[100vw] w-full rounded-lg"
                  source={feature_image}
                  alt={name}
                />
                <ImageGalleryFtech images={gallery_image} />
                <Text className="mr-auto text-lg font-bold">{name}</Text>
                <View className="lg:col-span-4 ">
                  {/* Product Title */}
                  <Text className="p-4 text-base font-semibold leading-8 tracking-wide text-black/80 ">
                    {product.title}
                  </Text>
                </View>
              </View>

              <View className="bg-white rounded-xl px-2">
                <StoreCard data={unit} />
              </View>

              <View className="bg-white rounded-xl px-2">
                <Description description={description} />
                <Reviews
                  numReviews={numReviews}
                  productID={product._id}
                  productTitle={product.title}
                />

                <ProductSlice
                  products={unit?.products?.map((p) => ({
                    ...p,
                    unit_name: unit.name,
                  }))}
                  title="Sản phẩm của cửa hàng"
                />

                <ProductSlice
                  products={product_related}
                  title="Sản phẩm liên quan"
                />

                {/* Add to Cart Operation */}
                <View
                  className="fixed left-0 right-0 z-20"
                  style={{ bottom: insets.bottom }}
                >
                  <AddToCartOperation product={product} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ShowWrapper>
    </>
  );
}
