import { Router } from 'express';
import { Database } from '../database/Database.js';
import { EntregasRepository } from '../repositories/EntregasRepository.js';
import { EntregasService } from '../services/EntregasService.js';
import { EntregasController } from '../controllers/EntregasController.js';

// Tudo é montado aqui para não espalhar a criação das dependências pelo projeto.
const banco = new Database();
const repository = new EntregasRepository(banco);
const service = new EntregasService(repository);
const controller = new EntregasController(service);

const router = Router();

router.post('/entregas', controller.criar);
router.get('/entregas', controller.listar);
router.get('/entregas/:id/historico', controller.historico);
router.get('/entregas/:id', controller.buscar);
router.patch('/entregas/:id/avancar', controller.avancar);
router.patch('/entregas/:id/cancelar', controller.cancelar);

export default router;
