import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  View,
} from "react-native";
import { firestore } from "../firebase/config";
// import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export const CollectionDrawing = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const { avatar } = useSelector((state) => state.user);
  const navigation = useNavigation();
  // console.log("navigation", navigation);

  const getCurrentUserPost = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    // console.log("data.data(", data);
    await firestore
      .collection("posts")
      .doc(id)
      .update({
        like:Number(data.data().like)? Number(data.data().like) + 1:1,
      });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, indx) => indx.toString()}
      renderItem={({ item }) => {
        // console.log("post", item);
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={() => navigation.navigate("Map", { info: item })}
            style={styles.postContainer}
          >
            <TouchableOpacity
              style={styles.like}
              onPress={() => getCurrentUserPost(item.id)}
            >
              <Text>{item.like?item.like:0}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  margin: 10,
                }}
                source={{
                  uri: item.avatar,
                }}
              />
              <TouchableOpacity
                style={styles.comments}
                onPress={() => navigation.navigate("Comments",{item})}
              >
                <Text>COMMENTS</Text>
              </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Modal
              style={styles.centeredView}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View>
                <View
                  style={{
                    backgroundColor: "#2196F3",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableHighlight
                    style={{ marginTop: 50 }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View>
                      <Text>Hide Modal</Text>
                      <Image
                        style={styles.postImage}
                        source={{ uri: item.image }}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: 300,
    borderRadius: 10,
    height: 240,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
  },
  image: {
    width: 220,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
    right: 10,
    bottom: 10,
    position: "absolute",
  },
  like: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    left: 15,
  },
  comments: {},
  centeredView: {
    backgroundColor: "red",
    width: 350,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
