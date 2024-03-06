import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { CheckOutlined, FlagFilled } from '@ant-design/icons';
import useCurrentUserData from '../../../utils/useCurrentUserData';

const FlagButton = ({ entryid }) => {
  const [isFlagged, setIsFlagged] = useState(false);
  const { userData } = useCurrentUserData();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!userData) {
      navigate('/user');
      return;
    }
    // TODO: Add to list in User collection
    setIsFlagged((prev) => !prev);
  };

  return (
    <Button className="min-w-0 transition-all" variant="light" radius="full" onClick={handleClick}>
      <div className="flex gap-2 place-items-center">
        {isFlagged ? (
          <>
            <p className="hidden sm:block">Added</p>
            <CheckOutlined className="text-xl" />
          </>
        ) : (
          <>
            <p className="hidden sm:block">Add to List</p>
            <FlagFilled className="text-xl" />
          </>
        )}
      </div>
    </Button>
  );
};

export default FlagButton;
