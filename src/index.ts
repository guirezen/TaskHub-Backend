import { InversifyExpressServer } from "inversify-express-utils";
import express from 'express';
import { container } from "./ioc/container";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
});

// inicialização do servidor
const app = server.build();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});