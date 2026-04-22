# CONFEBRAQ

Site institucional da CONFEBRAQ construido com React, TypeScript e Vite.

## Desenvolvimento local

Use o servidor do Vite:

```bash
npm run dev
```

Depois abra `http://localhost:8080`.

## Go Live

`Go Live` nao compila arquivos `.tsx`. Se abrir o projeto direto por ele, o `index.html` agora tenta carregar o build de `dist`.

Para isso funcionar com as alteracoes mais recentes, gere o build antes:

```bash
npm run build
```

## Deploy

O projeto esta preparado para publicar no Firebase Hosting com rotas do React.

Passo a passo completo:

- [docs/deploy-firebase-hostgator.md](docs/deploy-firebase-hostgator.md)
- [docs/panel-access-firestore.md](docs/panel-access-firestore.md)
