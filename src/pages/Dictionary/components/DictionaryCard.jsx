import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@nextui-org/react';
import useCurrentUserData from '../../../utils/useCurrentUserData';
import MoreDropdown from './MoreDropdown';
import EditMode from './EditMode';
import DisplayMode from './DisplayMode';
import Text from '../../../components/Text';

const DictionaryCard = ({ entry, terms }) => {
  const navigate = useNavigate();
  const { userData } = useCurrentUserData();
  const [editEntryid, setEditEntryid] = useState(undefined);

  const handleTermClick = (termname) => {
    navigate(`/?term=${termname}`);
  };

  return (
    <Card className="dark:bg-slate-600 p-6 md:p-8">
      <div className="text-left">
        <div className="flex place-content-between py-2 md:pb-3">
          <Text
            h2
            className="font-bold text-blue-800 dark:text-yellow-200 cursor-pointer inline break-all"
            onClick={() => handleTermClick(terms[entry.termid])}>
            {terms[entry.termid]}
          </Text>
          {userData !== undefined
            ? userData.userid === entry.userid &&
              editEntryid !== entry.id && (
                <MoreDropdown entryid={entry.id} setEditEntryid={setEditEntryid} />
              )
            : ''}
        </div>
        {editEntryid === entry.id ? (
          <EditMode
            entry={entry}
            setEditEntryid={setEditEntryid}
            termName={terms[entry.termid]}
            userid={userData.userid}
          />
        ) : (
          <DisplayMode entry={entry} />
        )}
      </div>
    </Card>
  );
};

export default DictionaryCard;
