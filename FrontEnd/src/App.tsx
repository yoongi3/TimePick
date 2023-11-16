import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import './App.css'
import { MatrixProvider } from "./components/Providers/MatrixProvider";
import { UserProvider } from "./components/Providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <MatrixProvider>
        <Router>
          <Routes>
            <Route path="/event/:id" element={<EventPage/>}/>

            <Route path="/" element={<HomePage/>}/>
          </Routes>
        </Router>
      </MatrixProvider>
    </UserProvider>
    
  )
}

export default App
