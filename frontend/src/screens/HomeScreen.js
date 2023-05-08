import Product from '../components/Product';
import {Row, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


const url='http://localhost:5000/api/products';
const HomeScreen = () => {
    const [products, setProducts]=useState([]);

    const fetchProducts=async()=>{
        try {
            const response=await axios.get(url)
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {
                    products.map((product)=>{
                        return <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                 <Product {...product}/>
                               </Col>
                    })
                }
            </Row>
        </>
    )
};

export default HomeScreen;