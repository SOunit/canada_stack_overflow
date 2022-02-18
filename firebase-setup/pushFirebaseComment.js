import { getDatabase, ref, push } from "firebase/database";

const demoData = {
  comment: "demo comment 2",
  votedUserIdList: ["demo-user-to-create-array"],
};

const pushFirebaseComment = (key) => {
  const db = getDatabase();
  const reference = ref(db, `/posts/${key}/comments`);
  push(reference, demoData);
};

export default pushFirebaseComment;
