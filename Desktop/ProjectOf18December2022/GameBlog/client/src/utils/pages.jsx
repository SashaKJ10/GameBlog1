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
