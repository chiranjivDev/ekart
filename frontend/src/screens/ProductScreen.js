import { Link, useParams } from "react-router-dom";
import {Image, Row, Col, ListGroup, Card, Button , Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from '../components/Message';
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(store => store.productDetails)
    const {loading, error, product} = productDetails;

    
    const productReviewCreate = useSelector(store => store.productReviewCreate)
    const {success:successProductReview,  error:errorProductReview} = productReviewCreate;

    const userLogin = useSelector(store => store.userLogin)
    const {userInfo} = userLogin;

    const {id}=useParams();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(successProductReview){
            alert('Review added successfully');
            setRating(0);
            setComment('');
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            })
        }
       dispatch(listProductDetails(id))
    },[dispatch, id, successProductReview])

  
    const addToCartHandler=()=>{
        navigate(`/cart/${id}?qty=${quantity}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }

    return (
       <>
            <Link to='/' className='btn btn-white my-3'>go back</Link>

            { loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <><Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}> 
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Stock: </Col>
                                    <Col>
                                       {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty: </Col>
                                            <Col>
                                                <Form.Control as='select' value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => <option key={x+1} value={x+1}>{x+1}</option>)
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }
                            <ListGroup.Item>
                                <button className="btn-block btn-dark" type="button" disabled={product.countInStock===0} onClick={addToCartHandler}>add to cart</button> 
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
                 <Row>
                 <Col md={6}>
                     <h2>Reviews</h2>
                     {product.reviews.length === 0 && <Message>No Reviews</Message>}
                     <ListGroup>
                        {
                            product.reviews.map((review)=>{
                                return <ListGroup.Item key={review._id}><strong>{review.name}</strong>
                                <Rating value={review.rating}></Rating>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                                </ListGroup.Item>
                            })
                        }
                        <ListGroup.Item>
                            <h2>Write a customer review</h2>
                            {
                                errorProductReview && <Message variant='danger'>{errorProductReview}</Message>
                            }
                            {
                                userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                                <option value=''>Select</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row={3} value={comment} onChange={(e)=>setComment(e.target.value)}>
                                
                                            </Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Submit</Button>
                                    </Form>
                                ) : <Message>Please <Link to='/login'>Sign In</Link> to write a review</Message>
                            }
                        </ListGroup.Item>
                     </ListGroup>
                 </Col>
             </Row>
             </>
            }
       
       </>
    )
};

export default ProductScreen;