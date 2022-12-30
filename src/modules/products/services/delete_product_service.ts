import AppError from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/products_repository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError(`There's no product with id: ${id}`);
    }
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
