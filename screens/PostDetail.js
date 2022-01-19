import { useSelector } from "react-redux";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { getDatabase, ref, update } from "firebase/database";
import Colors from "../constants/Colors";

const PostDetail = ({ navigation }) => {
  const posts = useSelector((state) => state.posts); // [{},{}]
  const postId = navigation.getParam("id");
  const userId = useSelector((state) => state.auth.userId);

  // find chosen question
  const post = posts.find((el) => el.id === postId); // {}

  // sort post answers without mutate original post
  const descendVoteSort = (arr) => arr.sort((a, b) => b.vote - a.vote);
  const copiedAnswers = [...post.answers];
  const descendedAnswers = descendVoteSort(copiedAnswers); // [{}, {}]

  const toggleVote = (answerId) => {
    // for reference url
    const postIndex = posts.findIndex((el) => el.id === postId);
    const answerIndex = post.answers.findIndex((el) => el.id === answerId);

    // for updating data
    const votedUserId = post.answers[answerIndex].votedUserId;
    const voteNumber = post.answers[answerIndex].vote;

    const db = getDatabase();
    const reference = ref(db, `/posts/${postIndex}/answers/${answerIndex}`);
    update(
      reference,
      votedUserId.includes(userId)
        ? {
            votedUserId: votedUserId.filter((id) => id !== userId),
            vote: voteNumber - 1,
          }
        : {
            votedUserId: votedUserId.concat(userId),
            vote: voteNumber + 1,
          }
    );
  };

  return (
    <View>
      <Text h1 style={{ textAlign: "center" }}>
        {post.title}
      </Text>
      {descendedAnswers.map((answer) => (
        <Card key={answer.id} containerStyle={{ marginTop: 15 }}>
          <Text>{answer.answer}</Text>
          <Card.Divider style={styles.divider} />
          <TouchableOpacity
            style={[
              styles.thumbsButton,
              answer.votedUserId.includes(userId)
                ? styles.clicked
                : styles.unClicked,
            ]}
            onPress={() => toggleVote(answer.id)}
          >
            <Feather
              name="thumbs-up"
              size={15}
              style={{ marginRight: 5 }}
              color={answer.votedUserId.includes(userId) ? "#fff" : "#000"}
            />
            <Text
              style={{
                color: answer.votedUserId.includes(userId) ? "#fff" : "#000",
              }}
            >
              {answer.vote}
            </Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 15,
  },
  thumbsButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  clicked: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: Colors.primary,
  },
  unClicked: {
    borderWidth: 1,
  },
});

export default PostDetail;
