import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path = "/single" element={<Single />} />
        {/* Add more nested routes as needed */}
      </Route>
    </Routes>
  </Router>
    </>
  );
};
export default App;
