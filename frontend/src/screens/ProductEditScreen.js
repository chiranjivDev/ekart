import axios from 'axios';
import {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { listProductDetails, updateProduct} from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useParams} from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
 
const ProductEditScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand ] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const [uploading, setUploading]=useState(false);

    const {id : productId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(store => store.productDetails);
    const {error, loading, product} = productDetails;

    const productUpdate = useSelector(store => store.productUpdate);
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate;

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true)

        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data);
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category, 
            description,
            countInStock
        }))
      
    }


    useEffect(()=>{

        if(successUpdate){
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            navigate('/admin/productlist')
        }else{
            if(!product || product._id !== productId){
                dispatch(listProductDetails(productId))
           }else{
                setName(product.name);
                setPrice(product.price);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setImage(product.image);
                setCountInStock(product.countInStock);
           }
        }
      
    },[dispatch, productId, product, successUpdate])

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{error}</Message>}
            {
                loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='image'>
                    <Form.Label>Enter Imge URL</Form.Label>
                        <Form.Control type='text' label='Image' placeholder='Enter Image URL' value={image} onChange={(e)=>setImage(e.target.value)}>
                        </Form.Control>
                        <Form.Control id='image-file' type='file' label='choose-file' onChange={uploadFileHandler}>
                        </Form.Control>
                        {
                            uploading && <Loader/>
                        }
                    </Form.Group>

                    <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' label='Brand' placeholder='Enter Brand' value={brand} onChange={(e)=>setBrand(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                        <Form.Control type='text' label='Category' value={category} placeholder='Enter Category' onChange={(e)=>setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                        <Form.Control type='text' label='Description' value={description} placeholder='Enter Description' onChange={(e)=>setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
                )
            }
        
        </FormContainer>
        </>
       
    )
};

export default ProductEditScreen;