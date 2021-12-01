import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';

import MdaForm from './MdaForm';
import MdaModel from './MdaModel';
import MdaGenerator from './MdaGenerator';

export default function MdaApp() {
    const [credentials, setCredentials] = useState({});
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [generatedModels, setGeneratedModels] = useState([]);

    function result(credentials, data) {
        setCredentials(credentials)
        setTypes(data.types);
        setModels(data.models);
    }

    function build(data) {
        const i = generatedModels.findIndex(_item => _item.id === data.id);
        if (i > -1) generatedModels[i] = data;
        else generatedModels.push(data);
        setGeneratedModels(generatedModels);
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">MDA Project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col sm={6}>
                        <MdaForm onSubmit={result} />
                    </Col>
                    <Col sm={6} style={{ marginTop: '30px' }}>
                        <Card>
                            <Card.Header className="text-center">Sobre o projeto</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <img src="use-case.png" alt="Caso de uso" className="img-fluid" />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '50px' }}>
                    {models.map(model => {
                        return (<Col key={model.name} sm={4}>
                            <MdaModel key={model.name} model={model} types={types} build={build} />
                        </Col>)
                    })}
                </Row>
                {models.length > 0 && <MdaGenerator credentials={credentials} models={generatedModels} />}
            </Container>
        </div>
    )
}