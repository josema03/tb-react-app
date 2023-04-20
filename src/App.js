import { useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppSearchBar } from './components/AppSearchBar';
import { AppTable } from './components/AppTable';
import { fetchTableData } from './stores';

function App() {
    const dispatch = useDispatch();

    const columns = useSelector((state) => state.table.columns);
    const data = useSelector((state) => state.table.data);
    const loading = useSelector((state) => state.table.loading);

    useEffect(() => {
        dispatch(fetchTableData());
    }, [dispatch]);

    return (
        <>
            <Navbar bg="danger" variant="dark">
                <Container>
                    <Navbar.Brand className="fw-bold">React Test App</Navbar.Brand>
                </Container>
            </Navbar>
            <AppSearchBar
                onSearch={(value) => dispatch(fetchTableData(value))}
                onReset={() => dispatch(fetchTableData())}
                loading={loading}
            />
            <AppTable loading={loading} columns={columns} data={data} />
        </>
    );
}

export default App;
