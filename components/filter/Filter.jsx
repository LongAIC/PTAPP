import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icons from "../common/Icons";
import Modal from "../common/Modal";

import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useDisclosure,
} from "@/hooks";
import { loadFilters, resetFilter, updateFilter } from "@/store";
import CategorySelector from "../common/Selector";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Filter = (props) => {
  //? Props
  const { mainMinPrice, mainMaxPrice, handleChangeRoute } = props;

  //? Assets
  const dispatch = useAppDispatch();
  const [isFilters, filtersHandlers] = useDisclosure();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  //? State
  const filters = useAppSelector((state) => state.filters);

  //? Debounced Values
  const debouncedMinPrice = useDebounce(filters.minPrice, 1200);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 1200);
  //? Handlers
  const handlefilter = (props) => {
    const { name, value, type } = props;
    const filterValue = value;
    dispatch(updateFilter({ name, value: filterValue }));

    if (type === "checkbox") handleChangeRoute({ [name]: filterValue });
  };

  const handleResetFilters = () => {
    handleChangeRoute({ inStock: "", discount: "", price: "" });
    dispatch(
      resetFilter({
        maxPrice: String(mainMaxPrice),
        minPrice: String(mainMinPrice),
      })
    );
    if (filtersHandlers.close) filtersHandlers.close();
  };

  const canReset =
    !!params.inStock ||
    !!params.discount ||
    mainMinPrice !== debouncedMinPrice ||
    mainMaxPrice !== debouncedMaxPrice;

  //? Re-Renders
  //*   load Filters
  useEffect(() => {
    dispatch(
      loadFilters({
        price:
          mainMaxPrice && mainMinPrice ? `${mainMinPrice}-${mainMaxPrice}` : "",
        discount: "false",
        inStock: "false",
        ...params,
      })
    );
  }, [params.category, mainMaxPrice, mainMinPrice, dispatch]);
  //*   Change Route After Debounce
  useEffect(() => {
    if (Number(debouncedMinPrice) && mainMinPrice !== Number(debouncedMinPrice))
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      });
  }, [debouncedMinPrice]);

  useEffect(() => {
    if (Number(debouncedMaxPrice) && mainMaxPrice !== Number(debouncedMaxPrice))
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      });
  }, [debouncedMaxPrice]);

  //*   Close Modal on Change Filter
  useEffect(() => {
    if (filtersHandlers.close) filtersHandlers.close();
  }, [filters.discount, filters.inStock, debouncedMaxPrice, debouncedMinPrice]);

  //? Render(s)
  return (
    <>
      <View className="flex-1 px-3">
        <Pressable
          className="flex flex-row items-center gap-x-1"
          onPress={filtersHandlers.open}
        >
          <Icons.Ionicons
            name="filter"
            size={16}
            className="text-neutral-600"
          />
          <Text className="text-base text-neutral-600">Lọc</Text>
        </Pressable>
      </View>
      <Modal
        isShow={isFilters}
        onClose={filtersHandlers.close}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={filtersHandlers.close}
        className=" mt-40 flex-1 bg-red-500 ml-0"
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Modal.Content
            onClose={filtersHandlers.close}
            style={{}}
            className="flex flex-col h-[95vh] w-[105%] px-5 bg-white  pt-5 "
          >
            <Modal.Header onClose={filtersHandlers.close}>
              Bộ lọc tìm kiếm
            </Modal.Header>
            <Modal.Body>
              <View className="flex justify-end "></View>
              <ScrollView
                className=""
                contentContainerStyle={{
                  paddingBottom: insets.bottom + 100,
                }}
              >
                <View className="flex flex-row justify-between items-center py-2.5">
                  <CategorySelector
                    title={"Theo danh mục"}
                    categories={["Ghế", "Bàn", "Tủ", "Giường"]}
                  />
                </View>
                <View className="flex flex-row justify-between items-center py-2.5">
                  <CategorySelector
                    title={"Theo khu vực"}
                    categories={[
                      "Hà Nội",
                      "TP. Hồ Chí Minh",
                      "An Giang",
                      "Bình Thuận",
                      "Bà Rịa - Vũng Tàu",
                      "Bình Dương",
                    ]}
                  />
                </View>
                <View className="flex flex-row justify-between items-center py-2.5">
                  <CategorySelector
                    title={"Theo công ty"}
                    categories={[
                      "Công ty 1",
                      "Công ty 2",
                      "Công ty 3",
                      "Công ty 4",
                    ]}
                  />
                </View>
                <View className="flex flex-row justify-between items-center py-2.5">
                  <CategorySelector
                    title={"Theo đánh giá"}
                    categories={[
                      "5 sao",
                      "Từ 4 sao",
                      "Từ 3 sao",
                      "Từ 2 sao",
                      "Từ 1 sao",
                    ]}
                  />
                </View>
                <View className="flex flex-row items-center justify-between p-3 bg-white border-t border-gray-300 shadow-3xl">
                  <TouchableOpacity className="px-4 rounded-md border py-3 border-red-400">
                    <Text className="text-red-400">Thiết lập lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="px-4 rounded-md py-3 bg-red-400">
                    <Text className="text-white">Áp dụng bộ lọc</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

export default Filter;
