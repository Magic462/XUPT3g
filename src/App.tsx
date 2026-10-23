import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import routes from './router';
import { AuthProvider } from './context/AuthContext';

// Data router supports blocking navigation when an annual report has unsaved edits.
const router = createBrowserRouter([
  {
    element: <AuthProvider><Outlet /></AuthProvider>,
    children: routes,
  },
]);

function App() {
  return <div className="App"><RouterProvider router={router} /></div>;
}

export default App;
