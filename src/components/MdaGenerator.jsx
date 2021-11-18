import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function MdaGenerator({ credentials, models }) {
    let request = {
        group: 'net.unesc.tcc',
        artifact: 'unesc-tcc',
        name: "mda",
        packageName: 'net.unesc.tcc.mda',
        databaseCredentials: credentials, models: models
    }

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
            link.setAttribute('download', request.name + '.zip');
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <div style={{ margin: '50px 0' }} className="d-grid gap-2">
            <Button variant="success" size="lg" onClick={generate}>
                Download
            </Button>
        </div>
    );
}