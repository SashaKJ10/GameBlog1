function Card({ children }) {
  return (
    <div className="flex py-2 px-2 justify-center items-center flex-col">
      {children}
    </div>
  );
}
export default Card;
