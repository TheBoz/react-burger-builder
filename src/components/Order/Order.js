import React from 'react';
// import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

import classes from './Order.module.css';

const order = (props) => {
  
  let ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      }
    )
  }

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-b;ock',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ig.name}>{ig.name} ({ig.amount})</span>
  });
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
}

export default order;