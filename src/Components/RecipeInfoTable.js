import React from 'react';
import {Table} from "reactstrap";

import "../css/RecipeInfoTable.css";
import Ingredient from "./Ingredient";


const RecipeInfoTable = ({ingredients, ingredientCount, totalPrice, totalCost, totalQuantity, handleChange}) => {

    const createRemainingRows = () => {
        let rows = [];
        let freeRows = 8 - ingredientCount;

        for(let i = 0; i < freeRows; i++){
            rows.push(
                <tr key={uniqid()} className="filling-rows">
                    <th scope="row"></th>
                    <td></td><td></td><td></td><td></td>
                </tr>
            );
        }
        return rows;
    }

    const uniqid = require('uniqid');

    return(
        <div className='recipe'>
            <Table hover size="sm" id="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ingredient</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredients.map((ingredient, row) => (
                            <Ingredient
                                key={uniqid()}
                                row={row+1}
                                name={ingredient.name}
                                amount={ingredient.amount}
                                price={ingredient.price}
                                cost={ingredient.cost}
                            />
                            ))}
                     <tr>
                         <th scope="row">
                            =
                         </th>
                         <td>
                             Type your quantity:
                         </td>
                         <td>
                             <input
                                 style={{width: "60px", textAlign: "center"}}
                                 type="number"
                                 value={totalQuantity}
                                 onChange={handleChange}
                             />
                         </td>
                         <td>
                             {totalPrice}zł
                         </td>
                         <td>
                             {totalCost}zł
                         </td>
                    </tr>
                    {
                        createRemainingRows()
                    }
                </tbody>
            </Table>
        </div>
    )
};

export default RecipeInfoTable;