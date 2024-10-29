import SignUp from 'components/pages/signUp';
import './App.css';
import LogIn from 'components/pages/logIn';
import Home from 'components/pages/home';
import Appointment from 'components/pages/appointment';
import NotFound from 'components/pages/404';
import { Route, Routes } from 'react-router-dom';
import Navigation from 'components/navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />

        <Route path="/home" element={<Home />}>
          <Route path="appointment" element={<Appointment />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
