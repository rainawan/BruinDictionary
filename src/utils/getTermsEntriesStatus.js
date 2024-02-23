export const getTermsEntriesStatus = (termsStatus, entriesStatus) => {
  try {
    if (entriesStatus === 'error' || termsStatus === 'error') {
      return 'error';
    } else if (entriesStatus === 'loading' || termsStatus === 'loading') {
      return 'loading';
    } else if (entriesStatus === 'success' && termsStatus === 'success') {
      return 'success';
    } else {
      throw new Error(
        `Unhandled status: entriesStatus=${entriesStatus}, termsStatus=${termsStatus}`
      );
    }
  } catch (error) {
    console.error(error, { entriesStatus, termsStatus });
    return 'unknown';
  }
};
