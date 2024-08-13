import { Link } from "react-router-dom";
import {
  Box, Flex, Button, Heading, Spacer, IconButton, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import { useAuth } from "../authContext";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { HamburgerIcon } from "@chakra-ui/icons";

function NavBar() {
  const { user } = useAuth();
  const auth = getAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Logout successful
    }).catch((error) => {
      console.error("Erro ao sair", error);
    });
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          Meu Blog
        </Heading>
        <Spacer />
        <Flex display={{ base: "none", md: "flex" }}>
          <Button as={Link} to="/" colorScheme="teal" variant="ghost">
            Blog
          </Button>
          {user && role === "author" && (
            <>
              <Button as={Link} to="/admin" colorScheme="teal" variant="ghost">
                Painel Admin
              </Button>
              <Button as={Link} to="/dashboard" colorScheme="teal" variant="ghost">
                Meu Dashboard
              </Button>
              <Button as={Link} to="/user-management" colorScheme="teal" variant="ghost">
                Gerenciar Usuários
              </Button>
              <Button as={Link} to="/user-list" colorScheme="teal" variant="ghost">
                Lista de Usuários
              </Button>
            </>
          )}
          {user ? (
            <Button onClick={handleLogout} colorScheme="teal" variant="ghost">
              Sair
            </Button>
          ) : (
            <Button as={Link} to="/login" colorScheme="teal" variant="ghost">
              Login
            </Button>
          )}
        </Flex>

        {/* Menu Hambúrguer para Mobile */}
        <Box display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              color="white"
              _hover={{ bg: "teal.600" }}
            />
            <MenuList>
              <MenuItem as={Link} to="/">
                Blog
              </MenuItem>
              {user && role === "author" && (
                <>
                  <MenuItem as={Link} to="/admin">
                    Painel Admin
                  </MenuItem>
                  <MenuItem as={Link} to="/dashboard">
                    Meu Dashboard
                  </MenuItem>
                  <MenuItem as={Link} to="/user-management">
                    Gerenciar Usuários
                  </MenuItem>
                  <MenuItem as={Link} to="/user-list">
                    Lista de Usuários
                  </MenuItem>
                </>
              )}
              {user ? (
                <MenuItem onClick={handleLogout}>
                  Sair
                </MenuItem>
              ) : (
                <MenuItem as={Link} to="/login">
                  Login
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavBar;
