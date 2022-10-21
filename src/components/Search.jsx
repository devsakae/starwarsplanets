import React, { useContext } from 'react';
import StarWarsContext from '../context/context';

function Search() {
  const { name, searchByName, columnValue, columnOptions,
    searchByColumnValue, comparison, filters, searchByComparison,
    number, searchByNumber, filteringBy, removeFiltro } = useContext(StarWarsContext);
  return (
    <form>
      <div className="search__field">
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
      <div className="search__field">
        <label htmlFor="sbf">
          Selecione por
          <select
            id="sbf"
            name="sbf"
            data-testid="column-filter"
            value={ columnValue }
            onChange={ searchByColumnValue }
          >
            { columnOptions.filter((cop) => {
              const tempVar = filters.map((filtro) => filtro.filterColumn);
              return !tempVar.includes(cop);
            })
              .map((opt) => (
                <option name="sbf" value={ opt } key={ opt }>
                  { opt }
                </option>))}
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
      <div>
        { filters.map((filtro, index) => (
          <div key={ index } className="filtroAplicado" data-testid="filter">
            {filtro.filterColumn}
            { ' ' }
            {filtro.filterComparison}
            { ' ' }
            {filtro.filterNumber}
            { ' ' }
            <button
              type="button"
              onClick={ () => removeFiltro(filtro, false) }
            >
              x
            </button>
          </div>
        )) }
        { (filters.length > 0)
        && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => removeFiltro(null, true) }
          >
            Apagar todos filtros
          </button>
        ) }
      </div>
    </form>
  );
}

export default Search;
