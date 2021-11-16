import { useForm } from 'react-hook-form';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MdaForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formData = data => {
        axios.post('http://localhost:8080/api/create', (data))
            .then(res => {
                onSubmit(res.data);
            })
    };

    return (
        <Form onSubmit={handleSubmit(formData)}>
            <pre>{JSON.stringify(errors)}</pre>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control {...register("name", { required: true, maxLength: 100 })} type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control {...register("url", { required: true, maxLength: 250 })} type="text" placeholder="Enter url" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>User</Form.Label>
                <Form.Control {...register("username", { required: true, maxLength: 100 })} type="text" placeholder="Enter user" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password", { required: true, maxLength: 100 })} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    )
}