import { useNavigation } from "@react-navigation/native";
import { View, Button, Text, Image } from "react-native";

import { useRoute } from "@react-navigation/native";
import { Box, FlatList, Center, NativeBaseProvider } from "native-base";
import React, { useState, useEffect } from "react";

export default function UserFullScreenModal() {
  let navigation = useNavigation();
  const { params } = useRoute();
  const { item } = params;
  const { itemId } = params;
  const { userName } = params;
  const { userNameLast } = params;
  const { email } = params;
  const { gender } = params;
  const { picturePetite } = params;
  // console.log(itemId);
  // console.log(userName);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={{ uri: picturePetite }}
        style={{ width: 200, height: 200 }}
      />

      <Text>{userName}</Text>
      <Text>{userNameLast}</Text>
      <Text>{email}</Text>
      <Text>{gender}</Text>

      <Button
        title="Closeee"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
