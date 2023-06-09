import {useSelector, useDispatch} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {

    const cart = useSelector(store => store.cart);
    const {cartItems} = cart;

    // Calculate Prices

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2);
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, curr)=>{
        return acc = curr.price * curr.qty;
    }, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

    cart.taxPrice = addDecimals(Number((cart.itemsPrice * 0.15).toFixed(2)));

    cart.totalPrice = (
        Number(cart.itemsPrice) + 
        Number(cart.shippingPrice) + 
        Number(cart.taxPrice)).toFixed(2);

    // ------------------------------------------------------------------------------

    const orderCreate = useSelector(store => store.orderCreate);
    const {order , success, error} = orderCreate;

    const navigate = useNavigate();

    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`);
        }
    },[navigate, success])

    const dispatch= useDispatch();

    const placeOrderHandler=()=>{
        dispatch(createOrder({
            orderItems : cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsprice :cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
       <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address :</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {cart.shippingAddress.city}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                                <strong>Method :</strong>
                                {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cart.cartItems === 0 ? <Message>Your Cart is Empty!</Message> :
                                <ListGroup>
                                    {
                                        cart.cartItems.map((item, index)=>{
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
                                    <Col>$ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippingtems</Col>
                                    <Col>$ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>$ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {
                                    error && <Message variant='danger'>{error}</Message>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
       </>
    )
};

export default PlaceOrderScreen;
