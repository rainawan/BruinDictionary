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
        <Card key={index} className=" dark:bg-slate-600 p-6 md:p-8">
          <div className="text-left">
            <div className="py-2 md:pb-3">
              <p
                className="font-lora text-4xl md:text-5xl text-blue-800 dark:text-yellow-200 cursor-pointer inline"
                onClick={() => handleTermClick(terms[entry.termid])}>
                {terms[entry.termid]}
              </p>
            </div>
            <p className="text-md md:text-lg">{entry.definition}</p>
            <p className="mt-3 mb-1 text-md md:text-lg font-medium">Example</p>
            <p className="italic text-md md:text-lg">{entry.example}</p>
            <div className="mt-5 inline-flex flex-row gap-1">
              <Button className="hover:bg-blue-800">
                <LikeFilled className="text-lg" />
                <p className="text-sm">{entry.likes}</p>
              </Button>
              <Button className="hover:bg-red-800">
                <DislikeFilled className="text-lg" />
                <p className="text-sm">{entry.dislikes}</p>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DictionaryCard;
