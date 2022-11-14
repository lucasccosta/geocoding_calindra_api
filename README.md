# Desafio técnico para a empresa Calindra

- O desafio proposto consiste em criar um sistema que, ao receber uma requisição composta por três ou mais endereços como parâmetros de entrada, seja calculado qual o par ordenado de endereços mais próximos entre si, qual o par de endereços mais distante, e todos os pares com suas distâncias entre si.

## Primeiros passos

### Configuração do ambiente

- Clone o projeto em seu ambiente local
- Verifique se o `Node` está instalado com o comando `node --version`, assim como o `yarn` ou o `npm`, utilizando os comandos `yarn -v` ou `npm -v`
- Acessar o projeto e baixar as dependências utilizando os comandos `npm i` ou `yarn`
- Ao instalar todas as dependências, configure as variáveis de ambiente presentes no arquivo de configuração `.env.example`, e lembrar de alterar o nome do arquivo para apenas `.env`
- Depois de configuradas, digite `yarn:dev` em seu terminal e espere a menssagem confirmando que a API está rodando:

```
   Api is runnig on the port (porta configurada no arquivo de configuração .env.example) ou 3001
```

## Como fazer uma requisição

- Inicializar a API com o comando `yarn:dev`
- Para fazer uma requisição, é necessário utilizar um aplicativo externo para fazer requisições como Postman ou Insomnia
- Na aplicação, fazer uma chamada para a seguinte url:

```
http://localhost:(porta)/geopoint?address=enderecos

```

onde:

```
- porta = 3000
- enderecos = Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003&address=Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200&address=Av. Pres. Castelo Branco 35 Maracanã, Rio de Janeiro RJ, 20271-130&address=Av. República do Paraguai 395 Centro, Rio de Janeiro RJ, 20031-180&address=Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280-030
```

### Endereços sugeridos para teste

```
- Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003
- Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200
- Av. Pres. Castelo Branco 35 Maracanã, Rio de Janeiro RJ, 20271-130
- Av. República do Paraguai 395 Centro, Rio de Janeiro RJ, 20031-180
- Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280-030
```

### Requisição com sucesso:

```
- localhost:3000/location?address=Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003&address=Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200&address=Av. Pres. Castelo Branco 35 Maracanã, Rio de Janeiro RJ, 20271-130&address=Av. República do Paraguai 395 Centro, Rio de Janeiro RJ, 20031-180&address=Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280-030
```

### Requisição com falha (menos que 3 endereços):

```
- localhost:3000/location?address=Av. Rio Branco, 1, Centro, Rio de Janeiro, RJ, 20090003&address=Praça Mal. Âncora, 122,Centro, Rio de Janeiro, RJ, 20021200

```
