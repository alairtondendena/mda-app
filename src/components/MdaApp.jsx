import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MdaForm from './MdaForm';
import MdaModel from './MdaModel';
import MdaGenerator from './MdaGenerator';

export default function MdaApp() {
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [generatedModels, setGeneratedModels] = useState([]);

    function result(data) {
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
        <Container>
            <MdaForm onSubmit={result} />
            <Row>
                <Col sm={3}>
                    {models.map(model => {
                        return <MdaModel key={model.name} model={model} types={types} build={build} />
                    })}
                </Col>
            </Row>
            <MdaGenerator data={generatedModels} />
        </Container>
    )
}