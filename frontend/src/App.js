import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import LoanRequest from './Components/LoanRequest';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/request-loan" element={<LoanRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
