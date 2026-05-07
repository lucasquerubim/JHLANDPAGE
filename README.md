# Anuário JH 2026 — Landing Page

Site oficial do Anuário JH 2026 com captura de leads e envio automático do PDF do anuário por e-mail.

---

## 📁 Estrutura

```
anuario-jh/
├── index.html               # Página principal
├── styles.css               # Estilos
├── script.js                # Lógica do formulário
├── google-apps-script.gs    # Backend (vai pro Google Apps Script)
├── assets/
│   └── logo-jh.png          # Logo da JH
└── README.md                # Este arquivo
```

---

## 🚀 Como rodar localmente (VS Code)

1. Abra a pasta `anuario-jh` no VS Code (File → Open Folder)
2. Instale a extensão **Live Server** (autor: Ritwick Dey)
3. Clique com o botão direito no `index.html` → **Open with Live Server**
4. O site abre em `http://127.0.0.1:5500`

---

## ⚙️ Configuração do backend (Google Apps Script)

Esta etapa configura: **planilha de leads** + **envio automático do PDF do anuário por e-mail**.

### Passo 1 — Criar a planilha

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma planilha nova
2. Renomeie para algo como **"Anuário JH 2026 — Leads"**
3. Copie o **ID da planilha** da URL:
   ```
   https://docs.google.com/spreadsheets/d/AQUI_FICA_O_ID/edit
   ```

### Passo 2 — Subir o PDF do anuário no Google Drive

1. Faça upload do arquivo **`anuariojh.pdf`** no [Google Drive](https://drive.google.com)
2. Clique com o botão direito no arquivo → **Compartilhar** → **Copiar link**
3. O link será algo como:
   ```
   https://drive.google.com/file/d/AQUI_FICA_O_ID_DO_PDF/view
   ```
4. Copie e guarde o **ID do PDF**

> 💡 Não precisa configurar permissões públicas para o PDF — o Apps Script roda com sua conta e tem acesso total.

### Passo 3 — Criar o Google Apps Script

1. Acesse [script.google.com](https://script.google.com) → **Novo projeto**
2. Apague o código padrão e cole **todo o conteúdo** do arquivo `google-apps-script.gs`
3. Renomeie o projeto para **"Anuário JH — Backend"**
4. **Edite as configurações no topo do arquivo:**
   ```javascript
   const CONFIG = {
     PLANILHA_ID:     'cole_aqui_o_id_da_planilha',
     ABA_NOME:        'Leads',
     PDF_ANUARIO_ID:  'cole_aqui_o_id_do_pdf_no_drive',
     // ...
   };
   ```
5. Salve (`Ctrl+S` / `Cmd+S`)

### Passo 4 — Testar

1. No menu superior do Apps Script, selecione a função **`testarFluxo`** e clique em **Executar**
2. O Google vai pedir autorização — clique em:
   - **Revisar permissões**
   - Escolha sua conta
   - **Avançado** → **Acessar Anuário JH (não seguro)** → **Permitir**

   > ⚠️ A mensagem "não seguro" aparece porque o app é só seu — pode ignorar, é normal para projetos pessoais do Apps Script.

3. Verifique:
   - ✅ Sua planilha tem uma linha de teste
   - ✅ Você recebeu o e-mail no seu Gmail com o **PDF anexado**

### Passo 5 — Publicar como Web App

1. Clique em **Implantar** (canto superior direito) → **Nova implantação**
2. Clique no ícone de engrenagem ⚙ → **App da Web**
3. Configurações:
   - **Descrição:** Anuário JH 2026 — API
   - **Executar como:** *Eu (seu email)*
   - **Quem tem acesso:** **Qualquer pessoa**
4. Clique em **Implantar**
5. Copie a **URL do app da Web** (algo como `https://script.google.com/macros/s/AKfycb.../exec`)

### Passo 6 — Conectar ao site

1. Abra `script.js`
2. Substitua a linha:
   ```javascript
   const APPS_SCRIPT_URL = 'COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT';
   ```
   pela URL que você copiou no passo anterior
3. Salve

✅ **Pronto!** O formulário do site agora salva os leads na planilha e envia o anuário em PDF automaticamente.

---

## 🎥 Trocar o vídeo do YouTube

No `index.html`, busque pelo comentário `⚠️ TROQUE O LINK DO VÍDEO AQUI` e substitua o `dQw4w9WgXcQ` pelo ID do seu vídeo:

```html
<!-- De: -->
src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"

<!-- Para: -->
src="https://www.youtube.com/embed/SEU_VIDEO_ID?rel=0&modestbranding=1"
```

> O ID é a parte após `v=` na URL do YouTube. Ex: `https://youtube.com/watch?v=`**`abc123`** → ID = `abc123`

---

## 🔄 Atualizar o PDF do anuário

Quando tiver uma nova versão do PDF:

**Opção 1** (recomendada — mantém o mesmo ID):
1. No Google Drive, clique com o botão direito no `anuariojh.pdf` → **Gerenciar versões**
2. Faça upload da nova versão
3. Pronto. O Apps Script vai automaticamente enviar a versão mais recente.

**Opção 2** (se subir um arquivo novo):
1. Pegue o novo ID do PDF
2. Atualize `PDF_ANUARIO_ID` no `google-apps-script.gs`
3. Salve

---

## 🌐 Publicar no GitHub Pages

### 1. Criar o repositório

```bash
cd anuario-jh
git init
git add .
git commit -m "feat: site do anuário JH 2026"
```

No [GitHub](https://github.com/new), crie um repositório **público** chamado `anuario-jh-2026`.

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/anuario-jh-2026.git
git push -u origin main
```

### 2. Ativar o GitHub Pages

1. No repositório, vá em **Settings** → **Pages**
2. Em **Source**, selecione **Deploy from a branch**
3. Branch: **main** | Folder: **/ (root)** → **Save**
4. Aguarde 1–2 minutos

Seu site estará em: `https://SEU_USUARIO.github.io/anuario-jh-2026/`

### 3. (Opcional) Domínio customizado

Em **Settings → Pages → Custom domain**, adicione seu domínio (ex: `anuario.jhconsultoria.com.br`) e configure o DNS no seu provedor.

---

## 📊 Acompanhar os leads

Os leads ficam salvos automaticamente na sua planilha do Google Sheets — você pode:
- Filtrar, ordenar, exportar para Excel
- Conectar com CRMs (HubSpot, RD Station etc.) via Zapier/Make
- Criar gráficos e dashboards no próprio Sheets

---

## 🔧 Atualizando o site

Toda vez que você editar arquivos e quiser publicar:

```bash
git add .
git commit -m "descrição da mudança"
git push
```

O GitHub Pages atualiza sozinho em ~1 minuto.

---

## 🆘 Problemas comuns

**O formulário diz "Configure a URL do Apps Script"**
→ Você esqueceu o passo 6. Edite o `script.js` com a URL do Apps Script.

**O PDF não chega no email**
→ Verifique se o `PDF_ANUARIO_ID` está correto no Apps Script. Rode `testarFluxo` para diagnóstico.

**Erro CORS no console do navegador**
→ Normal. Estamos usando `mode: no-cors` no fetch. O Apps Script recebe e processa mesmo assim.

**Mailapp diz "limite de envio excedido"**
→ Conta Gmail gratuita: 100 emails/dia. Conta Workspace: 1.500/dia. Se for picos altos, use SendGrid.

**Quero mudar o texto/cores**
→ Textos: edite o `index.html`. Cores: edite as variáveis CSS no topo do `styles.css` (`:root { --gold: ...; }`).

**A logo aparece com cor estranha**
→ A logo é renderizada com filtro CSS para virar dourada. Se quiser desligar e mostrar a logo original, remova `filter: ...` em `.brand__logo`, `.footer__logo` e `.letter__sig-mark img` no `styles.css`.
