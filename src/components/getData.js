const array = [1, 2, 3, 4, 55, 56, 32, 22, 45, 66];
function getData(data) {
  return data.filter((item) => item < 55);
}
console.log(getData(array));

const user = [12, 23, 34];
console.log(
  user.map((user1) => {
    return user1 * 2;
  })
);
