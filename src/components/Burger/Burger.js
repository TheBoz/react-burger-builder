import React from 'react';

// import Auxiliary from '../../hoc/Auxiliary';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  console.log(props);

  // let transformedIngredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       return <BurgerIngredient key={igKey + i} type={igKey} />;
  //     });
  //   })

  // Alternative method - easier to read
  let transformedIngredients = [];
  for (let key in props.ingredients) {
    for (let i = 0; i < props.ingredients[key]; i++) {
      transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />)
    }
  }
  // console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );

};

export default burger;