import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function MdaMetaModel({ pos, attribute, types, build }) {
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
            <Form.Group controlId={'name-' + pos}>
                <Form.Label>Nome</Form.Label>
                <Form.Control {...register("name", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.name} type="text" placeholder="Nome" />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={'columnDefault-' + pos}>
                <Form.Label>Valor Padrão</Form.Label>
                <Form.Control {...register("columnDefault", { maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.columnDefault} type="text" placeholder="Valor Padrão" />
                <Form.Control.Feedback type="invalid">{errors.columnDefault?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={'dataType-' + pos}>
                <Form.Label>Tipo</Form.Label>
                <Form.Select {...register("dataType", { required: { value: true, message: "Obrigatório!" } })} isInvalid={!!errors.dataType} aria-label="Tipo">
                    <option>Selecione</option>
                    {types.map((type) => <option key={type.value} value={type.value}>{type.description}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.dataType?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={'description-' + pos}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control {...register("description", { maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.description} type="text" placeholder="Descrição" />
                <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId={'length-' + pos}>
                <Form.Label>Tamanho</Form.Label>
                <Form.Control {...register("length")} type="number" placeholder="Tamanho" />
            </Form.Group>
            <Form.Group controlId={'numScale-' + pos}>
                <Form.Label>Precisão</Form.Label>
                <Form.Control {...register("numScale")} type="number" placeholder="Precisão" />
            </Form.Group>
            <Form.Group controlId={'nullable-' + pos}>
                <Form.Check {...register("nullable")} type="checkbox" label="Obrigatório" />
            </Form.Group>
            <Form.Group controlId={'primaryKey-' + pos}>
                <Form.Check {...register("primaryKey")} disabled type="checkbox" label="Chave Primária" />
            </Form.Group>
            <hr />
        </Form>
    );
}