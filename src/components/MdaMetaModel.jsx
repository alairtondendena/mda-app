import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function MdaMetaModel({pos, attribute, types, build}) {
    const { register, getValues, watch, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: attribute
    });
    const watchFields = watch();

    useEffect(() => {
        build(getValues());
    }, [watchFields, getValues, build])

    return (
        <Form>
            <pre>{JSON.stringify(errors)}</pre>
            <Form.Group controlId={'name-' + pos}>
                <Form.Label>Nome</Form.Label>
                <Form.Control {...register("name", { required: true, maxLength: 100 })} type="text" placeholder="Nome" />
            </Form.Group>
            <Form.Group controlId={'columnDefault-' + pos}>
                <Form.Label>Valor Padrão</Form.Label>
                <Form.Control {...register("columnDefault", { maxLength: 100 })} type="text" placeholder="Valor Padrão" />
            </Form.Group>
            <Form.Group controlId={'dataType-' + pos}>
                <Form.Label>Tipo</Form.Label>
                <Form.Select {...register("dataType", { required: true })} aria-label="Tipo">
                    <option>Selecione</option>
                    {types.map((type) => <option key={type.value} value={type.value}>{type.description}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId={'description-' + pos}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control {...register("description", { maxLength: 100 })} type="text" placeholder="Descrição" />
            </Form.Group>
            <Form.Group controlId={'charLength-' + pos}>
                <Form.Label>Tamanho</Form.Label>
                <Form.Control {...register("charLength", { maxLength: 100 })} type="number" placeholder="Tamanho" />
            </Form.Group>
            <Form.Group controlId={'numScale-' + pos}>
                <Form.Label>Precisão</Form.Label>
                <Form.Control {...register("numScale", { maxLength: 100 })} type="number" placeholder="Precisão" />
            </Form.Group>
            <Form.Group controlId={'nullable-' + pos}>
                <Form.Check {...register("nullable")} type="checkbox" label="Obrigatório" />
            </Form.Group>
            <Form.Group controlId={'primaryKey-' + pos}>
                <Form.Check {...register("primaryKey")} type="checkbox" label="Chave Primária" />
            </Form.Group>
            ----
        </Form>
    );
}