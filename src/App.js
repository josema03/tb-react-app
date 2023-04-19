import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { getData } from './apis/tb-express-server';
import { AppSearchBar } from './components/AppSearchBar';
import { AppTable } from './components/AppTable';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = useMemo(
        () => [
            { accessor: 'file', label: 'File Name' },
            { accessor: 'text', label: 'Text' },
            { accessor: 'number', label: 'Number' },
            { accessor: 'hex', label: 'Hex' },
        ],
        []
    );

    const queryData = useCallback(async (fileName) => {
        setLoading(true);

        try {
            const response = await getData(fileName);

            if (!response.ok) throw new Error(response.error);

            const updatedData = response.value
                .map(({ file, lines }) => {
                    return lines.map((line) => ({
                        file,
                        ...line,
                    }));
                })
                .flat();

            setData(updatedData);
        } catch (error) {
            setData([]);
            console.error(error);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        queryData();
    }, [queryData]);

    return (
        <>
            <Navbar bg="danger" variant="dark">
                <Container>
                    <Navbar.Brand className="fw-bold">React Test App</Navbar.Brand>
                </Container>
            </Navbar>
            <AppSearchBar onSearch={(value) => queryData(value)} onReset={() => queryData()} loading={loading} />
            <AppTable loading={loading} columns={columns} data={data} />
        </>
    );
}

export default App;
