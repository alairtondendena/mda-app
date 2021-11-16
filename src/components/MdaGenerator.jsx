import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function MdaGenerator(props) {
    let request = { name: "teste", models: props.data }
    function generate() {
        axios({
            url: 'http://localhost:8080/api/generate',
            data: request,
            method: 'POST',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.zip');
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <Button variant="primary" size="lg" onClick={generate}>
            Generate
        </Button>
    );
}