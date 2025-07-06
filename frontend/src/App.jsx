import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Home from './pages/Home.jsx'
import AuthForm from "./containers/Form.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {

  return (
    <Router>\
        <div className="min-h-screen flex flex-col items-center">
            <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signup' element={<AuthForm isSignUp={true}/>} />
                <Route path='/signin' element={<AuthForm isSignUp={false}/>} />
                {/*<Route path='*' element={<ErrorPage/>} />*/}
            </Routes>
            <Footer/>
        </div>
    </Router>
  )
}

export default App