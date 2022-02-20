import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import firebaseApp from "../../firebase-app";

const CreateComment: NavigationStackScreenComponent = ({ navigation }) => {
  const [commentInput, setCommentInput] = useState("");
  const postId = navigation.getParam("postId");

  // push comment to firebase
  const submitComment = () => {
    firebaseApp.create(`/posts/${postId}/comments`, {
      text: commentInput,
      voteUserIdList: [],
      voteCount: 0,
    });

    navigation.navigate("PostDetail");
  };

  return (
    <Card>
      <Input
        autoCompleteType="off"
        placeholder="Comment"
        multiline
        style={styles.input}
        leftIcon={{ type: "font-awesome", name: "comment-o" }}
        value={commentInput}
        onChangeText={setCommentInput}
      />
      <Button
        title="Submit"
        containerStyle={{ marginHorizontal: 10 }}
        onPress={submitComment}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    paddingHorizontal: 5,
  },
});

export default CreateComment;
