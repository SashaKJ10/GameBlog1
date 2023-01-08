import { useState, useEffect } from 'react';
import { getPageCount } from '../utils/pages';
import { getPagesArray } from '../utils/pages';
import { BiCaretLeft } from 'react-icons/bi';
import { BiCaretRight } from 'react-icons/bi';

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
      'border-1 p-5 bg-green-300 hover:bg-green-500 w-5 h-5 flex justify-center items-center cursor-pointer',
    paginationButonClicked:
      'border-solid border-2 p-5 border-orange-300 font-bold border-1  bg-green-300 hover:bg-green-500 w-5 h-5 flex justify-center items-center cursor-pointer',
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

  const moveLeft = () => {
    if (page !== 1) {
      setPage(page--);
    }
  };

  const moveRight = () => {
    if (page !== totalCount.length) {
      setPage(page++);
    }
  };
  return (
    <div>
      <ul className="flex flex-row gap-2 items-center justify-center mt-5 mb-5">
        <BiCaretLeft onClick={moveRight} className="cursor-pointer w-8 h-8" />
        {pagesArray.map((p) => (
          <div>
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
          </div>
        ))}
        <BiCaretRight onClick={moveLeft} className="cursor-pointer w-8 h-8" />
      </ul>
    </div>
  );
}

export default Pagination;
