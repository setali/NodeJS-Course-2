<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/styles/main.css" />
    <link rel="stylesheet" href="/styles/form.css" />
    <link rel="stylesheet" href="/styles/chat.css" />

    <script defer src="/socket.io/socket.io.js"></script>
    <script defer src="/js/chat.js"></script>

  </head>
  <body>
    <div class="container">
      
      <%- include("../includes/menu.ejs") %>
      <main>

        <%- include("../includes/title.ejs") %>
        
        <div class="content">