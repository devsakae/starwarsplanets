import teste from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import StarWarsContext from './context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [chaves, setChaves] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchSWApi = async () => {
      // const response = await fetch('https://rickandmortyapi.com/api/character');
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

  const context = useMemo(() => ({
    data, chaves, name, searchByName,
  }), [data, chaves, name]);

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
