import { Router } from 'express';
import TestProc from '../models'

const router = Router();

router.get('/poc', (req, res) => {
    return res.send({data: getProcResult()});
});

async function getProcResult(){
  return await TestProc();
}


export default router;
