import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import IsAnon from "./components/IsAnon";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import StadiumsListPage from "./pages/StadiumsListPage";
import IsPrivate from "./components/IsPrivate";
import StadiumDetailPage from "./pages/StadiumDetailPage";
import HuntDetailsPage from "./pages/HuntDetailsPage";
import TopHuntersPage from "./pages/TopHuntersPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path="/stadiums"
          element={
            <IsPrivate>
              <StadiumsListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/stadiums/:stadiumId"
          element={
            <IsPrivate>
              <StadiumDetailPage />
            </IsPrivate>
          }
        />
        <Route
          path="/myHunt"
          element={
            <IsPrivate>
              <HuntDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/topHunters"
          element={
            <IsPrivate>
              <TopHuntersPage />
            </IsPrivate>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
