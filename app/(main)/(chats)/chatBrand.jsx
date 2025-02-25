import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const ChatScreenBrand = () => {
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const url = params?.url;
  const brandName = params?.brandName;

  // Hàm render component loading
  const LoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: params.brandName,
        }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: url,
          }}
          onLoadStart={() => setLoading(true)} // Hiển thị loading khi bắt đầu tải
          onLoadEnd={() => setLoading(false)} // Tắt loading khi tải xong
          renderLoading={LoadingIndicator} // Render component loading
          startInLoadingState={true} // Bắt đầu ở trạng thái loading
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}
        {<Text>Loading...</Text>}
        {/* Hiển thị loading nếu đang tải */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default ChatScreenBrand;
