import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Form, Navbar, Row, Spinner, Table } from 'react-bootstrap';
import { getData } from './apis/tb-express-server';

function App() {
    const [inputValue, setInputValue] = useState('');
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

    const queryData = useCallback(async (fileData) => {
        setLoading(true);

        try {
            const response = await getData(fileData);

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
            <div className="my-4">
                <Container>
                    <Row className="my-2">
                        <Col xs={12}>
                            <Form.Label htmlFor="fileNameQuery">File Name</Form.Label>
                            <Form.Control
                                id="fileNameQuery"
                                aria-describedby="fileNameQueryHelp"
                                value={inputValue}
                                onChange={({ target: { value } }) => setInputValue(value)}
                            />
                            <Form.Text id="fileNameQueryHelp" muted>
                                Search for a specific file by providing its name.
                            </Form.Text>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        {[
                            {
                                label: 'Search',
                                onClick: () => {
                                    if (loading) return;
                                    queryData(inputValue);
                                },
                                color: 'primary',
                            },
                            {
                                label: 'Reset',
                                onClick: () => {
                                    if (loading) return;
                                    setInputValue('');
                                    queryData();
                                },
                                color: 'danger',
                            },
                        ].map(({ label, onClick, color }) => (
                            <Col xs={6}>
                                <div className="d-grid">
                                    <Button disabled={loading} variant={color} onClick={onClick}>
                                        {label}
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row className="my-4">
                        <Col className="position-relative">
                            {loading && (
                                <div className="position-absolute top-0 d-flex justify-content-center w-100 p-5">
                                    <Spinner />
                                </div>
                            )}
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        {columns.map(({ label }) => (
                                            <th>{label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row) => (
                                        <tr>
                                            {columns.map(({ accessor }) => (
                                                <td>{row[accessor]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                    {!loading && data.length === 0 && (
                                        <tr>
                                            <td colSpan={columns.length}>Not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default App;
