import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { firestore } from "../../firebase/config";
import { CollectionDrawing } from "../../components/CollectionDrawing";
import { useDispatch } from "react-redux";

export const PostsScreen = () => {
//   const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

//   useEffect(() => {
//     currentUser();
//   }, []);

  useEffect(() => {
    getCollection();
  }, []);

//   const currentUser = async () => {
//     const currentUser = await auth.currentUser;

//     dispatch({
//       type: "CURRENT_USER",
//       payload: {
//         userName: currentUser.displayName,
//         userId: currentUser.uid,
//         avatar: currentUser.photoURL,
//       },
//     });
//   };

  const getCollection = async () => {
    await firestore.collection("posts").onSnapshot((data) => {
      setAllPosts(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  return (
    <View style={styles.container}>
      <CollectionDrawing data={allPosts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51995d38",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  imageBlock: {
    width: 300,
    borderRadius: 10,
    height: 240,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 20,
  },

  postImage: {
    width: 220,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
    right: 10,
    bottom: 10,
    position: "absolute",
  },
});
