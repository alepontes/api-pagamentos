# Pagamentos API 
API que simula transferências simples ([CHALLENGE](CHALLENGE.md))

## Passo a passo 
- Faça o clone do projeto `git clone https://github.com/alepontes/api-pagamentos.git`
- Entre no projeto `cd api-pagamentos`
- Instale as dependencias `npm i`
- Rode o docker com o banco de dados Postgres `docker compose up`
- Rode todos os testes (Opcional) `npm test`
- Rode o projeto `npm start`

## Observações
- Caso use Webstorm, Requests disponíves [scripts/requests.http](scripts/requests.http)
- Os usuário são criados com `balance` de 100 para facilitar testes, definido em [src/users/entities/user.entity.ts](src/users/entities/user.entity.ts)
- Adicionei o arquivo .[env](.env) para facilidar a execução do código localmente
- Link da API hospedada https://api-pagamentos-lpkk.onrender.com/