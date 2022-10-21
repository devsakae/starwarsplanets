import teste from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import StarWarsContext from './context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [chaves, setChaves] = useState([]);
  const [name, setName] = useState('');
  const [columnValue, setColumnValue] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [estaFiltrando, setEstaFiltrando] = useState(false);

  useEffect(() => {
    const fetchSWApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
      setDadosFiltrados(results);
      const keys = Object.keys(results[0]);
      setChaves(keys);
    };
    fetchSWApi();
  }, []);

  const filtrandoPor = useCallback(() => {
    filters.forEach((f) => {
      switch (f.filterComparison) {
      case 'maior que': {
        // console.log('ativou MAIOR que');
        setDadosFiltrados(dadosFiltrados
          .filter((p) => p[f.filterColumn] > Number(f.filterNumber)));
        break;
      }
      case 'menor que': {
        // console.log('ativou menor que');
        setDadosFiltrados(dadosFiltrados
          .filter((p) => p[f.filterColumn] < Number(f.filterNumber)));
        break;
      }
      case 'igual a': {
        // console.log('igual a');
        setDadosFiltrados(dadosFiltrados
          .filter((p) => p[f.filterColumn] === f.filterNumber));
        break;
      }
      default: return dadosFiltrados;
      }
    });
    setEstaFiltrando(false);
  }, [dadosFiltrados, filters]);

  useEffect(() => {
    if (estaFiltrando) {
      filtrandoPor();
    }
  }, [filters, estaFiltrando, filtrandoPor]);

  const searchByName = ({ target }) => {
    setName(target.value);
  };

  const searchByColumnValue = ({ target }) => {
    setColumnValue(target.value);
  };

  const searchByComparison = ({ target }) => {
    setComparison(target.value);
  };

  const searchByNumber = ({ target }) => {
    setNumber(target.value);
  };

  const filteringBy = useCallback(() => {
    setFilters((prevState) => [
      ...prevState,
      {
        filterColumn: columnValue,
        filterComparison: comparison,
        filterNumber: number,
      },
    ]);
    setEstaFiltrando(true);
  }, [columnValue, comparison, number]);

  const context = useMemo(() => ({
    data,
    chaves,
    name,
    columnValue,
    comparison,
    number,
    filters,
    dadosFiltrados,
    searchByName,
    searchByColumnValue,
    searchByComparison,
    searchByNumber,
    filteringBy,
  }), [data, chaves, name, columnValue, comparison, number,
    filters, dadosFiltrados, filteringBy]);

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: teste.shape({}),
}.isRequired;

export default Provider;
