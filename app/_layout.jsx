import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { store } from "@/store";
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const persistor = persistStore(store);

export default function RootLayout() {
  const bottomSheetRef = useRef(null);

  // Thêm snapPoints để định nghĩa các điểm dừng của bottom sheet
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "grey",
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: "center",
    },
  });

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView className="flex-1">
            <Stack>
              <Stack.Screen
                name="(main)/(tabs)"
                options={{
                  title: "Danh mục",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(main)/products/index"
                getId={({ params }) => params.category}
                options={{
                  title: "Danh mục",
                  headerShown: true,
                }}
              />
              <Stack.Screen
                name="(main)/(chats)/chatBrand"
                getId={({ params }) => params.brandName}
                options={{
                  title: "Đoạn chat",
                  headerShown: true,
                }}
              />
            </Stack>
            <Toast />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
