import React, { useState, useEffect } from "react";
import { Box, Button, Input, Select } from "@chakra-ui/react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../authContext";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";
import { categories } from "../categories"; // Importando as categorias

function EditArticle() {
  const { id } = useParams(); // Obtém o ID do artigo da URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const docRef = doc(db, "blog-admin-artigos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const articleData = docSnap.data();
          setTitle(articleData.title);
          setContent(articleData.content);
          setCategory(articleData.category);
        } else {
          toast.error("Artigo não encontrado.");
        }
      } catch (e) {
        toast.error("Erro ao carregar artigo.");
      }
    };

    loadArticle();
  }, [id]);

  const handleUpdateArticle = async () => {
    try {
      const docRef = doc(db, "blog-admin-artigos", id);
      await updateDoc(docRef, {
        title,
        content,
        category,
        updatedAt: new Date()
      });
      toast.success("Artigo atualizado com sucesso!");
    } catch (e) {
      toast.error("Erro ao atualizar artigo. Tente novamente.");
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
        modules={EditArticle.modules}
        formats={EditArticle.formats}
        theme="snow"
      />

      <Button onClick={handleUpdateArticle} mt={4} colorScheme="teal">
        Salvar Alterações
      </Button>
    </Box>
  );
}

// Configurações do ReactQuill
EditArticle.modules = {
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

EditArticle.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

export default EditArticle;
