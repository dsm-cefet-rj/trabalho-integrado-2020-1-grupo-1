<h1 align="center">COMO EXECUTAR A APLICAÇÃO</h1>

### Preparativos iniciais:

1 - Instalar o npm:

Para poder fazer a instalação do npm basta acessar o seguinte site [https://nodejs.org/en/](https://nodejs.org/en/) e seguir o guia de instalação presente para o sistema operacional que usa.

2 - Instalar o yarn:

Tendo o npm instalado em sua máquina, para instalar o yarn, basta acessar o terminal da sua máquina e executar o seguinte comando:

```bash
npm i -g yarn
```

3 - Instalar o MongoDB: 

Para a instalação do MongoDB oferecemos duas opções: 

3.1 - Instalar o MongoDB diretamente na sua máquina, acessando o seguinte site: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/) e seguir o guia de instalação presente para o sistema operacional que usa. 

3.2 - Utilizando a imagem do Docker, que pode ser obtida executando o seguinte comando:

```bash
docker pull mongo
```

Tendo feito a instalação da imagem no Docker, para executar o MongoDB basta executar o seguinte comando:

```bash
docker run --rm --name mongo-container -p 27017:27017 -d mongo
```

Caso queira salvar os dados inseridos, tem que ser utilizado o seguinte comando no lugar:

```bash
docker run --rm --name mongo-container -p 27017:27017 -v <diretório desejado>:/data/db -d mongo
```

Para finalizar o processo basta executar o seguinte comando:

```bash
docker stop mongo-container
```

### Após baixar o projeto do GitHub:

1 - Instalando as dependências:

Tendo acessado o diretório do projeto pelo terminal, para fazer a instalação das dependências basta executar o comando:

```bash
yarn
```

2 - Configurando as variáveis de ambiente:

Para que o projeto seja bem executado, é necessário a configuração das variáveis de ambiente, para isso primeiramente é preciso gerar o aquivo .env que conterá tais variávies, para isso basta executar o comando:

```bash
cp .env.example .env
```

Caso esteja usando o CMD do Windows:

```cmd
copy .env.example .env
```

Tendo gerado tal arquivo, é necessário agora colocar os valores nas variáveis, sendo elas:

1. APP_KEY - Chave da aplicação, utilizada para codificação dos tokens de autenticação
2. APP_CLIENT - Endereço de origin para o CORS
3. NODE_ENV - Indicação do ambiente da aplicação
4. PORT - Porta a qual a aplicação irá ser exposta
5. DATABASE_URL - URL de conexão do banco de dados MongoDB
6. MAIL_AUTH_USER - Usuário do serviço de email utilizado
7. MAIL_AUTH_PASSWORD - Senha do serviço de email utilizado
8. MAIL_HOST - Host do serviço de email utilizado
9. MAIL_PORT - Porta do serviço de email utilizado
10. MAIL_FROM_NAME - Nome do remetente do e-mail
11. MAIL_FROM_ADDRESS - Endereço de remetente do e-mail
12. RIOT_API_API_TOKEN - Token da API da Riot
13. RIOT_API_BASE_URL - URL base para requisições a API da Riot

**OBS:** No momento só há necessidade de inserir as seguintes variáveis: APP_KEY, APP_CLIENT, NODE_NEV, PORT, DATABASE_URL, MAIL_AUTH_USER, MAIL_AUTH_PASSWORD, MAIL_HOST, MAIL_PORT, MAIL_FROM_NAME, MAIL_FROM_ADDRESS

3 - Importar os dados dos campeões para o seu banco MongoDB

Para que seja feita tal importação basta executar um dos seguintes comandos:

Caso tenha instalado diretamente na sua máquina:

```bash
mongoimport --drop --db battleside --collection champions --file champions.json --json-array
```

Caso tenha instalado via Docker:

```bash
docker exec -i mongo-container sh -c 'mongoimport --drop --db battleside --collection champions --json-array' < champions.json
```

4 - Rodar o projeto:

Para executar o projeto basta executar um dos seguintes comandos:

Caso venha apenas a executar e verificar o funcionamento:

```bash
yarn start
```

Ou caso venha fazer alguma alteração nos arquivos .js:

```bash
yarn dev
```

**OBS:** Caso seja feita alguma alteração no arquivo .env, independente do comando utilizado a aplicação deve ser reiniciada