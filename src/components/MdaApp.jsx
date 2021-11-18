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
        const i = generatedModels.findIndex(_item => _item.name === data.name);
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
                    <Col sm={6}>
                        <Card>
                            <Card.Header className="text-center">Sobre o projeto</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Modelos Específicos de Plataforma utilizados na Arquitetura Dirigida a Modelos geram artefatos com código-fonte que facilitam e aumentam a produtividade no desenvolvimento de software. Esta pesquisa desenvolve uma plataforma que extraí metadados de um banco de dados relacional gerando Web Services com uso dos conceitos de No-Code e Low-Code, transformando modelos e disponibilizando artefatos na linguagem de programação Java. Após uso da plataforma em bases de dados existentes, foram coletados dados de performance e analisados os artefatos gerados validando a execução dos mesmos.
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