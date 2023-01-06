function Paganation() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <ul className="flex flex-row gap-2 items-center justify-center mt-5">
        {numbers.map((number) => (
          <li className="border-1 bg-green-100 w-5 h-5 flex justify-center items-center">
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paganation;
