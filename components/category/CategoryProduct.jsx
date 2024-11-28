import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

const { width } = Dimensions.get("window");
const numColumns = 4;
const itemWidth = width / numColumns;
const gap = 2;

export default function CategoriesProduct(props) {
  const { data } = props;

  console.log(data);
  const router = useRouter();

  const renderItem = ({ item }) => (
    <Link
      href={{
        pathname: `/products`,
        params: {
          idCat: item.ID,
        },
      }}
      style={{ width: itemWidth - gap, marginBottom: 5 }}
    >
      <View className="flex justify-center bg-[#fff] items-center h-[100px] p-3 rounded-full border-black">
        <Image
          source={{
            uri: item.image
              ? item.image
              : "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/07/668517630fe24.png",
          }}
          className="w-[60px] h-[60px] rounded-lg"
        />

        <Text
          className="text-center mt-2 text-16 w-[80%]"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ textAlign: "center", width: itemWidth - 20 }}
        >
          {item.name}
        </Text>
      </View>
    </Link>
  );

  return (
    <View className="mb-3 ">
      <View className="flex-row justify-between pt-1 pb-2">
        <View>
          <Text className="text-base font-bold">Danh mục sản phẩm</Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            router.push("/category");
          }}
        >
          <Text className="text-13 underline">Xem tất cả</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ flex: 1, width: "100%", paddingTop: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View className="flex flex-row space-x-4">
            <View className="flex flex-col space-y-4">
              <View className="flex flex-row space-x-4">
                {data?.[0]?.slice(0, 4).map((item) => {
                  return renderItem({ item });
                })}
              </View>
              <View className="flex flex-row space-x-4">
                {data?.[0]?.slice(4).map((item) => {
                  return renderItem({ item });
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
