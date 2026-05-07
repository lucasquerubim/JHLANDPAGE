# 🚀 GUIA COMPLETO: Git + GitHub Pages

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

1. **Git instalado** — Baixe em [git-scm.com](https://git-scm.com/downloads)
2. **Conta no GitHub** — Crie em [github.com](https://github.com/join)
3. **Pasta do projeto** — A pasta `anuario-jh` descompactada no seu computador

---

## PARTE 1: Configurar o Git (primeira vez)

Se você nunca usou o Git antes, abra o **Terminal** (Mac/Linux) ou **Git Bash** (Windows) e configure:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

> 💡 Use o mesmo e-mail da sua conta do GitHub.

---

## PARTE 2: Subir o projeto no GitHub

### Passo 1: Navegar até a pasta do projeto

Abra o Terminal / Git Bash e vá até a pasta onde está o projeto:

```bash
cd caminho/para/anuario-jh
```

**Exemplo no Windows:**
```bash
cd C:/Users/SeuNome/Downloads/anuario-jh
```

**Exemplo no Mac:**
```bash
cd ~/Downloads/anuario-jh
```

> 💡 Dica: você pode arrastar a pasta para o Terminal que ele auto-completa o caminho.

---

### Passo 2: Inicializar o repositório Git

Dentro da pasta do projeto, rode:

```bash
git init
```

Você verá: `Initialized empty Git repository in ...`

---

### Passo 3: Adicionar todos os arquivos

```bash
git add .
```

Isso adiciona todos os arquivos do projeto (HTML, CSS, JS, logo, etc.) ao "stage" do Git.

---

### Passo 4: Fazer o primeiro commit

```bash
git commit -m "feat: landing page do Anuário JH 2026"
```

Isso cria um "snapshot" do projeto com a mensagem que você escreveu.

---

### Passo 5: Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Preencha:
   - **Repository name:** `anuario-jh-2026` (ou outro nome que preferir)
   - **Description:** (opcional) "Landing page do Anuário JH 2026"
   - **Public** (marque essa opção — é necessário para o GitHub Pages gratuito)
   - **NÃO** marque "Initialize this repository with a README"
3. Clique em **Create repository**

---

### Passo 6: Conectar o projeto local ao GitHub

O GitHub vai mostrar instruções na tela. Você vai rodar estes 2 comandos:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/anuario-jh-2026.git
```

> ⚠️ **IMPORTANTE:** Troque `SEU_USUARIO` pelo seu nome de usuário do GitHub.

**Exemplo real:**
```bash
git remote add origin https://github.com/jhconsultoria/anuario-jh-2026.git
```

---

### Passo 7: Enviar o código para o GitHub

```bash
git push -u origin main
```

O Git vai pedir suas credenciais do GitHub:
- **Username:** Seu nome de usuário
- **Password:** Token de acesso pessoal (veja abaixo se não tiver)

> 💡 **Senha não funciona mais no GitHub!** Você precisa criar um **Personal Access Token**:
>
> 1. Vá em [github.com/settings/tokens](https://github.com/settings/tokens)
> 2. Clique em **Generate new token** → **Classic**
> 3. Dê um nome (ex: "Git no computador")
> 4. Marque: `repo` (Full control of private repositories)
> 5. Clique em **Generate token**
> 6. **COPIE O TOKEN** (ele só aparece uma vez!)
> 7. Cole o token no lugar da senha quando o Git pedir

---

## PARTE 3: Ativar o GitHub Pages

Agora que o código está no GitHub, vamos publicar o site.

### Passo 1: Ir nas configurações

1. No seu repositório no GitHub, clique em **Settings** (⚙️ no menu superior)

---

### Passo 2: Ativar o Pages

1. No menu lateral esquerdo, clique em **Pages**
2. Em **Source**, selecione:
   - **Deploy from a branch**
3. Em **Branch**, escolha:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clique em **Save**

---

### Passo 3: Aguardar o deploy

O GitHub vai processar o site. Isso leva **1 a 2 minutos**.

Quando terminar, vai aparecer uma mensagem verde:

```
✅ Your site is live at https://SEU_USUARIO.github.io/anuario-jh-2026/
```

---

## PARTE 4: Ver o site rodando

Acesse: `https://SEU_USUARIO.github.io/anuario-jh-2026/`

**Exemplo real:**
```
https://jhconsultoria.github.io/anuario-jh-2026/
```

🎉 **Pronto! Seu site está no ar.**

---

## PARTE 5: Fazer alterações e atualizar

Sempre que você editar arquivos (HTML, CSS, JS), siga estes passos:

### 1. Verificar o que mudou

```bash
git status
```

Vai mostrar os arquivos que você editou.

---

### 2. Adicionar as mudanças

```bash
git add .
```

Ou adicionar arquivos específicos:

```bash
git add index.html styles.css
```

---

### 3. Fazer commit (descrição curta do que mudou)

```bash
git commit -m "fix: ajustar cor do botão CTA"
```

Exemplos de mensagens:
- `fix: corrigir link do vídeo`
- `feat: adicionar seção de depoimentos`
- `style: ajustar responsividade mobile`

---

### 4. Enviar para o GitHub

```bash
git push
```

O GitHub Pages vai **atualizar automaticamente** em ~1 minuto.

---

## ⚙️ BÔNUS: Comandos úteis do Git

### Ver histórico de commits

```bash
git log --oneline
```

### Desfazer mudanças não commitadas

```bash
git checkout -- index.html
```

### Ver diferenças antes de commitar

```bash
git diff
```

### Criar e mudar para uma nova branch

```bash
git checkout -b nova-feature
```

### Voltar para a main

```bash
git checkout main
```

---

## 🌐 BÔNUS: Usar domínio próprio

Se você tem um domínio (ex: `anuario.jhconsultoria.com.br`):

### Passo 1: Adicionar no GitHub

1. Vá em **Settings → Pages**
2. Em **Custom domain**, digite seu domínio: `anuario.jhconsultoria.com.br`
3. Clique em **Save**

---

### Passo 2: Configurar o DNS

No seu provedor de domínio (Registro.br, GoDaddy, etc.), adicione um registro **CNAME**:

| Tipo  | Nome     | Valor                                    |
|-------|----------|------------------------------------------|
| CNAME | anuario  | SEU_USUARIO.github.io                    |

**Exemplo:**
| Tipo  | Nome     | Valor                                    |
|-------|----------|------------------------------------------|
| CNAME | anuario  | jhconsultoria.github.io                  |

Aguarde 10 a 30 minutos para propagar.

Depois, acesse: `https://anuario.jhconsultoria.com.br`

---

## 🆘 Problemas comuns

### "Permission denied (publickey)"

Você precisa configurar uma SSH key ou usar HTTPS com token. Mais fácil: use HTTPS e o token como senha.

---

### "Updates were rejected because the remote contains work..."

Rode:
```bash
git pull origin main --rebase
git push
```

---

### Site não atualiza no GitHub Pages

- Aguarde 2 minutos
- Limpe o cache do navegador (`Ctrl+Shift+R` ou `Cmd+Shift+R`)
- Verifique em **Actions** (menu do GitHub) se o deploy teve erro

---

### Quero deletar o repositório e recomeçar

1. No GitHub, vá em **Settings** → **General**
2. Role até o final → **Danger Zone** → **Delete this repository**
3. Digite o nome do repositório e confirme
4. Recomece do **Passo 5** (criar novo repositório)

---

## 📚 Recursos extras

- **Documentação do Git:** [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Pages:** [pages.github.com](https://pages.github.com)
- **Guia interativo do Git:** [learngitbranching.js.org](https://learngitbranching.js.org)

---

**Criado para o projeto Anuário JH 2026** 🚀
