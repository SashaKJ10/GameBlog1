import Routing from './components/Routing';
function App() {
  // TODO: Task 3 - move games to localStorage and get its value from localStorage on related pages ✔
  // TODO: Task 5 - Routing component shouldn't have props ✔
  return (
    <div className="flex flex-col top-3.7 absolute w-full">
      <Routing />
    </div>
  );
}

export default App;
