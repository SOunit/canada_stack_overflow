import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { getDatabase, ref, push } from "firebase/database";
import { useSelector } from "react-redux";

const CreateComment = ({ navigation }) => {
  const [commentInput, setCommentInput] = useState("");
  const postKey = useSelector((state) => state.postKey);

  // push comment to firebase
  const submitComment = () => {
    const db = getDatabase();
    const reference = ref(db, `/posts/${postKey}/comments`);
    push(reference, {
      comment: commentInput,
      votedUserIdList: ["demo-user-to-create-array"],
    });
    navigation.navigate("PostDetail");
  };

  return (
    <Card>
      <Input
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
