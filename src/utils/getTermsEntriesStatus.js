export const getTermsEntriesStatus = (termsStatus, entriesStatus) => {
  try {
    if (entriesStatus === 'ERROR' || termsStatus === 'ERROR') {
      return 'ERROR';
    } else if (entriesStatus === 'LOADING' || termsStatus === 'LOADING') {
      return 'LOADING';
    } else if (entriesStatus === 'SUCCESS' && termsStatus === 'SUCCESS') {
      return 'SUCCESS';
    } else {
      throw new Error(
        `Unhandled status: entriesStatus=${entriesStatus}, termsStatus=${termsStatus}`
      );
    }
  } catch (error) {
    console.error(error, { entriesStatus, termsStatus });
    return 'UNKNOWN';
  }
};
