import { useState, useEffect } from 'react';
import { getPageCount } from '../utils/pages';
import { getPagesArray } from '../utils/pages';

function Pagination({
  totalPages,
  setTotalPages,
  limit,
  setLimit,
  page,
  setPage,
}) {
  const classes = {
    paginationButtons:
      'border-1 p-10 bg-green-300 hover:bg-green-500 w-5 h-5 flex justify-center items-center cursor-pointer',
    paginationButonClicked:
      'border-solid border-2 border-orange-300 font-bold border-1 p-10 bg-green-300 hover:bg-green-500 w-5 h-5 flex justify-center items-center cursor-pointer',
  };

  const totalCount = JSON.parse(localStorage.getItem('items')).length;
  useEffect(() => {
    console.log(`The pagination components total count is ${totalCount}`);
    setTotalPages(getPageCount(totalCount, limit));
    console.log(`The amount of pages is ${totalPages}`);
  }, [page]);
  let pagesArray = getPagesArray(totalPages);
  console.log(pagesArray);
  const changePage = (pageInfo) => {
    setPage(pageInfo);
  };
  return (
    <div>
      <ul className="flex flex-row gap-2 items-center justify-center mt-5">
        {pagesArray.map((p) => (
          <li
            onClick={() => changePage(p)}
            key={p}
            className={
              page === p
                ? classes.paginationButonClicked
                : classes.paginationButtons
            }
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
