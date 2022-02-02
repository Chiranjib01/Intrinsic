const toArray = (tags: string): Array<string> => {
  const tagsArray: string[] = [];
  tags.split(',').forEach((tag) => {
    if (tag) {
      tagsArray.push(tag);
    }
  });
  return tagsArray;
};
export default toArray;
