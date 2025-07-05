import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import AuthForm from "./containers/Form.jsx";
import { getAuth } from 'firebase/auth';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='/signup' element={<AuthForm isSignUp={true}/>} />
        <Route path='/signin' element={<AuthForm isSignUp={false}/>} />
        {/*<Route path='*' element={<ErrorPage/>} />*/}
      </Routes>
    </Router>
  )
}

export default App