import {useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useNavigate} from 'react-router-dom'
 
const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector(store => store.userLogin);
    const {error, loading, userInfo} = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setEmail('');
        setPassword('');
    }

    
    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[dispatch, userInfo])

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'> 
                <Col>
                    New Customer? <Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
};

export default LoginScreen;