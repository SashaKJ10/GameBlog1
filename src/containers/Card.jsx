function Card({ children }) {
  return (
    <div className="flex flex-row  justify-between items-center bg-green-100 rounded  py-5 px-5">
      {children}
    </div>
  );
}
export default Card;
