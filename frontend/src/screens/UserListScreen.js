import {useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {Table, Button} from 'react-bootstrap';
import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom'

const UserListScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userList = useSelector(store => store.userList);
    const {loading, error, users} = userList;


    const userLogin = useSelector(store => store.userLogin);
    const {userInfo} = userLogin;

    const userDelete = useSelector(store => store.userDelete)
    const{success:successDelete}=userDelete;
 
    useEffect(()=>{
        if(userInfo){
            dispatch(listUsers())
        }else{
            navigate('/')
        }
    },[dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id));
        }
    }

    return(
        <>
           <h1>Users</h1>
           {
                loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user)=>{
                                        return <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.isAdmin ? <i className='fas fa-check' style={{color: 'green'}}/> : <i className='fas fa-times' style={{color: 'red'}}/>
                                                }
                                        
                                            </td>
                                            <td>
                                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'/>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                                    <i className='fas fa-trash'/>
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                    </Table>
                )
           }
        </>
    )
};

export default UserListScreen;