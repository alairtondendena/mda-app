import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MdaForm({ onSubmit }) {
    const [notification, setNotification] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formData = request => {
        axios.post('http://localhost:8080/api/extract-metadata', (request))
            .then(response => {
                onSubmit(request, response.data);
                setNotification({ className: 'Success', title: 'Sucesso', message: 'Os modelos foram gerados!' })
            })
            .catch(error => {
                setNotification({ className: 'Danger', title: 'Erro', message: error.response.data.message })
            })
    };

    return (
        <div>
            <ToastContainer position="bottom-start" className="p-3">
                <Toast bg={notification.className?.toLowerCase()} onClose={() => setNotification({})} show={!!notification.message} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{notification.title}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{notification.message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Form onSubmit={handleSubmit(formData)}>
                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>URL</Form.Label>
                    <Form.Control {...register("url", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 250, message: "Limite máximo atingido!" } })} isInvalid={!!errors.url} type="text" placeholder="Enter url" />
                    <Form.Control.Feedback type="invalid">{errors.url?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User</Form.Label>
                    <Form.Control {...register("username", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.username} type="text" placeholder="Enter user" />
                    <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password", { required: { value: true, message: "Obrigatório!" }, maxLength: { value: 100, message: "Limite máximo atingido!" } })} isInvalid={!!errors.password} type="password" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Gerar
                    </Button>
                </div>
            </Form>
        </div>
    )
}