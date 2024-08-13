import { useEffect, useState } from "react";
import { Box, Text, Heading, Button, Stack, Select } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
      toast.success("Tipo de usuário atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o tipo de usuário.");
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Lista de Usuários</Heading>
      <Stack spacing={4}>
        {users.map((user) => (
          <Box key={user.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Text>Email: {user.email}</Text>
            <Text>Tipo: {user.role}</Text>
            <Select
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
              mt={4}
            >
              <option value="author">Autor</option>
              <option value="client">Cliente</option>
            </Select>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default UserList;
