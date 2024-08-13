import { useState } from "react";
import { Box, Input, Button, Heading, Text, Link } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading mb="6" textAlign="center">Login de Autores</Heading>
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
      <Button onClick={handleLogin} colorScheme="teal" width="full" mb={4}>
        Entrar
      </Button>
      <Text textAlign="center">Não tem uma conta? <Link color="teal.500" onClick={handleCreateUser}>Crie uma agora</Link></Text>
    </Box>
  );
}

export default Login;
