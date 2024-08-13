import React, { useState, useEffect } from "react";
import { Box, Input, Button, Select, Text } from "@chakra-ui/react";
import { db } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, "blog-admin-artigos"), where("author", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(articlesData);
      } catch (e) {
        toast.error("Erro ao carregar artigos.");
      }
    };

    fetchArticles();
  }, [user]);

  const handleAddArticle = async () => {
    try {
      await addDoc(collection(db, "blog-admin-artigos"), {
        title,
        content,
        category,
        author: user.uid,
        createdAt: new Date(),
        visible: true,  // Artigo é visível por padrão
      });
      setTitle("");
      setContent("");
      setCategory("");
      toast.success("Artigo adicionado com sucesso!");
    } catch (e) {
      toast.error("Erro ao adicionar artigo. Tente novamente.");
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteDoc(doc(db, "blog-admin-artigos", id));
      setArticles(articles.filter(article => article.id !== id));
      toast.success("Artigo excluído com sucesso!");
    } catch (e) {
      toast.error("Erro ao excluir artigo.");
    }
  };

  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      const articleRef = doc(db, "blog-admin-artigos", id);
      await updateDoc(articleRef, { visible: !currentVisibility });
      setArticles(articles.map(article =>
        article.id === id ? { ...article, visible: !currentVisibility } : article
      ));
      toast.success(`Artigo ${currentVisibility ? 'ocultado' : 'exibido'} com sucesso!`);
    } catch (e) {
      toast.error("Erro ao alterar visibilidade do artigo.");
    }
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Título do Artigo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />
      <Select
        placeholder="Selecione a Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        mb={4}
      >
        <option value="tech">Tecnologia</option>
        <option value="health">Saúde</option>
        <option value="finance">Finanças</option>
      </Select>

      <ReactQuill
        value={content}
        onChange={setContent}
        modules={AddArticle.modules}
        formats={AddArticle.formats}
        theme="snow"
      />

      <Button onClick={handleAddArticle} mt={4} colorScheme="teal">
        Adicionar Artigo
      </Button>

      {/* Listagem de artigos com opções de excluir e alterar visibilidade */}
      <Box mt={8}>
        <Text fontSize="2xl" mb={4}>Meus Artigos</Text>
        {articles.length > 0 ? (
          articles.map(article => (
            <Box key={article.id} p={4} mb={4} borderWidth={1} borderRadius="lg" boxShadow="sm">
              <Text fontSize="xl">{article.title}</Text>
              <Text mb={2}>Categoria: {article.category}</Text>
              <Button
                onClick={() => handleToggleVisibility(article.id, article.visible)}
                colorScheme={article.visible ? "yellow" : "green"}
                mr={2}
              >
                {article.visible ? "Ocultar" : "Exibir"}
              </Button>
              <Button onClick={() => handleDeleteArticle(article.id)} colorScheme="red">
                Excluir
              </Button>
            </Box>
          ))
        ) : (
          <Text>Nenhum artigo encontrado.</Text>
        )}
      </Box>
    </Box>
  );
}

// Configurações do ReactQuill
AddArticle.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'], // Opção para adicionar links e imagens
    [{ 'color': [] }, { 'background': [] }],
    ['clean'] // Botão para remover formatação
  ],
};

AddArticle.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

export default AddArticle;
