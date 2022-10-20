import React, { useContext } from 'react';
import StarWarsContext from '../context/context';

function Search() {
  const { name, searchByName, columnValue,
    searchByColumnValue, comparison, searchByComparison,
    number, searchByNumber, filteringBy } = useContext(StarWarsContext);
  return (
    <form>
      <div>
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
      </div>
      <div>
        <label htmlFor="sbf">
          Selecione por
          <select
            id="sesbsbff"
            name="sbf"
            data-testid="column-filter"
            value={ columnValue }
            onChange={ searchByColumnValue }
          >
            <option name="sbf" value="population">population</option>
            <option name="sbf" value="orbital_period">orbital_period</option>
            <option name="sbf" value="diameter">diameter</option>
            <option name="sbf" value="rotation_period">rotation_period</option>
            <option name="sbf" value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="scf">
          <select
            id="scf"
            name="scf"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ searchByComparison }
          >
            que seja
            <option name="scf" value="maior que">maior que</option>
            <option name="scf" value="menor que">menor que</option>
            <option name="scf" value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="svf">
          o valor
          <input
            type="number"
            data-testid="value-filter"
            value={ number }
            onChange={ searchByNumber }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filteringBy }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Search;
