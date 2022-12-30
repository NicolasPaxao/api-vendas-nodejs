import { Router } from 'express';
import ProductsController from '../controllers/products_controller';

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get('/', productsController.index);
productRouter.get('/:id', productsController.show);
productRouter.post('/', productsController.create);
productRouter.put('/:id', productsController.update);
productRouter.delete('/:id', productsController.delete);

export default productRouter;
