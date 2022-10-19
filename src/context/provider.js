import teste from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import StarWarsContext from './context';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSWApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const responseJson = await response.json();
      setData(responseJson);
    };
    fetchSWApi();
  }, []);
  // console.log(data.results);

  const context = useMemo(() => ({
    data, setData,
  }), [data]);

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
