import { Link, useParams } from "react-router-dom";
import {Image, Row, Col, ListGroup, Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from '../components/Message'

const ProductScreen = () => {

    const dispatch = useDispatch();

    const productDetails = useSelector(store => store.productDetails)
    const {loading, error, product} = productDetails;

    const {id}=useParams();
    

    useEffect(()=>{
       dispatch(listProductDetails(id))
    },[dispatch, id])

  

    return (
       <>
            <Link to='/' className='btn btn-white my-3'>go back</Link>

            { loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <Row>
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
                            <ListGroup.Item>
                                <button className="btn-block btn-dark" type="button" disabled={product.countInStock===0}>add to cart</button> 
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}
            
       </>
    )
};

export default ProductScreen;