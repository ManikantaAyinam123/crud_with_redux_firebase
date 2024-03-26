import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import Student from './components/Student';
import Store from './redux/Store';
function App() {
  return (
    <Provider store={Store}>
    <div className="App">
     <Student />
    </div>
    </Provider>
  );
}

export default App;
