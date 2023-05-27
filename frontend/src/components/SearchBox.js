import { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const SearchBox = () => {

    const [keyword, setKeyword] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
           navigate('/')
        }
    }

    return (
       
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} placeholder='Search products...' className="mr-sm-2 ml-sm-5"/>
            <Button style={{lineHeight: 0, height:'45px'}}type='submit' variant='outline-success'>Submit</Button>
        </Form>
    
    )
};

export default SearchBox;