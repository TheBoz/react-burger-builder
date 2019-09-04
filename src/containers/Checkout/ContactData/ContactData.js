import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {

      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid Name'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid Street'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid 5 digit Zip Code'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid Country'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid email'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData

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

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (isValid && rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    if (isValid && rules.maxLength) {
      isValid = value.length <= rules.maxLength;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);

    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    // Call validation function
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>        
        {/* <Input elementType="" elementConfig="" value="" /> */}
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            errorMessage={formElement.config.errorMessage}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);