import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import MdaMetaModel from './MdaMetaModel';

export default function MdaModel({model, types, build}) {
    const [generatedMetaModels, setGeneratedMetaModels] = useState([]);

    function buildModel(data) {
        const i = generatedMetaModels.findIndex(_item => _item.name === data.name);
        if (i > -1) generatedMetaModels[i] = data;
        else generatedMetaModels.push(data);
        setGeneratedMetaModels(generatedMetaModels);
        build({
            name: model.name,
            attributes: generatedMetaModels
        });
    }

    return (
        <Card>
            <Card.Header>{model.name}</Card.Header>
            <Card.Body>
                {model.attributes.map((attribute, index) => {
                    return <MdaMetaModel key={index} pos={index} attribute={attribute} types={types} build={buildModel} />
                })}
            </Card.Body>
        </Card>
    );
}