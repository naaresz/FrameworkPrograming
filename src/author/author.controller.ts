import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    // menampilkan semua data author
    @Get()
    getAuthor() {
        return this.authorService.findAll();
    }

    // menambahkan data author baru
    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authorService.create(createAuthorDto);
    }

    // menampilkan data author berdasarkan id
    @Get(':id')
    getAuthorById(@Param('id') id: string) {
        return this.authorService.findById(id);
    }

    // mengupdate data author
    @Put(':id')
    updateAuthor(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
        return this.authorService.update(id, dto);
    }

    // menghapus data author berdasarkan id
    @Delete(':id')
    deleteAuthorById(@Param('id') id: string) {
        return this.authorService.remove(id);
    }
}