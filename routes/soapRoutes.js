import express from 'express';
import {
  getSoaps,
  getSoapById,
  createSoap,
  updateSoap,
  deleteSoap,
  extractTextFromFile
} from '../controllers/soapController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getSoaps);
router.post('/upload-pdf', upload.single('file'), extractTextFromFile);
router.get('/:id', getSoapById);
router.post('/', createSoap);
router.put('/:id', updateSoap);
router.delete('/:id', deleteSoap);

export default router;
