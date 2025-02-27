# Escolhas tecnicas

  React native paper -> decidi utiliza-lo pois seus componentes facilitam muito no desenvolvimento e na agilidade durante o desenvolvimento, sem comentar que a biblioteca utiliza um estilo parecido com material UI
  react query -> decidi utilizar o react query para poder me aproveitar da route state pois como o aplicativo seria simples assim eu não precisaria me preucupar com os states da aplicação tendo que utilizar contexts ou até mesmo um redux.
  react-hook-forms e yup -> adicionei o react hook forms e o yup para agilizar o processo de criação de formulários e melhorar o tempo de desenvolvimento visto que as duas bibliotecas juntas ajudam e muito para o desenvolvimento organizado e agil.
  router -> utilizei o expo router mesmo pois como o aplicativo era pra ser feito com o expo não vi a necessidade de utilizarmos um router teceiro como um react-router tendo em vista que o expo router já supria a demanda.
  apiClient -> escolhi o axios pois ele facilita na leitura das function quando fazemos uma request deixando o codigo mais legivel do que apenas utilizando o fetch

  Api -> sobre api decidi utilizar ela com um json-server para imitar o comportamento de uma api normal e também agilizar o processo do MVP do teste

# Como Rodar 

## App

1. Intalar dependencias

   ```bash
   npm install
   ```

2. Atualizar o .env

   ```bash
    trocar o EXPO_PUBLIC_API_URL para o seu endereço Ipv4 exemplo http://192.168.25.25:30000
   ```


3. iniciar o app

   ```bash
    npm run android
   ```

## Api


1. Intalar dependencias

   ```bash
   npm install
   ```


2. iniciar a api

   ```bash
    npm run server
   ```

# Codigo fonte

https://github.com/windstonp/contact-app