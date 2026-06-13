import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import PostDetails from './PostDetails/PostDetails.jsx'
import ErrorPage from './ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Your main page with all the post cards
    errorElement: <ErrorPage />
  },
  {
    path: "/posts/:id", // The ":" makes "id" a dynamic variable
    element: <PostDetails />,
    errorElement: <ErrorPage />
  }, 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
