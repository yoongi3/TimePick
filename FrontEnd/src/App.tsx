import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import './App.css'
import { UserProvider } from "./components/Providers/UserProvider";
import { GridProvider } from "./components/Providers/GridProvider";

function App() {
  return (
    <UserProvider>
      <GridProvider>
        <Router>
          <Routes>
            <Route path="/event/:id" element={<EventPage/>}/>

            <Route path="/" element={<HomePage/>}/>
          </Routes>
        </Router>
      </GridProvider>
    </UserProvider>
    
  )
}

export default App
