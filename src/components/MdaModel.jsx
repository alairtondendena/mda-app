import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import MdaMetaModel from './MdaMetaModel';

export default function MdaModel({ model, types, build }) {
    const [generatedMetaModels, setGeneratedMetaModels] = useState([]);

    function buildModel(data) {
        const i = generatedMetaModels.findIndex(_item => _item.id === data.id);
        if (i > -1) generatedMetaModels[i] = data;
        else generatedMetaModels.push(data);
        setGeneratedMetaModels(generatedMetaModels);
        build({
            id: model.id,
            name: model.name,
            attributes: generatedMetaModels
        });
    }

    return (
        <Accordion>
            <Accordion.Item eventKey={model.id}>
                <Accordion.Header>{model.name}</Accordion.Header>
                <Accordion.Body>
                    {model.attributes.map((attribute, index) => {
                        return <MdaMetaModel key={index} pos={index} attribute={attribute} types={types} build={buildModel} />
                    })}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}