import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Events from "../pages/Events";
import CreateEvent from "../pages/CreateEvent";
import CreatedEvents from "../pages/CreatedEvents";
import PrivateRoute from "./PrivateRoute";
import SingleEvent from "../pages/SingleEvent";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        }
      />
      <Route
        path="/createevent"
        element={
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/createdevents"
        element={
          <PrivateRoute>
            <CreatedEvents />
          </PrivateRoute>
        }
      />
      <Route
        path="/events/:id"
        element={
          <PrivateRoute>
            <SingleEvent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
