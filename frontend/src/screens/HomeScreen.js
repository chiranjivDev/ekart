import Product from '../components/Product';
import {Row, Col} from 'react-bootstrap';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useParams} from 'react-router-dom'
import Paginate from '../components/Paginate';


const HomeScreen = () => {

    const dispatch = useDispatch();
    const {keyword, pageNumber} = useParams();

    const productList = useSelector(store => store.productList)
    const {loading, error, products, page, pages } = productList;

    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber || 1))
    },[dispatch, keyword, pageNumber]);

    
    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :  
            <>
            <Row>
                {
                    products.map((product)=>{
                        return <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                 <Product {...product}/>
                               </Col>
                    })
                }
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </>
            }
           
        </>
    )
};

export default HomeScreen;