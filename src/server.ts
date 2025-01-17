import express, { Router } from 'express';

interface options {
    port: number;
    routes: Router;
}
export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor (options:options){
        const {port, routes} = options;
        this.port = port;
        this.routes = routes;

    }

    async start(){
        this.app.use(express.json());
        this.app.use(this.routes);
        this.app.listen(this.port,() => {
            console.log(`Server Corriendo en el puerto ${this.port}`)
        })
    }

}