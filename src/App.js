import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Explore from './pages/Explore';
import { PrivateRoute } from './components/PrivateRoute';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import Category from './pages/Category';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import CreateListing from './pages/CreateListing';
import EditListing from './components/EditListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/>
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}/>
          </Route>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/edit-listing/:listingId' element={<EditListing />}/>
          <Route path='/category/:categoryName/:listingId' element={<Listing />}/>
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
        <Footer />
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
