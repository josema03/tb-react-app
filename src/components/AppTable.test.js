import { render, screen } from '@testing-library/react';
import { AppTable } from './AppTable';

describe('AppTable', () => {
    it('Should render a table with the provided info and show loading spinner when needed', () => {
        const columns = [
            { label: 'Column 1', accessor: 'column1' },
            { label: 'Column 2', accessor: 'column2' },
            { label: 'Column 3', accessor: 'column3' },
        ];

        const data = [{ column1: 'data1', column2: 'data2', column3: 'data3' }];

        const { rerender } = render(<AppTable columns={columns} data={data} />);

        columns.forEach(({ label, accessor }) => {
            const columnHeader = screen.getByText(label);
            expect(columnHeader).toBeInTheDocument();

            data.forEach((row) => {
                const cell = screen.getByText(row[accessor]);
                expect(cell).toBeInTheDocument();
            });
        });

        rerender(<AppTable loading={true} columns={columns} data={data} />);

        const loadingSpinnerContainer = screen.getByTestId('spinner-container');
        expect(loadingSpinnerContainer).toBeInTheDocument();
    });
});
