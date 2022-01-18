const descendDateSort = (arr) => {
  return arr.sort((a, b) => {
    return new Date(b.postDate) - new Date(a.postDate);
  });
};

export default descendDateSort;
