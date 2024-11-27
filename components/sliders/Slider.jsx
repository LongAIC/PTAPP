import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

export default function Slider(props) {
  //? Props
  const { data } = props;

  //? Render(s)
  if (data?.length === 0) return null;

  return (
    <View className=" overflow-hidden">
      <Swiper
        style={styles.wrapper}
        showsPagination
        activeDotColor="#000000"
        dotColor="#E5E7EB"
        paginationStyle={{
          bottom: 5,
        }}
      >
        {data
          .filter((item) => item.isPublic)
          .map((item, index) => (
            <Image
              key={index}
              source={{
                uri: item.image.url,
              }}
              className="w-full h-[170px] object-contain"
            />
          ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 170,
  },
});
