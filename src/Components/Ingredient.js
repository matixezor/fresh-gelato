import React from 'react';

import "../css/Ingredient.css";


const Ingredient = ({row, name, amount, price, cost}) => {

    return(
    <tr>
        <th scope="row">
            {row}
        </th>
        <td>
            {name}
        </td>
        <td>
            {amount + 'g'}
        </td>
        <td>
            {price + 'zl'}
        </td>
        <td>
            {cost + 'zl'}
        </td>
    </tr>
    )
};

export default Ingredient;