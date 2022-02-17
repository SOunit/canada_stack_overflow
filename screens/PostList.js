import { firebase } from "../firebase";
import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { initPosts } from "../store/actions/posts";

const PostList = ({ navigation }) => {
  const key = 0;
  const value = 1;

  const dispatch = useDispatch();
  const [posts, setPosts] = useState();

  const descendDateSort = (arr) => {
    return arr.sort((a, b) => {
      return new Date(b[value].postDate) - new Date(a[value].postDate);
    });
  };

  // read data from firebase
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "/posts");
    onValue(reference, (snapshot) => {
      const posts = snapshot.val(); //{key:{}, key:{}}
      const entriesPosts = Object.entries(posts); //[[key, {postDate:2010, ...}],[key, {postDate:2020, ...}]]
      const descendEntriesPosts = descendDateSort(entriesPosts); //[[key, {postDate:2020, ...}],[key, {postDate:2010, ...}]]

      setPosts(descendEntriesPosts);
      dispatch(initPosts(descendEntriesPosts));
    });
  }, []);

  return (
    <ScrollView style={{ width: "100%" }}>
      {posts?.map((post) => (
        <TouchableOpacity
          key={post[key]} //unique-ke
          onPress={() => navigation.navigate("PostDetail", { key: post[key] })}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{post[value].title}</ListItem.Title>
              <ListItem.Subtitle>{post[value].postDate}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PostList;
