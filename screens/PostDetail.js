import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { getDatabase, ref, update } from "firebase/database";
import Colors from "../constants/Colors";
import { initPostKey } from "../store/actions/postKey";

const PostDetail = ({ navigation }) => {
  const key = 0;
  const value = 1;

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const posts = useSelector((state) => state.posts); //[[key, {postDate:2020, ...}],[key, {postDate:2010, ...}]]
  const postKey = navigation.getParam("key");

  // for reference url in comment create page
  dispatch(initPostKey(postKey));

  // find chosen post
  const post = posts.find((el) => el[key] === postKey); //el=[key, {postDate:2020, ...}]

  const descendVoteSort = (arr) => {
    return arr.sort(
      (a, b) =>
        b[value].votedUserIdList.length - a[value].votedUserIdList.length
    );
  };
  const comments = post[value].comments; //{key: {}, key: {}, key{}}
  const entriesComments = Object.entries(comments);
  //[[0, {}], [key: {votedUserIdList, length=10, ...}], [key, {votedUserIdList: 20, ...}]]
  const descendEntriesComments = descendVoteSort(entriesComments);
  //[[key, {votedUserIdList: 20, ...}], [key, {votedUserIdList: length=10, ...}], [0, {}]]

  const toggleVote = (commentKey) => {
    // for updating data
    const targetComment = descendEntriesComments.find(
      (el) => el[key] === commentKey
    );
    const votedUserIdList = targetComment[value].votedUserIdList;

    const db = getDatabase();
    const reference = ref(db, `/posts/${postKey}/comments/${commentKey}`);
    update(
      reference,
      votedUserIdList.includes(userId)
        ? { votedUserIdList: votedUserIdList.filter((id) => id !== userId) }
        : { votedUserIdList: votedUserIdList.concat(userId) }
    );
  };

  return (
    <ScrollView>
      <Text h1 style={{ textAlign: "center" }}>
        {post[value].title}
      </Text>
      {descendEntriesComments.map((comment) => (
        <Card key={comment[key]} containerStyle={{ marginTop: 15 }}>
          <Text>{comment[value].comment}</Text>
          <Card.Divider style={styles.divider} />
          <TouchableOpacity
            style={[
              styles.thumbsButton,
              comment[value].votedUserIdList.includes(userId)
                ? styles.clicked
                : styles.unClicked,
            ]}
            onPress={() => toggleVote(comment[key])}
          >
            <Feather
              name="thumbs-up"
              size={15}
              style={{ marginRight: 5 }}
              color={
                comment[value].votedUserIdList.includes(userId)
                  ? "#fff"
                  : "#000"
              }
            />
            <Text
              style={{
                color: comment[value].votedUserIdList.includes(userId)
                  ? "#fff"
                  : "#000",
              }}
            >
              {comment[value].votedUserIdList.length - 1}
            </Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
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
