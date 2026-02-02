# 🚀 Fullstack React + Django App

Aplicação fullstack desenvolvida com React no frontend e Django REST Framework no backend, com deploy completo no Render.
O projeto permite criar, editar e gerenciar projetos e seus serviços, respeitando regras de orçamento.

- 🔗 Frontend: https://frontend-react-8b3g.onrender.com

- 🔗 Backend API: https://backend-django-630j.onrender.com/api/

## 🧩 Tecnologias Utilizadas
## 🔹 Frontend

- React

- React Router (HashRouter)

- Axios

- Vite

- CSS Modules

## 🔹 Backend

- Python

- Django

- Django REST Framework

- django-cors-headers

- SQLite (desenvolvimento)

- Gunicorn (produção)

## 🔹 Deploy

### Render (Static Site + Web Service)

 Variáveis de ambiente para segurança

#### 📌 Funcionalidades

✅ Criar projetos com orçamento

✅ Listar projetos

✅ Editar dados do projeto

✅ Remover projetos

✅ Adicionar serviços a um projeto

✅ Remover serviços

✅ Cálculo automático do custo total

✅ Validação de orçamento (não ultrapassa o limite)

✅ Integração frontend ↔ backend via API REST

🖥️ Preview da Aplicação

#### Rotas principais (frontend):

- / → Home

- /#/projects → Lista de projetos

- /#/newproject → Criar projeto

- /#/editproject/:id → Editar projeto

⚠️ O uso de HashRouter é necessário devido às limitações de SPA routing em Static Sites do Render.

⚙️ Como Rodar o Projeto Localmente
## 🔹 Backend (Django)
##  clone o repositório
git clone https://github.com/ronesanttos/fullstack-react-django-app.git
cd fullstack-react-django-app/backend

## crie o ambiente virtual
- python -m venv venv
- source venv/bin/activate  # Windows: venv\Scripts\activate

-  instale as dependências
- pip install -r requirements.txt

- configure as variáveis de ambiente
- cp .env.example .env

 - rode as migrações
- python manage.py migrate

 - inicie o servidor
- python manage.py runserver

## 🔹 Frontend (React)
- cd frontend
- instale as dependências
- npm install

-  configure a API
- .env
- VITE_API_URL=http://localhost:8000/api

- rode o projeto
- npm run dev

###🔐 Variáveis de Ambiente
## Backend
- SECRET_KEY=your_secret_key
- DEBUG=False
- ALLOWED_HOSTS=backend-django-630j.onrender.com
- CORS_ALLOWED_ORIGINS=https://frontend-react-8b3g.onrender.com
- CSRF_TRUSTED_ORIGINS=https://frontend-react-8b3g.onrender.com

### Frontend
- VITE_API_URL=https://backend-django-630j.onrender.com/api

### 🧠 Arquitetura

- O frontend consome a API REST via Axios

- O backend valida regras de negócio (orçamento, serviços)

- Serviços são gerenciados separadamente dos projetos

- Atualizações de projeto não removem serviços automaticamente

- Deploy desacoplado (frontend e backend independentes)

🛠️ Possíveis Melhorias Futuras

🔐 Autenticação de usuários

📊 Dashboard com gráficos

🐘 PostgreSQL em produção

🧪 Testes automatizados

🎨 Melhorias de UI/UX

### 👨‍💻 Autor

- Rone Santos
- Desenvolvedor Fullstack
- GitHub: @ronesanttos
