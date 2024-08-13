import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

function AdBlockerPopup() {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    // Criar um elemento div que simula um anúncio
    const adBlockTest = document.createElement('div');
    adBlockTest.innerHTML = '&nbsp;';
    adBlockTest.className = 'adsbox';
    document.body.appendChild(adBlockTest);

    // Verificar se o anúncio foi bloqueado
    setTimeout(() => {
      if (adBlockTest.offsetHeight === 0) {
        setIsAdBlocked(true);
      }
      adBlockTest.remove();
    }, 100);
  }, []);

  if (!isAdBlocked) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Box bg="white" p={5} borderRadius="md" textAlign="center">
        <Text fontSize="xl" mb={4}>Detectamos que você está usando um bloqueador de anúncios.</Text>
        <Text mb={4}>Por favor, considere desativá-lo para continuar usando nosso site e apoiar o conteúdo gratuito.</Text>
        <Button onClick={() => setIsAdBlocked(false)} colorScheme="teal">
          Continuar sem desativar
        </Button>
      </Box>
    </Box>
  );
}

export default AdBlockerPopup;
