import {useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom'
 
const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]=useState(null);
    const [confirmPassword, setConfirmPassword]=useState('')


    const navigate=useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector(store => store.userLogin);
    const {error, loading, userInfo} = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            return setMessage('Passwords do not match!')
        }else{
            dispatch(register(name, email, password));
            setName('');
            setEmail('');
            setPassword('');
        }
      
    }


    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[dispatch, userInfo])

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message>{error}</Message>}
            {message && <Message>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Set Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'> 
                <Col>
                    Already registered? <Link to={'/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
};

export default RegisterScreen;