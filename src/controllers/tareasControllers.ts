import { Request, Response } from "express";
import { Pool } from "pg";
import { envs } from "../config/envs";
export class tareasControllers {
   private pool: Pool;
   constructor() {
      this.pool = new Pool({
         connectionString: envs.HOST
      })

   }

   public getTareas = async (req: Request, res: Response) => {
      try {
         const resultado = await this.pool.query('SELECT * FROM TAREAS');
         const tareas = resultado.rows;
         return res.status(200).json(tareas);
      } catch (error) {
         console.log('error');
         return res.status(500).json({ error: 'error al obtener tareas' });

      }
   }

   public getTareasById = async (req: Request, res: Response) => {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'id esta vacio' })
      try {
         const resultado = await this.pool.query('SELECT * FROM TAREAS WHERE Id=$1', [id])
         const tarea = resultado.rows[0];
         if (!tarea) return res.status(400).json({ mensaje: 'tarea no encontrada' });
         return res.status(200).json(tarea);
      } catch (error) {
         console.log('error');
         return res.status(500).json({ error: 'error al obtener tareas' });
      }
   }

   public createTarea = async (req: Request, res: Response) => {
      const { texto } = req.body;

      if (!texto) return res.status(400).json({ error: 'el texto es requerido' });
      try {
         await this.pool.query('INSERT INTO TAREAS(TAREA) VALUES($1)', [texto])
         return res.status(200).json({
            codigo: '200 ok',
            mensaje: `la tarea se agregó exitosamente: ${texto}`
         })
      } catch (error) {
         return res.status(500).json({ error: `no se pudo crear la tarea` })

      }

   }


   public updateTarea = async (req: Request, res: Response) => {
      
      const id = req.params.id;
      const { texto } = req.body;
    


      if(!texto) return res.status(400).json({error:'el texto es requerido'});

      try {
         await this.pool.query('UPDATE TAREAS SET Tarea=$1 where id=$2',[texto,id])
         return res.status(200).json({
            codigo: '200 ok',
            mensaje: `la tarea id ${id} se actualizo exitosamente`
         })
      } catch (error) {
         return res.status(500).json({error:`al acutalizar la tarea`})

      }

   }


   public deleteTarea = async (req: Request, res: Response) => {
      
      const id = req.params.id;
    

      if(!id) return res.status(400).json({error:'el id es requerido'});

      try {
         // await this.pool.query('DELETE TAREAS  where id=$1',[id])
         const resultado = await this.pool.query('DELETE FROM  TAREAS  where id=$1',[id])
         if(!resultado) return res.status(400).json({error:`tarea con id ${id} no encontrada`})
         else{return res.status(200).json({
            codigo: '200 ok',
            mensaje: `la tarea id ${id} se elimino exitosamente`
         })}
      } catch (error) {
         return res.status(500).json({error:`al eliminar la tarea`})

      }

   }





}