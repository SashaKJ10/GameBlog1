const array = [1, 2, 3, 4, 55, 56, 32, 22, 45, 66];
function getData(data) {
  return data.filter((item) => item < 55);
}
console.log(getData(array));