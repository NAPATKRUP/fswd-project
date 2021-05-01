import React from 'react';
import './Pagination.css';

const ReactPagination = (props: any) => {
  const {
    theme = 'default',
    totalSize = 10,
    sizePerPage = 10,
    currentPage = 1,
    showFirstLastPages = false,
    firstPageText = '«',
    lastPageText = '»',
    previousPageText = '⟨',
    nextPageText = '⟩',
    numberOfPagesNextToActivePage = 1,
  } = props;
  let pageNum = Math.ceil(totalSize / sizePerPage);

  return (
    <div className={`react-pagination-js-${theme}`}>
      <ul>
        {showFirstLastPages ? (
          <Page
            {...props}
            className={currentPage === 1 ? 'page disabled' : 'page'}
            label={firstPageText}
            pageNum={1}
          />
        ) : null}
        <Page
          {...props}
          className={currentPage === 1 ? 'page disabled' : 'page'}
          label={previousPageText}
          pageNum={currentPage - 1}
        />
        <Pagination
          {...props}
          pageNum={pageNum}
          numberOfPagesNextToActivePage={numberOfPagesNextToActivePage}
        />
        <Page
          {...props}
          className={currentPage === pageNum ? 'page disabled' : 'page'}
          label={nextPageText}
          pageNum={currentPage + 1}
        />
        {showFirstLastPages ? (
          <Page
            {...props}
            className={currentPage === pageNum ? 'page disabled' : 'page'}
            label={lastPageText}
            pageNum={pageNum}
          />
        ) : null}
      </ul>
    </div>
  );
};

export default ReactPagination;

const Pagination = (props: any) => {
  var { currentPage, numberOfPagesNextToActivePage, pageNum } = props;
  let current = currentPage,
    last = pageNum,
    delta = numberOfPagesNextToActivePage,
    left = current - delta,
    right = current + delta + 1,
    range = [] as any,
    rangeWithEllipsis = [] as any,
    l = undefined,
    isEllipsisIncludes = false;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l && i - l !== 1) {
      rangeWithEllipsis.push(
        <li key={isEllipsisIncludes ? -1 : 0} className="pageElli">
          <a> . . .</a>
        </li>
      );
      isEllipsisIncludes = true;
    }
    rangeWithEllipsis.push(
      <li
        key={i}
        className={currentPage === i ? 'is-active' : 'page'}
        onClick={(e) => {
          e.preventDefault();
          props.changeCurrentPage(i);
        }}
      >
        <a>{i}</a>
      </li>
    );
    l = i;
  }
  return <>{rangeWithEllipsis}</>;
};

const Page = (props: any) => {
  const { className, label, pageNum } = props;
  return (
    <li className={className} onClick={() => props.changeCurrentPage(pageNum)}>
      <a>{label}</a>
    </li>
  );
};
