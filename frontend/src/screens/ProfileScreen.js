import {useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { getUserDetails } from '../actions/userActions';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom'
 
const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]=useState(null);
    const [confirmPassword, setConfirmPassword]=useState('')


    const navigate=useNavigate();

    const dispatch = useDispatch();

    const userDetails = useSelector(store => store.userDetails);
    const {error, loading, user} = userDetails;

    const userLogin = useSelector(store => store.userLogin);
    const {userInfo} = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
      
    }


    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user){
                dispatch(getUserDetails('profile'))
            }else{
                console.log(user)
                setName(user.name);
                setEmail(user.email)
            }
        }
    },[dispatch,navigate, userInfo, user])

    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
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
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
};

export default ProfileScreen;