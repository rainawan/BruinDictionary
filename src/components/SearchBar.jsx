import { useState } from 'react';
import { SearchInput } from '@sumup/circuit-ui';
import { css } from '@emotion/react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(() => term);
  };

  return (
    <div className="SearchBar">
      <SearchInput
        label="search"
        hideLabel
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        css={css({ input: { color: 'black' } })}
        placeholder="dd"
      />
    </div>
  );
};

export default SearchBar;
