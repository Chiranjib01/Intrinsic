const dateFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const docToString = (doc: any) => {
  if (doc.createdAt) {
    doc.createdAt = doc.createdAt
      .toDate()
      .toLocaleDateString('en-US', dateFormatOptions);
  }
  return doc;
};

export default docToString;
