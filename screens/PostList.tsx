import { useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { initPosts } from "../store/actions/posts";
import firebaseApp from "../firebase-app";

const PostList = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // const descendDateSort = (arr) => {
  //   return arr.sort((a, b) => {
  //     return new Date(b.postDate) - new Date(a.postDate);
  //   });
  // };

  // read data from firebase
  useEffect(() => {
    firebaseApp.read("/posts", (snapshot) => {
      const posts = snapshot.val();
      console.log("posts", posts);
      dispatch(initPosts(posts));
    });
  }, []);

  let postList = [];
  for (let key in posts) {
    postList.push(
      <TouchableOpacity
        key={key}
        onPress={() => navigation.navigate("PostDetail", { key })}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{posts[key].title}</ListItem.Title>
            <ListItem.Subtitle>{posts[key].postDate}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return <ScrollView style={{ width: "100%" }}>{postList}</ScrollView>;
};

const styles = StyleSheet.create({});

export default PostList;
