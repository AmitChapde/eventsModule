import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import EventList from "./pages/EventList/EventList";
import EventDetails from "./pages/EventDetails/EventDetails";
import EventFormPage from "./pages/EventFormPage/EventFormPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import "./App.css";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <header className="site-header">
          <div className="site-header-inner">
            <a
              className="site-logo"
              href="/events"
            >
              Evently
            </a>

            <nav className="site-navigation">
              <a href="/events">
                Events
              </a>
            </nav>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/events"
                replace
              />
            }
          />

          <Route
            path="/events"
            element={<EventList />}
          />

          <Route
            path="/events/create"
            element={<EventFormPage />}
          />

          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          <Route
            path="/events/:id/edit"
            element={<EventFormPage />}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;