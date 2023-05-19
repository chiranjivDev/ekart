import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {Form, Button, Col} from 'react-bootstrap'

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const cart = useSelector(store => store.cart);
    const {shippingAddress}= cart;

    const navigate = useNavigate();

    if(!shippingAddress){
        navigate('/shipping')
    };

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check 
                    checked 
                    type='radio' 
                    label='PayPal or Credit Card' 
                    name='paymentMethod' 
                    id='PayPal' 
                    value='PayPal' 
                    onChange={(e)=>setPaymentMethod(e.target.value)}>

                    </Form.Check>

                    <Form.Check 
                    type='radio' 
                    label='Stripe' 
                    name='paymentMethod' 
                    id='Stripe' 
                    value='Stripe' 
                    onChange={(e)=>setPaymentMethod(e.target.value)}>
                        
                    </Form.Check>
                </Col>
                <Button variant='primary' type='submit'>Continue</Button>
            </Form>
        </FormContainer>
    )
};

export default PaymentScreen