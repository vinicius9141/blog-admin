import React, { useState } from "react";
import { Box, Button, Input, Select } from "@chakra-ui/react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../authContext";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { categories } from "../categories";  // Importando as categorias

function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useAuth();

  const handleAddArticle = async () => {
    try {
      await addDoc(collection(db, "blog-admin-artigos"), {
        title,
        content,
        category,
        author: user.uid,
        createdAt: new Date(),
        visible: true,
      });
      setTitle("");
      setContent("");
      setCategory("");
      toast.success("Artigo adicionado com sucesso!");
    } catch (e) {
      toast.error("Erro ao adicionar artigo. Tente novamente.");
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
        {categories.map(cat => (
          <option key={cat.slug} value={cat.slug}>{cat.name}</option>
        ))}
      </Select>

      <ReactQuill
        value={content}
        onChange={setContent}
        modules={ArticleEditor.modules}
        formats={ArticleEditor.formats}
        theme="snow"
      />

      <Button onClick={handleAddArticle} mt={4} colorScheme="teal">
        Adicionar Artigo
      </Button>
    </Box>
  );
}

// Configurações do ReactQuill
ArticleEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ],
};

ArticleEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

export default ArticleEditor;
