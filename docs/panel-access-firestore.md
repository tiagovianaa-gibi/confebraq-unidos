# Controle de acesso do painel

O painel agora usa a colecao `panelAccess` no Firestore para decidir quem entra e o que cada usuario pode fazer.

## Colecao

- Caminho: `panelAccess/{uid}`
- O `uid` precisa ser exatamente o `uid` do usuario no Firebase Authentication.

## Perfil de administrador

Use este formato para administradores da CONFEBRAQ:

```json
{
  "uid": "UID_DO_USUARIO",
  "email": "admin@confebraq.com",
  "displayName": "Administrador CONFEBRAQ",
  "role": "admin",
  "active": true,
  "updatedAt": "2026-04-22T00:00:00.000Z"
}
```

## Perfil de entidade

Use este formato para o responsavel de uma entidade estadual:

```json
{
  "uid": "UID_DO_USUARIO",
  "email": "presidente@entidade.org",
  "displayName": "Presidente da entidade",
  "role": "entity",
  "entitySigla": "FEQUAJUTO",
  "active": true,
  "updatedAt": "2026-04-22T00:00:00.000Z"
}
```

## Efeito das regras

- `admin`: acesso total ao painel, noticias, transparencia, Storage e todos os cadastros estaduais.
- `entity`: acesso apenas ao cadastro da propria `entitySigla`.
- Usuario sem documento em `panelAccess`: entra com Google, mas nao abre o painel.

## Observacao

Os cadastros de entidades agora sao gravados por `entitySigla` no Firestore. Se existir dado antigo salvo por `uid`, ele nao sera mais o caminho principal de escrita e pode precisar de migracao manual.
