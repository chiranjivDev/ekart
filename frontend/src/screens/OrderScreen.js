import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Row , ListGroup, Image, Col, Card} from 'react-bootstrap';

const OrderScreen = () => {

    const {id: orderId} = useParams();

    const orderDetails = useSelector(store => store.orderDetails);
    const {loading, order, error} = orderDetails;

    const dispatch = useDispatch();

    if(!loading){
        // Calculate Price
        const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2);
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, curr)=>{
         return acc = curr.price * curr.qty;
        }, 0))
        
    }
   

    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId]) 

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1> Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name :</strong> {order.user.name}</p>
                            <p><strong>Email :</strong><a href={`mailto: ${order.user.email}`}> {order.user.email}</a></p>
                            <p>
                                <strong>Address :</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {order.shippingAddress.city}, {order.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method :</strong>
                                {order.paymentMethod}
                            </p>
                            {
                                order.isPaid ? <Message variant='success'>Paid on ${order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length === 0 ? <Message>Your Cart is Empty!</Message> :
                                <ListGroup>
                                    {
                                        order.orderItems.map((item, index)=>{
                                            return <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x {item.price} = {`$${ item.price * item.qty}`} 
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        })
                                    }
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippingtems</Col>
                                    <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

    </>
};

export default OrderScreen;