import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import './App.css'
import { MatrixProvider } from "./components/Providers/MatrixProvider";

function App() {
  return (
    <MatrixProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/event" element={<EventPage/>}/>
        </Routes>
      </Router>
    </MatrixProvider>
  )
}

export default App
