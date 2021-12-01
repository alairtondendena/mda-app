import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function MdaGenerator({ credentials, models }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const formData = request => {
        let requestData = {
            group: request.group,
            artifact: request.artifact,
            name: request.name,
            packageName: request.packageName,
            databaseCredentials: credentials,
            models: models
        }
        axios({
            url: 'http://localhost:8080/api/generate',
            data: requestData,
            method: 'POST',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', request.name + '.zip');
            document.body.appendChild(link);
            link.click();
            handleClose();
        });
    };

    return (
        <>
            <div style={{ margin: '50px 0' }} className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleShow}>
                    Gerar
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(formData)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Configurações do projeto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="group">
                            <Form.Label>Grupo</Form.Label>
                            <Form.Control {...register("group", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 250, message: "Limite máximo atingido!" } })} isInvalid={!!errors.group} type="text" placeholder="com.exemplo" />
                            <Form.Control.Feedback type="invalid">{errors.group?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="artifact">
                            <Form.Label>Artefato</Form.Label>
                            <Form.Control {...register("artifact", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.artifact} type="text" placeholder="nome-artefato" />
                            <Form.Control.Feedback type="invalid">{errors.artifact?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control {...register("name", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.name} type="text" placeholder="Nome do projeto" />
                            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="packageName">
                            <Form.Label>Package</Form.Label>
                            <Form.Control {...register("packageName", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.packageName} type="text" placeholder="com.exemplo.projeto" />
                            <Form.Control.Feedback type="invalid">{errors.packageName?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="show">
                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit">
                                Download
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}