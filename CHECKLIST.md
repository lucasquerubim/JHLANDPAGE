# ✅ CHECKLIST: Colocar o site no ar

Use este checklist para garantir que tudo está configurado corretamente.

---

## 📦 ANTES DE SUBIR NO GIT

### 1. Testar localmente

- [ ] Abri a pasta `anuario-jh` no VS Code
- [ ] Instalei a extensão **Live Server**
- [ ] Testei o site rodando (`index.html` → botão direito → Open with Live Server)
- [ ] O site abre em `http://127.0.0.1:5500` e está funcionando

---

## ⚙️ CONFIGURAR O BACKEND

### 2. Google Sheets (planilha de leads)

- [ ] Criei uma planilha no Google Sheets
- [ ] Copiei o **ID da planilha** da URL
- [ ] Guardei o ID em algum lugar (vou usar no passo 4)

---

### 3. Google Drive (PDF do anuário)

- [ ] Fiz upload do `anuariojh.pdf` no Google Drive
- [ ] Copiei o **ID do PDF** da URL
- [ ] Guardei o ID em algum lugar (vou usar no passo 4)

---

### 4. Google Apps Script

- [ ] Acessei [script.google.com](https://script.google.com)
- [ ] Criei um **Novo projeto**
- [ ] Copiei **TODO** o código de `google-apps-script.gs` e colei lá
- [ ] Editei as 3 configurações no topo:
  - [ ] `PLANILHA_ID`
  - [ ] `PDF_ANUARIO_ID`
  - [ ] *(os outros campos já estão OK)*
- [ ] Salvei o projeto (`Ctrl+S`)
- [ ] Executei a função **`testarFluxo`** no menu suspenso + **Executar**
- [ ] Dei permissão quando o Google pediu
- [ ] Recebi o e-mail de teste com o PDF anexado ✅
- [ ] Vi uma linha de teste na planilha ✅

---

### 5. Publicar o Apps Script

- [ ] Cliquei em **Implantar** → **Nova implantação**
- [ ] Escolhi **App da Web**
- [ ] Configurei:
  - Executar como: **Eu**
  - Quem tem acesso: **Qualquer pessoa**
- [ ] Cliquei em **Implantar**
- [ ] **Copiei a URL do app da Web** (ex: `https://script.google.com/macros/s/...`)

---

### 6. Conectar o formulário ao Apps Script

- [ ] Abri `script.js` no VS Code
- [ ] Substitui `'COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT'` pela URL que copiei
- [ ] Salvei (`Ctrl+S`)

---

### 7. Trocar o vídeo do YouTube (opcional)

- [ ] Abri `index.html`
- [ ] Busquei por `dQw4w9WgXcQ` (vídeo placeholder)
- [ ] Substituí pelo ID do meu vídeo real
- [ ] Salvei

---

## 🚀 SUBIR NO GITHUB

### 8. Preparar o Git

- [ ] Tenho o Git instalado (testei `git --version` no Terminal)
- [ ] Tenho uma conta no GitHub
- [ ] Já configurei meu nome e e-mail no Git:
  ```bash
  git config --global user.name "Meu Nome"
  git config --global user.email "meu@email.com"
  ```

---

### 9. Inicializar o repositório

- [ ] Naveguei até a pasta do projeto no Terminal:
  ```bash
  cd caminho/para/anuario-jh
  ```
- [ ] Rodei:
  ```bash
  git init
  git add .
  git commit -m "feat: landing page Anuário JH 2026"
  ```

---

### 10. Criar repositório no GitHub

- [ ] Acessei [github.com/new](https://github.com/new)
- [ ] Criei um repositório **público** chamado `anuario-jh-2026`
- [ ] **NÃO** marquei "Initialize with README"
- [ ] Copiei a URL do repositório (ex: `https://github.com/meuusuario/anuario-jh-2026.git`)

---

### 11. Conectar e enviar

- [ ] Rodei (substituindo `SEU_USUARIO`):
  ```bash
  git branch -M main
  git remote add origin https://github.com/SEU_USUARIO/anuario-jh-2026.git
  git push -u origin main
  ```
- [ ] Usei meu **Personal Access Token** como senha (não a senha normal)

---

## 🌐 ATIVAR O GITHUB PAGES

### 12. Publicar o site

- [ ] No GitHub, fui em **Settings** → **Pages**
- [ ] Configurei:
  - Source: **Deploy from a branch**
  - Branch: **main**
  - Folder: **/ (root)**
- [ ] Cliquei em **Save**
- [ ] Aguardei ~2 minutos
- [ ] Acessei `https://SEU_USUARIO.github.io/anuario-jh-2026/`
- [ ] **O site está no ar! 🎉**

---

## 🧪 TESTAR TUDO

### 13. Validação final

- [ ] O site carrega normalmente
- [ ] A logo JH aparece (topbar, hero, footer)
- [ ] Os textos estão corretos (11 eixos, citações, etc.)
- [ ] O vídeo do YouTube roda (ou está com ID correto para trocar depois)
- [ ] Testei preencher o formulário com um e-mail de teste
- [ ] Recebi o e-mail com o PDF do anuário anexado ✅
- [ ] A planilha salvou o lead ✅
- [ ] O site é responsivo no celular (testei redimensionando a janela)

---

## 🎯 TUDO PRONTO!

Se todos os itens acima estão marcados, seu site está:

✅ Rodando no GitHub Pages  
✅ Capturando leads na planilha  
✅ Enviando o anuário em PDF por e-mail automaticamente  
✅ Responsivo e profissional  

**Link do site:** `https://SEU_USUARIO.github.io/anuario-jh-2026/`

---

## 🔄 Próximos passos

- **Atualizar conteúdo?** Edite os arquivos → `git add . && git commit -m "descrição" && git push`
- **Novo PDF do anuário?** Suba no Drive → copie o novo ID → atualize `PDF_ANUARIO_ID` no Apps Script
- **Domínio próprio?** Veja a seção "BÔNUS: Usar domínio próprio" no `GUIA-GIT-GITHUB.md`

---

**Criado para o projeto Anuário JH 2026** ✨
