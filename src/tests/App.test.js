import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

describe('Testa o componente Search', () => {
  test('Tá tudo aqui?', () => {
    render(<App />);
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });
  test('Os selects estão aparecendo?', () => {
    render(<App />);
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'Testando');
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    userEvent.click(columnSelect);
    userEvent.click(comparisonSelect);
    userEvent.type(valueInput, '1000');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
  });
});
