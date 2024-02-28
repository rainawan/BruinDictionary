import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@nextui-org/react';
import useCurrentUserData from '../../../utils/useCurrentUserData';
import MoreDropdown from './MoreDropdown';
import EditMode from './EditMode';
import DisplayMode from './DisplayMode';

const DictionaryCard = ({ entries, terms }) => {
  const navigate = useNavigate();
  const { userData } = useCurrentUserData();
  const [editEntryid, setEditEntryid] = useState(undefined);

  const handleTermClick = (termname) => {
    navigate(`/?term=${termname.toLowerCase()}`);
  };

  return (
    <div className="inline-flex flex-col gap-4 max-w-[55rem] pt-2 px-4 w-full">
      {entries.map((entry, index) => (
        <Card key={index} className=" dark:bg-slate-600 p-6 md:p-8">
          <div className="text-left">
            <div className="flex place-content-between py-2 md:pb-3">
              <p
                className="font-lora text-4xl md:text-5xl text-blue-800 dark:text-yellow-200 cursor-pointer inline"
                onClick={() => handleTermClick(terms[entry.termid])}>
                {terms[entry.termid]}
              </p>
              {editEntryid !== entry.id && (
                <MoreDropdown entryid={entry.id} setEditEntryid={setEditEntryid} />
              )}
              {/* {userData === entry.userid && <MoreDropdown entryid={entry.id} />} */}
            </div>
            {editEntryid === entry.id ? (
              <EditMode entry={entry} setEditEntryid={setEditEntryid} />
            ) : (
              <DisplayMode entry={entry} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DictionaryCard;
