import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import AdminPanel from "./components/AdminPanel";
import AuthorDashboard from "./components/AuthorDashboard";
import EditArticle from "./components/EditArticle";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import UserManagement from "./components/UserManagement";
import CreateUser from "./components/CreateUser"; // Importando o componente CreateUser
import UserList from "./components/UserList";
import { AuthProvider } from "./authContext";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <NavBar />
          <Box p={4}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-user" element={<CreateUser />} /> {/* Rota para criar usuário */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <AuthorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-management"
                element={
                  <PrivateRoute>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-list"
                element={
                  <PrivateRoute>
                    <UserList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <EditArticle />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
