import { useState } from "react";
import { Card, Input, Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { POST_LIST } from "../../constants/screen-names";
import firebaseApp from "../../firebase-app";

const createPost: NavigationStackScreenComponent = ({ navigation }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const createPostHandler = () => {
    firebaseApp.create("/posts", {
      title: postTitle,
      content: postContent,
      postDate: new Date().toISOString(),
    });
    navigation.navigate(POST_LIST);
  };

  return (
    <Card>
      <Input
        autoCompleteType="off"
        placeholder="Title"
        multiline
        value={postTitle}
        onChangeText={setPostTitle}
      />
      <Input
        autoCompleteType="off"
        placeholder="Content"
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />
      <Button title="Create Post" onPress={createPostHandler} />
    </Card>
  );
};

export default createPost;
