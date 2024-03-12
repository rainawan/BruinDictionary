import useCurrentUserData from '../../utils/useCurrentUserData';
// import ProfileAvatar from '../../components/ProfileAvatar';
import SignOutButton from './components/SignOutButton';
import Text from '../../components/Text';
import PostTabs from './components/PostTabs';

const Profile = () => {
  const { userData } = useCurrentUserData();

  return (
    <section className="max-w-[60rem]">
      <div className="flex flex-col sm:flex-row p-5">
        {/* left-side div */}
        <div className="p-2 flex flex-col justify-center self-center max-w-[20rem]">
          <img className="object-fill object-center rounded-full w-[13rem]" src={userData.photo} />
          <div className="flex flex-col gap-1 p-2">
            <Text
              h3
              className="pt-px font-bold text-blue-800 dark:text-yellow-200 inline break-all">
              {userData?.username ?? 'None'}
            </Text>
            <Text className=" font-bold text-blue-800 dark:text-yellow-200 inline break-all">
              {userData?.email ?? 'No Email'}
            </Text>
            <SignOutButton />
          </div>
        </div>

        {/* right-side div */}
        <PostTabs />
      </div>
    </section>
  );
};

export default Profile;
