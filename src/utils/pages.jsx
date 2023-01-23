export const getPageCount = (totalPages, limit) => {
  return Math.ceil(totalPages / limit);
};
export const getPagesArray = (pagesCount) => {
  let result = [];
  for (let i = 0; i < pagesCount; i++) {
    result.push(i + 1);
  }
  return result;
};
export const getResult = (curPageIndex, n2, dmax, pagesArray, dmin, result  ) => {
  if (curPageIndex < n2) {
    dmax += Math.floor(n2 - curPageIndex);
  }
  if (curPageIndex >= pagesArray.length - n2) {
    dmin += Math.floor(n2 - (pagesArray.length - curPageIndex - 1));
  }
  
    for (let i = 0; i < pagesArray.length; i++) {
      if (i + dmin >= curPageIndex && i - dmax <= curPageIndex) {
        result.push(pagesArray[i]);
      }
    }
  
}
