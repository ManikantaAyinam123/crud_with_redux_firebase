import { Provider } from 'react-redux';
import './App.css';
import Student from './components/Student';
import Store from './redux/Store';


function App() {
  return (
    <Provider store={Store}>
     
     <Student />
  
    </Provider>
  );
}

export default App;
