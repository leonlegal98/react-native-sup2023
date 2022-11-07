import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider } from "native-base";
import { json } from "stream/consumers";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function UserScreen() {
  let navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    const resp = await fetch(`https://randomuser.me/api/?results=5`);
    //je voulais faire comme ca mais ca na pas marché.
    //const resp = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await resp.json();
    setData(data);

    //setData((data => [...data, ...data.results]);
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
    fetchData();
  }, []);

  console.log(count);

  const renderItem = ({ item }) => {
    console.log(item.cell);
    if (item == 0) {
      alert("Aucun utilisateur n'a été chargé.");
    }
    return (
      <Box px={5} py={2} rounded="md" bg="primary.300" my={3}>
        <Button
          title={item.name.first}
          onPress={() => {
            navigation.navigate("UserFullScreenModal", {
              item: data,
              itemId: item.cell,
              userName: item.name.first,
              userNameLast: item.name.last,
              email: item.email,
              gender: item.gender,
              picturePetite: item.picture.thumbnail
            });
          }}
        ></Button>
      </Box>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text>User Screen</Text>

          <NativeBaseProvider>
            <Center flex={1}>
              {loading && <Box>Loading..</Box>}
              <Button
                onPress={() => setCount(count + 1)}
                title="ajouter un les user"
              />

              {data && (
                <FlatList
                  data={data.results}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              )}
              <Button
                //onPress={() => }
                title="delete tt les user"
              />
            </Center>
          </NativeBaseProvider>

          <Text>Pull to reload</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
