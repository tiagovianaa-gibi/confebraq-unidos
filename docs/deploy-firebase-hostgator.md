# Deploy Firebase + HostGator

## O que ja ficou configurado no projeto

- `firebase.json` com `Hosting` apontando para `dist`
- `rewrites` para SPA do React funcionar em acesso direto, como `/painel`
- `.firebaserc` ligado ao projeto `confebraq-unidos`
- `firestore.rules` separando dados publicos e privados das entidades
- build do Vite ajustado para producao em dominio real
- `Cloud Firestore` padrao criado em `nam5` no dia `2026-04-22`

## Atencao sobre a regiao do Firestore

O banco padrao foi provisionado em `nam5` durante o deploy.

Se voce pretendia outra regiao, pare antes de colocar dados reais em producao. Segundo a documentacao oficial do Firebase, o local do banco padrao nao pode ser alterado depois do provisionamento.

## Estrutura de dados usada em producao

- `entityReportSummaries/{uid}`: leitura publica
  Guarda apenas totais, sigla, UF, nome da entidade e nome do responsavel.
- `entityReports/{uid}`: leitura privada do proprio usuario
  Guarda os detalhes completos, incluindo quadrilhas e e-mail.

## Tarefas unicas no Firebase Console

1. Ativar `Authentication > Sign-in method > Google`.
2. Em `Authentication > Settings > Authorized domains`, adicionar:
   - `localhost`
   - `SEU_DOMINIO`
   - `www.SEU_DOMINIO`
3. Confirmar que o app web usa as mesmas variaveis em `.env`.
4. Em `Hosting`, usar `Add custom domain` para iniciar a conexao do dominio.

## Tarefas no HostGator

Use os registros mostrados pelo wizard de dominio do Firebase. Nao force valores antigos se o console mostrar outros.

No painel atual do HostGator, o caminho normal e:

1. `Customer Portal`
2. `Domains`
3. Escolher o dominio
4. `DNS`
5. Adicionar ou editar os registros pedidos pelo Firebase

O fluxo mais comum do Firebase pede:

- um `TXT` para verificacao do dominio
- registros `A` para o dominio raiz
- um `CNAME` para `www` ou para o subdominio configurado

Depois de salvar no HostGator, volte ao Firebase e clique em `Verify`.

## Deploy

Build local:

```bash
npm run build
```

Deploy do site:

```bash
firebase deploy --only hosting
```

Deploy das regras e indices do Firestore:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

Deploy completo:

```bash
firebase deploy
```

## Fontes oficiais

- Firebase Hosting custom domain:
  https://firebase.google.com/docs/hosting/custom-domain
- HostGator DNS:
  https://www.hostgator.com/help/article/manage-dns-records-with-hostgatorenom
  https://www.hostgator.com/help/article/how-to-change-dns-zones-mx-cname-and-a-records
