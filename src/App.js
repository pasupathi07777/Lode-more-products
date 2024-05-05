
import './App.css';
import Additem from './components/Additem';

function App() {
  let 
  URL='https://dummyjson.com/products'
  return (
    <div className="App w-[100vw] h-[100vh]  flex overflow-x-hidden overflow-y-auto  bg-black sm:Apps ">
      <Additem URL={URL}/>
      
    </div>
  );
}

export default App;
