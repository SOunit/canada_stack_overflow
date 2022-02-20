import { useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/action-creators/posts";
import firebaseApp from "../../firebase-app";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const PostList: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useTypedSelector((state) => state.posts);

  // read data from firebase
  useEffect(() => {
    firebaseApp.read("/posts", (snapshot) => {
      const posts = snapshot.val();
      dispatch(fetchPosts(posts));
    });
  }, []);

  let postList = [];
  for (let id in posts) {
    postList.push(
      <TouchableOpacity
        key={id}
        onPress={() => navigation.navigate("PostDetail", { id })}
      >
        <ListItem bottomDivider hasTVPreferredFocus tvParallaxProperties>
          <ListItem.Content>
            <ListItem.Title>{posts[id].title}</ListItem.Title>
            <ListItem.Subtitle>{posts[id].postDate}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return <ScrollView style={{ width: "100%" }}>{postList}</ScrollView>;
};

const styles = StyleSheet.create({});

export default PostList;
