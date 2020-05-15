import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import "../css/PaginationComponent.css";

const PaginationComponent = ({recipesPerPage, totalRecipes, paginate, currPage}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i);
    }


    return(
        <Pagination >
            <PaginationItem>
                <PaginationLink onClick={() => paginate(1)} first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    previous
                    onClick={
                        () => paginate(
                        currPage === 1
                            ?   1
                            :   currPage-1
                    )}
                    href="#" />
            </PaginationItem>
            {pageNumbers.map(number => (
                <PaginationItem key={number}>
                    <PaginationLink onClick={() => paginate(number)} href="#">
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationLink
                    next
                    onClick={
                        () => paginate(
                        currPage === pageNumbers.length
                            ?   pageNumbers.length
                            :   currPage + 1
                    )}
                    href="#"
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={() => paginate(pageNumbers.length)} last href="#" />
            </PaginationItem>
        </Pagination>
    )
};

export default PaginationComponent;