import { envs } from "./config/envs";
import { appRoutes } from "./config/routes";
import { Server } from "./server";

//Function autoinvocada
(() => {
    main();
}
)();

function main(){
    const server = new Server({
        port: envs.PORT,
        routes: appRoutes.routes,
    });
    
    server.start();
}