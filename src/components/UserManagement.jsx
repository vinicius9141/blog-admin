import { useEffect, useState } from "react";
import { Box, Text, Heading, Button, Stack } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));  // Supondo que os usuários estão armazenados em "users"
      const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleMakeAuthor = async (userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, { role: "author" });
      toast.success("Usuário agora é um autor.");
      setUsers(users.map(user => user.id === userId ? { ...user, role: "author" } : user));
    } catch (error) {
      toast.error("Erro ao atualizar o papel do usuário.");
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Gerenciamento de Usuários</Heading>
      <Stack spacing={4}>
        {users.map((user) => (
          <Box key={user.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Text>Email: {user.email}</Text>
            <Text>Role: {user.role}</Text>
            {user.role !== "author" && (
              <Button mt={4} onClick={() => handleMakeAuthor(user.id)} colorScheme="teal">
                Transformar em Autor
              </Button>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default UserManagement;
