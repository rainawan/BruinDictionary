export const unpackQuery = (query, transformData) => {
  const status = query.status;
  if (status !== 'success') {
    return { status, data: undefined };
  }
  const snapshot = query.data;
  const data = transformData(snapshot);
  return { status, data };
};

export const unpackEntriesQuery = (entriesQuery) => {
  return unpackQuery(entriesQuery, (snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  );
};

export const unpackTermsQuery = (termsQuery) => {
  return unpackQuery(termsQuery, (snapshot) =>
    snapshot.docs.reduce((prev, doc) => {
      prev[doc.id] = doc.data().name;
      return prev;
    }, {})
  );
};
