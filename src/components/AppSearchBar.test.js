import { fireEvent, render, screen } from '@testing-library/react';
import { AppSearchBar } from './AppSearchBar';

describe('AppSearchBar', () => {
    it('Should render and call passed down functions', () => {
        const searchFunction = jest.fn();
        const resetFunction = jest.fn();

        render(<AppSearchBar onSearch={searchFunction} onReset={resetFunction} />);

        const textTestValue = 'Test';

        const input = screen.getByTestId('searchInput');
        fireEvent.change(input, { target: { value: textTestValue } });

        expect(input.value).toBe(textTestValue);

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);
        expect(searchFunction).toBeCalledWith(textTestValue);

        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        expect(resetFunction).toBeCalled();

        expect(input.value).toBe('');
    });
});
