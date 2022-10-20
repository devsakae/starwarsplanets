import teste from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import StarWarsContext from './context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [chaves, setChaves] = useState([]);
  const [name, setName] = useState('');
  const [columnValue, setColumnValue] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [podeFiltrar, setPodeFiltrar] = useState(false);

  useEffect(() => {
    const fetchSWApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setData(results);
      const keys = Object.keys(results[0]);
      setChaves(keys);
    };
    fetchSWApi();
  }, []);

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

  const filteringBy = () => {
    setPodeFiltrar(true);
    setFilters((prevState) => [
      ...prevState,
      {
        filterColumn: columnValue,
        filterComparison: comparison,
        filterNumber: number,
      },
    ]);
  };

  const filtrandoPor = () => {
    if (podeFiltrar) {
      switch (comparison) {
      case 'maior que': return data.filter((p) => p[columnValue] > Number(number));
      case 'menor que': return data.filter((p) => p[columnValue] < Number(number));
      default: return data.filter((p) => p[columnValue] === number);
      }
    }
    return data;
  };

  const context = useMemo(() => ({
    data,
    chaves,
    name,
    columnValue,
    comparison,
    number,
    filters,
    searchByName,
    searchByColumnValue,
    searchByComparison,
    searchByNumber,
    filteringBy,
    filtrandoPor,
  }), [data, chaves, name, columnValue, comparison, number,
    filters, filteringBy, filtrandoPor]);

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
