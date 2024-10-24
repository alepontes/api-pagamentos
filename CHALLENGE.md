# OMNI Technical Challange

1. Descrição
- API REST para simular um sistema simples de transações monetárias entre usuários.

2. Requisitos
- Necessário desenvolver as seguintes rotas
    - Rota de cadastro de usuário
```
POST /users/signup

json body request
{
  username: string,
  password: string,
  birthdate: string
}

json body response (201 CREATED)
{
  id: string,
}
```

- Rota de login de usuário
```
POST /users/signin

json body request
{
  username: string,
  password: string,
}

json body response (200 OK)
{
  token: string,
  expiresIn: string
}
```

- Rota de transferencia de dinheiro entre usuários
```
POST /transfer

auth: Bearer token

json body request
{
  fromId: string,
  toId: string,
  amount: number
}

json body response (204 NO CONTENT)
```

- Rota para retornar todos usuários
```
GET /users

auth: Bearer token

json body response (200 OK)
{
  id: string,
  username: string,
  birthdate: string,
  balance: string
}
```

3. Técnologias a serem utilizadas
- NestJS
- Persisitência (Opcional)
- TypeORM (Opcional)
- Docker (Opcional)
- Testes de integração e unitários (Opcional)
- Deploy (Opcional - dical de site [render](https://render.com/))