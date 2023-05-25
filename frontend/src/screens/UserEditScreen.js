import {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { getUserDetails } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom'
 
const UserEditScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {id : userId} = useParams();

    const dispatch = useDispatch();
    const userDetails = useSelector(store => store.userDetails);
    const {error, loading, user} = userDetails;

    const submitHandler = (e) => {
        e.preventDefault();
      
    }


    useEffect(()=>{
       if(!user || user._id !== userId){
            dispatch(getUserDetails(userId))
       }else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
       }
    },[dispatch, userId, user])

    return (
        <>
            <Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            <h1>Edit User</h1>
            {
                loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
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
    
                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
                )
            }
        
        </FormContainer>
        </>
       
    )
};

export default UserEditScreen;