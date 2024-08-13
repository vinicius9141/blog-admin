
# Meu Blog

Um blog moderno desenvolvido com React, Firebase e Chakra UI. Este projeto permite a criação e gerenciamento de artigos, com suporte para autenticação de usuários, gerenciamento de usuários, anúncios com Google AdSense, e muito mais.

## Funcionalidades

- **Autenticação de Usuários**: Suporte para login e logout.
- **Painel Admin**: Autores podem acessar um painel de administração para gerenciar artigos.
- **Dashboard do Autor**: Cada autor pode ver e gerenciar seus próprios artigos.
- **Gerenciamento de Usuários**: Administradores podem gerenciar permissões e papéis de usuários.
- **Artigos Relacionados**: Exibição de artigos relacionados com base na categoria.
- **Menu Responsivo**: Menu hambúrguer para navegação em dispositivos móveis.
- **Suporte ao Google AdSense**: Integração com anúncios do Google AdSense.
- **Editor de Artigos**: Suporte para formatação de texto rica e inserção de imagens.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Chakra UI**: Biblioteca de componentes para React.
- **Firebase**: Backend como serviço (BaaS) para autenticação, banco de dados e hospedagem.
- **Vite**: Ferramenta de build e desenvolvimento rápido para projetos React.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js e npm instalados em sua máquina.
- Conta no Firebase para configurar o backend.
- Conta no Google AdSense para configurar os anúncios.

### Passos para Configuração

1. Clone o repositório:

   \`\`\`bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   \`\`\`

2. Instale as dependências:

   \`\`\`bash
   npm install
   \`\`\`

3. Crie um arquivo `.env.local` na raiz do projeto e adicione as configurações do Firebase:

   \`\`\`bash
   VITE_API_KEY=your-api-key
   VITE_AUTH_DOMAIN=your-auth-domain
   VITE_PROJECT_ID=your-project-id
   VITE_STORAGE_BUCKET=your-storage-bucket
   VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_APP_ID=your-app-id
   \`\`\`

4. Inicie o servidor de desenvolvimento:

   \`\`\`bash
   npm run dev
   \`\`\`

5. Acesse o projeto no navegador:

   \`\`\`bash
   http://localhost:5173
   \`\`\`

## Como Usar

### Criando Artigos

1. Faça login como autor.
2. Acesse o painel admin.
3. Crie e edite artigos utilizando o editor rich-text.
4. Defina a visibilidade e publique o artigo.

### Gerenciando Usuários

1. Acesse a seção de gerenciamento de usuários.
2. Altere permissões e papéis de usuários.

### Exibindo Artigos Relacionados

- Os artigos relacionados com base na categoria são automaticamente exibidos na seção "Leia também" na página de um artigo.

### Integração com AdSense

- O Google AdSense está integrado e pronto para exibir anúncios nas páginas de artigos.

## Deploy

Para fazer o deploy do projeto em um ambiente de produção, você pode seguir os passos abaixo:

1. Crie um build de produção:

   \`\`\`bash
   npm run build
   \`\`\`

2. Hospede os arquivos gerados na pasta \`dist\` no serviço de hospedagem de sua preferência (Firebase Hosting, Netlify, Vercel, etc.).

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Faça um fork do repositório, crie uma nova branch para sua funcionalidade ou correção, e envie um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
