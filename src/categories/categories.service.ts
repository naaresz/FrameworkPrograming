import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity.js';
import { CreateCategoryDto } from './dto/create-categories.dto.js';
import { UpdateCategoryDto } from './dto/update-categories.dto.js';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async create(category: CreateCategoryDto): Promise<Category> {
        const newCategory = this.categoryRepository.create(category);
        return await this.categoryRepository.save(newCategory);
    }

    async findById(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Kategori tidak ditemukan');
        }

        return category;
    }

    async update(id: string, updateCategory: UpdateCategoryDto): Promise<Category> {
        const category = await this.findById(id);

        const updatedCategory = this.categoryRepository.merge(
            category,
            updateCategory
        );

        return await this.categoryRepository.save(updatedCategory);
    }

    async remove(id: string): Promise<{ message: string; deleteId: string }> {
        await this.findById(id);
        await this.categoryRepository.delete(id);

        return {
            message: 'Kategori berhasil dihapus',
            deleteId: id
        };
    }
}