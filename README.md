# Biblio Tec – Sistema de Gerenciamento de Biblioteca

> 🚧 **Projeto em refatoração completa** — migração da versão desenvolvida em **Node.js + Express + MariaDB** para uma nova arquitetura utilizando **ASP.NET Core (C#) + SQL Server**.

## 📌 Sobre o projeto

O **Biblio Tec** é um sistema de gerenciamento de biblioteca desenvolvido inicialmente como um projeto em equipe durante o curso técnico. A primeira versão foi construída utilizando **Node.js**, **Express** e **MariaDB**, oferecendo funcionalidades como cadastro de usuários, consulta ao catálogo e cadastro de livros.

Atualmente, o projeto está sendo **reconstruído do zero**, com foco em arquitetura de software, boas práticas de desenvolvimento e maior escalabilidade.

A nova versão está sendo desenvolvida **individualmente** e adota tecnologias amplamente utilizadas no mercado .NET.

---

## 🚀 Objetivos da refatoração

Esta nova versão tem como principais objetivos:

* Reestruturar completamente a arquitetura da aplicação.
* Migrar o back-end para **ASP.NET Core Web API**.
* Utilizar **Entity Framework Core** com **SQL Server**.
* Implementar autenticação utilizando **JWT**.
* Aplicar princípios como **SOLID** e separação de responsabilidades.
* Utilizar **DTOs**, **Services**, **Controllers** e **Entity Framework Migrations**.
* Melhorar a organização e a manutenção do código.

---

## 💻 Tecnologias

### Back-end

* C#
* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* BCrypt
* LINQ

### Front-end

* HTML5
* CSS3
* JavaScript

---

## 📂 Arquitetura

```text
BiblioTecApi
│
├── Controllers
├── Data
├── DTOs
├── Models
├── Services
├── Migrations
├── Program.cs
└── appsettings.json
```

---

## 📚 Funcionalidades

### Implementadas

* Cadastro de usuários
* Persistência utilizando Entity Framework Core
* Migrations
* Criptografia de senhas com BCrypt

### Em desenvolvimento

* Login com JWT
* Controle de perfis de usuário
* Cadastro de livros
* Pesquisa de livros
* Empréstimos
* Reservas
* Histórico de empréstimos

---

## 🎯 Tecnologias estudadas durante o projeto

Este projeto está sendo utilizado para aprofundar conhecimentos em:

* ASP.NET Core
* Entity Framework Core
* SQL Server
* JWT
* Injeção de Dependência
* Arquitetura em Camadas
* REST API
* Boas práticas de desenvolvimento

---

## 📈 Status

🚧 **Em desenvolvimento**

A versão anterior em **Node.js + Express** foi finalizada para fins acadêmicos.

Esta nova versão representa uma reconstrução completa do sistema utilizando o ecossistema .NET, com foco em qualidade de código, arquitetura e tecnologias utilizadas em aplicações profissionais.

---

