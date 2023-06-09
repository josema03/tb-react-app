import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';

export const AppTable = ({ loading, columns, data }) => (
    <Container className="my-4">
        <Row>
            <Col className="position-relative">
                {loading && (
                    <div data-testid="spinner-container" className="position-absolute top-0 d-flex justify-content-center w-100 p-5">
                        <Spinner />
                    </div>
                )}
                <Table striped bordered>
                    <thead>
                        <tr>
                            {columns.map(({ label, accessor }) => (
                                <th key={accessor}>{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={`row-${idx}`}>
                                {columns.map(({ accessor }) => (
                                    <td key={`cell-${accessor}`}>{row[accessor]}</td>
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
);
