import { useState } from "react";
import { Box, Input, Button, Heading } from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Definindo o papel como 'author'

  const handleCreateUser = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Adicionando o papel do usuário no Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,  // Papel do usuário
      });

      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar usuário: " + error.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading mb="6" textAlign="center">Criar Usuário</Heading>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={4}
      />
      <Button onClick={handleCreateUser} colorScheme="teal" width="full">
        Criar Usuário
      </Button>
    </Box>
  );
}

export default CreateUser;
