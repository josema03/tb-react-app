import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export const AppSearchBar = ({ onSearch, onReset, loading }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <Container className="my2">
            <Row className="my-2">
                <Col xs={12}>
                    <Form.Label htmlFor="fileNameQuery">File Name</Form.Label>
                    <Form.Control
                        data-testid="searchInput"
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

                            onSearch(inputValue);
                        },
                        color: 'primary',
                    },
                    {
                        label: 'Reset',
                        onClick: () => {
                            if (loading) return;

                            setInputValue('');
                            onReset();
                        },
                        color: 'danger',
                    },
                ].map(({ label, onClick, color }) => (
                    <Col key={label} xs={6}>
                        <div className="d-grid">
                            <Button disabled={loading} variant={color} onClick={onClick}>
                                {label}
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
