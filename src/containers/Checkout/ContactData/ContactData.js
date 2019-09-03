import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Kevin Boswell',
        address: {
          street: 'Teststreet',
          zipCode: '37825',
          country: 'USA'
        },
        email: "test@test.com"
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });        
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.input} type="text" name="name" placeholder="Your name" />
        <input className={classes.input} type="email" name="email" placeholder="Your email" />
        <input className={classes.input} type="text" name="street" placeholder="Street" />
        <input className={classes.input} type="text" name="postal" placeholder="Postal Code" />

        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }

}

export default ContactData;