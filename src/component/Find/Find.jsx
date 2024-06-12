import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // 이 부분은 react-bootstrap의 해당 컴포넌트에 맞게 수정되어야 합니다.
import { useNavigate } from 'react-router-dom'; // 사용하는 라우터에 맞게 수정되어야 합니다.
import * as auth from '../../api/auth';
import * as Swal from '../../api/alert';
import '../Login/LoginForm.css'


function Find() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onPw = async (name, id, email) => {
        console.log(name, id, email);
        let response;

        try {
            response = await auth.pw(name, id, email);
            console.log(`data : ${response.data}`);
            console.log(`status : ${response.status}`);

            Swal.alert("비밀번호 찾기 성공", "Password:"+response.data , "success", () => { navigate("/login") })

        } catch (err) {
            console.log(err);
        }
    }

    const onId = async (username, email) => {
        console.log(username, email);
        let response;
        let loginId;
        try {
            response = await auth.id(username, email);
            console.log(`data : ${response.data}`);
            console.log(`status : ${response.status}`);
            loginId= response.data;
            console.log(`loginid : ${loginId}`);

            Swal.alert("아이디 찾기 성공", "ID:"+loginId , "success", () => { navigate("/login") })

        } catch {
            console.log('error');
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{marginRight: '20px'}} className='label-input-container' onClick={handleShow}>
                    아이디 찾기
                </label>
                <label className='label-input-container' onClick={handleShow}>
                    비밀번호 찾기
                </label>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='label-input-container'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                rows={1}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email@example.com"
                                autoFocus
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onPw(name, id, email)}>
                        Find Password
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>아이디 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                rows={1}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email@example.com"
                                autoFocus
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onId(name, email)}>
                        Find ID
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    );
}

export default Find;
