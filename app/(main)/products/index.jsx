import { Stack, useLocalSearchParams, Link } from "expo-router";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useEffect } from "react";
import { FlashList } from "@shopify/flash-list";

import {
  Filter,
  ProductCard,
  ProductSkeleton,
  Sort,
  SubCategories,
  ListProducts,
  FeedHeader,
  Icons,
} from "@/components";
import { useChangeRoute } from "@/hooks";
import { useGetProductscatQuery } from "@/serviceFTECH";

export default function ProductsScreen() {
  const params = useLocalSearchParams();

  const id = params?.idCat?.toString() ?? "";
  const limit = params?.limit?.toString() ?? 10;
  const page = params?.page?.toString() ?? 0;
  const provinceName = params?.provinceName?.toString();
  const districtName = params?.districtName?.toString();
  const wardName = params?.wardCode?.toString();
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;
  const rating = params?.rating?.toString();

  console.log("params", params);

  const { width } = Dimensions.get("window");
  // Chiều rộng của mỗi item khi hiển thị dạng list
  const itemWidth = width - 20;

  const {
    data,
    hasNextPage,
    count,
    isFetching: isFetchingProduct,
  } = useGetProductscatQuery(
    {
      id,
      limit,
      page,
      provinceName,
      districtName,
      wardName,
      minPrice,
      maxPrice,
      rating,
    },
    {
      selectFromResult: ({ data, ...args }) => ({
        hasNextPage: data?.hasNextPage ?? false,
        data: data?.data,
        count: data?.data?.length ?? 0,
        // isFetchingProduct: data == undefined ? false : isFetchingProduct,
        ...args,
      }),
    }
  );

  //? Handlers
  const changeRoute = useChangeRoute();

  const onEndReachedThreshold = () => {
    if (!hasNextPage) return;
    changeRoute({
      page: Number(page) + 1,
    });
  };

  const handleChangeRoute = (newQueries) => {
    changeRoute({
      ...params,
      page: 0,
      ...newQueries,
      provinceName: newQueries.provinceName || undefined,
      districtName: newQueries.districtName || undefined,
      wardName: newQueries.wardName || undefined,
    });
  };

  const handleResetFilters = () => {
    changeRoute({
      page: 0,
      provinceCode: undefined,
      districtCode: undefined,
      wardCode: undefined,
      inStock: undefined,
      discount: undefined,
      price: undefined,
    });
  };

  //*    Get childCategories Data
  // const {
  //   isLoading: isLoadingCategories,
  //   childCategories,
  //   currentCategory,
  // } = useGetCategoriesQuery(undefined, {
  //   selectFromResult: ({ isLoading, data }) => {
  //     const currentCategory = data?.data?.data.find(
  //       (cat) => cat.slug === category
  //     );
  //     const childCategories = data?.data?.data.filter(
  //       (cat) => cat.parent === currentCategory?._id
  //     );
  //     return { childCategories, isLoading, currentCategory };
  //   },
  // });

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <FeedHeader {...props} title="Home" icon="menu-outline" />
          ),
        }}
      />
      <ScrollView className="bg-[#f4f4f4] h-full flex">
        <View className="px-6 py-1 bg-white">
          <View>
            <TouchableOpacity>
              <View className="w-full items-center flex-row items-center justify-center">
                <Icons.Ionicons
                  name="location-outline"
                  size={24}
                  color="black"
                />
                <View className="w-[100%] flex-row justify-start items-center ml-1">
                  <Text className="text-13 text-[#808080] mr-2">Khu vực:</Text>
                  <View className="flex-row items-center">
                    <Text className="text-13 mr-1">Toàn quốc</Text>
                    <Icons.Ionicons
                      name="chevron-down-sharp"
                      size={12}
                      color="black"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex-row justify-start items-center h-[50px]">
              <Filter
                mainMaxPrice={data?.data?.mainMaxPrice}
                mainMinPrice={data?.data?.mainMinPrice}
                handleChangeRoute={handleChangeRoute}
              />
              {/* Đường phân cách */}
              <View className="w-[1px] h-[20px] bg-[#e0e0e0] mx-3"></View>
              <View className="flex-row justify-between items-center border bg-[#fff4e0] border-[#f80] px-3 py-1 mr-2 rounded-full">
                <Text className="text-13 text-[#f80]">Giá</Text>
                <Icons.Ionicons
                  name="chevron-down-sharp"
                  size={12}
                  color="#f80"
                  className="ml-1"
                />
              </View>
              <View className="flex-row justify-between items-center bg-[#fff] border border-[#f4f4f4] px-3 py-1 mr-2 rounded-full">
                <Text>Theo khu vực</Text>
                <Icons.Ionicons
                  name="chevron-down-sharp"
                  size={12}
                  color="black"
                  className="ml-1"
                />
              </View>
            </View>
          </View>
        </View>

        {/* <SubCategories
          childCategories={childCategories}
          name={currentCategory?.name}
          isLoading={isLoadingCategories}
        /> */}
        <View className="py-3 bg-white mt-2">
          <Text className="text-base text-neutral-600 font-bold px-3 mb-2">
            Danh mục sản phẩm
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
            pagingEnabled
            snapToInterval={Dimensions.get("window").width / 4}
            decelerationRate="fast"
          >
            <View className="flex flex-row space-x-10 items-center">
              {[
                {
                  image: require("@/assets/images/live2.png"),
                  text: "Điện thoại",
                  link: "/products?idCat=1",
                },
                {
                  image: require("@/assets/images/live.png"),
                  text: "Laptop",
                  link: "/products?idCat=2",
                },
                {
                  image: require("@/assets/images/banhang.png"),
                  text: "Tablet",
                  link: "/products?idCat=3",
                },
                {
                  image: require("@/assets/images/pro.png"),
                  text: "Phụ kiện",
                  link: "/products?idCat=4",
                },
                {
                  image: require("@/assets/images/live2.png"),
                  text: "Đồng hồ",
                  link: "/products?idCat=5",
                },
              ].map((item, index) => (
                <Link href={item.link} key={index} asChild>
                  <TouchableOpacity>
                    <View className="items-center">
                      <Image
                        source={item.image}
                        className="w-14 h-14 rounded-lg mb-1"
                      />
                      <Text className="text-xs mt-1">{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="px-0 flex-1 bg-white mt-2">
          <View id="_products" className="w-full h-[100%] flex px-3 mt-2">
            {/* Filters & Sort */}
            <View className="divide-y-2 divide-neutral-200 w-full">
              <View className="flex flex-row justify-between ">
                <Text className="text-base text-neutral-600">
                  Tất cả sản phẩm
                </Text>

                <View className="flex-row justify-between items-center">
                  <Text className="text-base text-neutral-600">
                    {count} sản phẩm
                  </Text>
                  <Sort handleChangeRoute={handleChangeRoute} className />
                </View>
              </View>
            </View>
            {/* Products */}
            {isFetchingProduct && page == 0 && <ProductSkeleton />}
            {data && data?.length > 0 ? (
              // <FlashList
              //   data={data}
              //   keyExtractor={(item) => item.ID.toString()}
              //   renderItem={renderItem}
              //   onEndReached={onEndReachedThreshold}
              //   onEndReachedThreshold={0}
              //   estimatedItemSize={200}
              //   numColumns={1}
              // />
              <ListProducts
                products={data}
                nextpage={hasNextPage}
                page={page}
              />
            ) : (
              <Text className="text-center text-red-500 text-16 py-3">
                Không tìm thấy sản phẩm
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
