import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Header from './components/headers';
import Login from './pages/auth/containers';
import Detail from './pages/jobDetail/containers';
import Dashboard from './pages/jobList/containers';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
