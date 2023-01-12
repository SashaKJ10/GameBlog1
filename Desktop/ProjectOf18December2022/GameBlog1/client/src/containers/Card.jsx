function Card({ children }) {
  return (
    <div className="flex flex-col  justify-between items-center  rounded shadow  py-5 px-5">
      {children}
    </div>
  );
}
export default Card;
