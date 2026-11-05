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
        private categoryRepository: Repository<Category>
    ) {}

    //menghapus data kategori berdasarkan id
    
    //Mencari semua data kategori
    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find({
            order: { createdAt: 'DESC' }
        });
    }
    
    //membuat data kategori baru
    async create(category: CreateCategoryDto): Promise<Category> {
        const newCategory = this.categoryRepository.create(category);
        return await this.categoryRepository.save(newCategory);
    }
    
    //mencari data kategori berdasarkan id
    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });
        
        if (!category) {
            throw new NotFoundException('Kategori ${id} tidak ditemukan');
        }
        
        return category;
    }
    
    //mengubah data kategori berdasarkan id
    async update(id: string, updateCategory: CreateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);

        const updatedCategory = this.categoryRepository.merge(
            category,
            updateCategory
        );

        return await this.categoryRepository.save(updatedCategory);
    }

    async remove(id: string) {
        const category = await this.findOne(id);
        return this.categoryRepository.remove(category);
        // return {
        //     message: 'Kategori berhasil dihapus',
        //     deleteId: id
        // };
    }
}