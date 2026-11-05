import {Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe} from '@nestjs/common';

import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-categories.dto.js';
import { UpdateCategoryDto } from './dto/update-categories.dto.js';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    //Mencari semua data kategori
    @Get()
    getCategories() {
        return this.categoriesService.findAll();
    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get(':id')
    getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriesService.findOne(id);
    }

    @Put(':id')
    update( id: string, updateCategory: CreateCategoryDto
    ) {
        return this.categoriesService.update(id, updateCategory);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.categoriesService.remove(id);
    }
}