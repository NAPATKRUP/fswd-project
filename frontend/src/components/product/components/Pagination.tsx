import React from "react";
import { ButtonBase } from "@material-ui/core";

const Pagination = (props: any) => {
  const { productPerPage, totalPage, paginate } = props;

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPage / productPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      {pageNumber.map((number) => (
        <ButtonBase
          className="page-link"
          onClick={() => paginate(number)}
          style={{ marginLeft: 20, borderWidth: 1, borderColor: "black" }}
        >
          {number}
        </ButtonBase>
      ))}
    </nav>
  );
};

export default Pagination;
