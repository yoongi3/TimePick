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
          <Route path="/event/:id" element={<EventPage/>}/>

          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
    </MatrixProvider>
  )
}

export default App
