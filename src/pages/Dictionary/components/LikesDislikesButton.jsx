export const LikesDislikesButton = ({ likes, dislikes }) => {
  return <p>{(likes || 0) - (dislikes || 0)}</p>;
};
