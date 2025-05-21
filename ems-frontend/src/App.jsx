// App.jsx
import FooterComponent from './assets/components/FooterComponent';
import HeadComponent from './assets/components/HeadComponent';
import ListEmployeeComponent from './assets/components/ListEmployeeComponent';
import EmployeeComponent from './assets/components/EmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeadComponent />
        <Routes>
          <Route path='/' element={<ListEmployeeComponent />} />
          <Route path='/employees' element={<ListEmployeeComponent />} />
          <Route path='/add-employee' element={<EmployeeComponent />} />
          <Route path='/edit-employees/:id' element={<EmployeeComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
