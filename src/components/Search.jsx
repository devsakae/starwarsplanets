import React, { useContext } from 'react';
import StarWarsContext from '../context/context';

function Search() {
  const { name, searchByName } = useContext(StarWarsContext);
  return (
    <form>
      <label htmlFor="search_name_input">
        Pesquisar por nome:
        <input
          id="search_name_input"
          name="search_name_input"
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ searchByName }
        />
      </label>
    </form>
  );
}

export default Search;
