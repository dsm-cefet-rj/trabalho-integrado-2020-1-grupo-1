# COMO EXECUTAR A APLICAÇÃO

- Baixe o MongoDB e siga os passos de instalação definidos no site.

- Caso você prefira usar Docker, instale-o e baixe a imagem do MongoDB dando um:

```shell
docker pull mongo
```



### Em caso de instalação do MongoDB

- Abra o Docker

- Rode o comando abaixo:

```javascript
docker run --rm --name mongo-container -p 27017:27017 -d mongo
```



### Após isso, faça:

- Entre na pasta do backend via terminal e rode o comando:

```shell
yarn start ou npm start
```

- Entre na pasta do frontend via terminal e rode o comando:

```shell
yarn start ou npm start
```

