import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@nextui-org/react';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

const DictionaryCard = ({ entries, terms }) => {
  const navigate = useNavigate();

  const handleTermClick = (termname) => {
    navigate(`/?term=${termname.toLowerCase()}`);
  };

  return (
    <div className="inline-flex flex-col gap-4 max-w-[55rem] pt-2 px-4 w-full">
      {entries.map((entry, index) => (
        <Card key={index} className="dark:bg-slate-600 p-6 md:p-8">
          <div className="text-left">
            <div className="py-2 md:pb-3">
              <p
                className="font-['Inter'] text-5xl md:text-6xl text-blue-800 dark:text-yellow-200 cursor-pointer inline"
                onClick={() => handleTermClick(terms[entry.termid])}>
                {terms[entry.termid]}
              </p>
            </div>
            <p className="text-lg md:text-xl">{entry.definition}</p>
            <p className="mt-3 mb-1 text-lg md:text-xl font-medium">Example</p>
            <p className="italic text-lg md:text-xl">{entry.example}</p>
            <div className="mt-5 inline-flex flex-row gap-1">
              <Button className="hover:text-green-500">
                <LikeFilled className="text-xl" />
                <p className="text-white">{entry.likes}</p>
              </Button>
              <Button className="hover:text-red-500">
                <DislikeFilled className="text-xl" />
                <p className="text-white">{entry.dislikes}</p>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DictionaryCard;
