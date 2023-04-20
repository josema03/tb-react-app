import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './stores';

const testResponse = [
    {
        file: 'test.csv',
        lines: [
            {
                text: 'testText',
                number: 'testNumber',
                hex: 'testHex',
            },
        ],
    },
];

describe('App', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve(testResponse);
                },
            })
        );
    });

    it('Should render and show loading spinner when fetching', async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const loadingSpinnerContainer = screen.getByTestId('spinner-container');

        await waitForElementToBeRemoved(loadingSpinnerContainer);

        testResponse.forEach((data) => {
            const fileNameCell = screen.getByText(data.file);
            expect(fileNameCell).toBeInTheDocument();

            data.lines.forEach((line) => {
                Object.values(line).forEach((lineValue) => {
                    const valueCell = screen.getByText(lineValue);
                    expect(valueCell).toBeInTheDocument();
                });
            });
        });

        const input = screen.getByTestId('searchInput');
        fireEvent.change(input, { target: { value: 'Whatever' } });

        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        const loadingSpinnerContainer2 = screen.getByTestId('spinner-container');
        expect(loadingSpinnerContainer2).toBeInTheDocument();

        await waitForElementToBeRemoved(loadingSpinnerContainer2);
    });

    afterEach(() => {
        fetch.mockClear();
    });
});
