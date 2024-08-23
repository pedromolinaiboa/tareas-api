import { Router } from "express";
import { tareasControllers } from "../controllers/tareasControllers";

export class appRoutes {
    static get routes(): Router {
        const router = Router();
        const tareasController = new tareasControllers();

        router.get('/tareas', tareasController.getTareas);
        router.get('/tareas/:id', tareasController.getTareasById);
        router.post('/tareas', tareasController.createTarea);
        router.put('/tareas/:id', tareasController.updateTarea);
        router.delete('/tareas/:id',tareasController.deleteTarea)
        return router;


    }
}