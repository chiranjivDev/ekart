import { Link, useParams } from "react-router-dom";
import {Image, Row, Col, ListGroup, Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useEffect, useState} from "react";
import axios from "axios";

const ProductScreen = () => {

    const [product, setProduct]=useState({});

    const {id}=useParams();
    const url=`http://localhost:5000/api/products/${id}`;

    const fetchProduct=async()=>{
        try {
            const response=await axios.get(url);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProduct();
    },[])


    return (
       <>
            <Link to='/' className='btn btn-white my-3'>go back</Link>
            <Row>
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
            </Row>
       </>
    )
};

export default ProductScreen;