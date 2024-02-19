export const unpackQuery = (query, transformData) => {
  if (query.isLoading) {
    return { status: 'LOADING', data: undefined };
  } else if (query.isError) {
    return { status: 'ERROR', data: undefined };
  }

  const snapshot = query.data;
  const data = transformData(snapshot);
  return { status: 'SUCCESS', data };
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
