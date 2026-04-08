# KØMANDO CRM

Dashboard de acompanhamento de implementação da Arquitetura Blindada de Gestão.

---

## 🚀 Deploy em 5 passos

### 1. Criar projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Criar projeto"** → dê um nome (ex: `komando-crm`)
3. No menu lateral, vá em **Build → Realtime Database**
4. Clique em **"Criar banco de dados"**
5. Escolha a região (us-central1 ou southamerica-east1)
6. Inicie em **modo de teste** (regras abertas por 30 dias — depois você restringe)

### 2. Pegar as credenciais

1. No Firebase Console, vá em ⚙️ **Configurações do projeto**
2. Role até **"Seus apps"** → clique no ícone `</>` (Web)
3. Registre o app com qualquer nome
4. **Copie o objeto `firebaseConfig`**

### 3. Colar as credenciais no código

Abra o arquivo `index.html` e substitua o bloco:

```js
const firebaseConfig = {
  apiKey:            "COLE_SUA_API_KEY_AQUI",
  authDomain:        "SEU_PROJETO.firebaseapp.com",
  databaseURL:       "https://SEU_PROJETO-default-rtdb.firebaseio.com",
  ...
};
```

...pelos valores reais que você copiou do Firebase.

### 4. Subir para o GitHub Pages

```bash
# Se ainda não tem o repositório:
git init
git add .
git commit -m "init: komando crm"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/komando-crm.git
git push -u origin main
```

No GitHub:
- Vá em **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: `main` / `/ (root)`
- Salve — em ~1 min o site estará em `https://SEU_USUARIO.github.io/komando-crm`

### 5. Popular o banco (seed inicial)

1. Abra o site no browser
2. Abra o Console (F12 → Console)
3. Execute:
   ```js
   loadSeed()
   ```
4. Depois:
   ```js
   await seedKomando()
   ```
5. Aguarde a mensagem **"✅ Seed concluído!"**
6. Recarregue a página — os dados aparecerão

---

## 📁 Estrutura de arquivos

```
komando-crm/
├── index.html        ← app completo (UI + Firebase)
├── seed.js           ← dados iniciais (rode uma vez)
├── firebase-config.js← referência de config (não usado diretamente)
└── README.md         ← este arquivo
```

---

## 🔒 Regras de segurança (após testes)

No Firebase Console → Realtime Database → Regras, substitua por:

```json
{
  "rules": {
    "komando": {
      ".read": true,
      ".write": true
    }
  }
}
```

Para adicionar autenticação depois, entre em contato.

---

## 🗂️ Estrutura do banco de dados

```
komando/
  consultores/
    c1/
      nome: "Samara"
      empresas/
        e1/
          nome: "Camomburguer"
          seg:  "Food & Beverage"
          pct:  72
          eixos/
            gestao_pessoas/
              nome: "Gestão de Pessoas & Liderança"
              short: "GP"
              icon:  "👥"
              pct:   80
              tarefas: [
                { txt: "Mapeamento do organograma", done: true },
                ...
              ]
            vendas_posicionamento/ ...
            performance_financeira/ ...
            processos_operacionais/ ...
```

---

## ✨ Funcionalidades

| Feature | Status |
|---|---|
| Visão macro com mandala global | ✅ |
| 12 consultores com % médio | ✅ |
| 5 empresas por consultor | ✅ |
| Mandala por empresa com 4 eixos | ✅ |
| Tarefas com checkbox (sync Firebase) | ✅ |
| % recalculado em tempo real | ✅ |
| Adicionar consultor via modal | ✅ |
| Adicionar empresa via modal | ✅ |
| Adicionar tarefa via modal | ✅ |
| Sync indicator (●) | ✅ |
| PWA / mobile-first | ✅ |
