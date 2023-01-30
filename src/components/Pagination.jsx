import { useMemo } from 'react';
import { getPageCount } from '../utils/pages';
import { getPagesArray } from '../utils/pages';
import { BiCaretLeft } from 'react-icons/bi';
import { BiCaretRight } from 'react-icons/bi';
import { getResult } from '../utils/pages';
function Pagination({
  totalPages,
  setTotalPages,
  limit,
  page,
  setPage,
  filteredGames,
}) {
  const classes = {
    paginationButtons:
      'border-1 p-5 bg-green-300 hover:bg-green-500 w-5 h-5 flex justify-center items-center cursor-pointer',
    paginationButonClicked:
      'border-solid border-2 p-5 border-orange-300 font-bold border-1  bg-green-300 hover:bg-green-500 w-5 h-5 flex justify-center items-center cursor-pointer',
  };
  let paginatedCount = filteredGames.length;

  let pagesArray = getPagesArray(totalPages);

  const result = [];
  let curPageIndex = page - 1;
  let n1 = 5;
  let n2 = n1 / 2;
  let dmin = n2;
  let dmax = n2;
  if (curPageIndex < n2) {
    dmax += Math.floor(n2 - curPageIndex);
  }
  if (curPageIndex >= pagesArray.length - n2) {
    dmin += Math.floor(n2 - (pagesArray.length - curPageIndex - 1));
  }
  const getResult = () => {
    for (let i = 0; i < pagesArray.length; i++) {
      if (i + dmin >= curPageIndex && i - dmax <= curPageIndex) {
        result.push(pagesArray[i]);
      }
    }
  };

  useMemo(() => {
    setTotalPages(getPageCount(paginatedCount, limit));
    pagesArray = getPagesArray(totalPages);
  }, [paginatedCount]);
  console.log(pagesArray);
  const changePage = (pageInfo) => {
    setPage(pageInfo);
  };

  const moveLeft = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const moveRight = () => {
    if (page === pagesArray.length) return;
    setPage((prev) => prev + 1);
  };
  return (
    <div>
      <ul className="flex flex-row gap-2 items-center justify-center mt-5 mb-5">
        <BiCaretLeft onClick={moveLeft} className="cursor-pointer w-8 h-8" />
        {result.map((p) => (
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
        <BiCaretRight onClick={moveRight} className="cursor-pointer w-8 h-8" />
      </ul>
    </div>
  );
}

export default Pagination;
