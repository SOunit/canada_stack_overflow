import { getDatabase, ref, push } from "firebase/database";

const demoData = {
  comments: [
    { comment: "demo comment", id: 1, vote: 10, votedUserId: ["demo user"] },
  ],
  id: 1,
  postDate: "2010-12-17T03:24:00",
  title: "Question 1",
};

const pushFirebaseData = () => {
  const db = getDatabase();
  const reference = ref(db, `/posts`);
  push(reference, demoData);
};

export default pushFirebaseData;
