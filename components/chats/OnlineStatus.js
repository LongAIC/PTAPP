import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../serviceFTECH/firebaseService";
import { updateUserStatus } from "../../store/slices/user.slice";

export default function OnlineStatus({ userId }) {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.user);
  const userStatus = onlineUsers.find((user) => user.id === userId);

  useEffect(() => {
    const userRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        dispatch(
          updateUserStatus({
            userId,
            isOnline: doc.data().isOnline,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: userStatus?.isOnline ? "#4CAF50" : "#9E9E9E" },
        ]}
      />
      <Text style={styles.statusText}>
        {userStatus?.isOnline ? "Online" : "Offline"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
});
