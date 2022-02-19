import { useState } from "react";
import { Card, Input, Button } from "react-native-elements";
import { POST_LIST } from "../../constants/screen-names";

const createPost = ({ navigation }) => {
  const [postText, setPostText] = useState("");
  const [postContent, setPostContent] = useState("");

  const createPostHandler = () => {
    navigation.navigate(POST_LIST);
  };

  return (
    <Card>
      <Input
        autoCompleteType="off"
        placeholder="Title"
        multiline
        value={postText}
        onChangeText={setPostText}
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
