import React, { useContext } from 'react';
import StarWarsContext from '../context/context';

function Table() {
  const { chaves, name, dadosFiltrados } = useContext(StarWarsContext);
  return (
    <main>
      <table>
        <thead>
          <tr>
            { chaves?.filter((e) => e !== 'residents')
              .map((k) => <th key={ k }>{ k }</th>) }
          </tr>
        </thead>
        <tbody>
          { dadosFiltrados?.filter((p) => p.name.toLowerCase()
            .includes(name.toLowerCase()))
            .map((planet) => (
              <tr key={ planet.name }>
                <td>
                  { planet.name }
                </td>
                <td>
                  { planet.rotation_period }
                </td>
                <td>
                  { planet.orbital_period }
                </td>
                <td>
                  { planet.diameter }
                </td>
                <td>
                  { planet.climate }
                </td>
                <td>
                  { planet.gravity }
                </td>
                <td>
                  { planet.terrain }
                </td>
                <td>
                  { planet.surface_water }
                </td>
                <td>
                  { planet.population }
                </td>
                <td>
                  { planet.films.length }
                </td>
                <td>
                  { planet.created }
                </td>
                <td>
                  { planet.edited }
                </td>
                <td>
                  <a href={ planet.url }>Leia mais</a>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
