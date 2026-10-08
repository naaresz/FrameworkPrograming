import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBooksDto } from './dto/create-book.dto.js';
import { Book } from './entities/book-entity.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    //menampilkan semua data buku

    @Get()
    getBooks() {
        return this.booksService.findAll();
    }

    // menambahkan data buku baru
    @Post()
    createBooks(@Body() createBooksDto: CreateBooksDto){
        return this.booksService.create(createBooksDto);
    }

    //menampilkan data buku berdasarkan id
    @Get(':id')
    getBooksById(@Param('id') id: string) {
        return this.booksService.findById(Number(id));
    }

    //
    @Put(':id')
    updateBookById(@Param('id') id: string): string {
        return `Data buku dengan id: ${id} berhasil diupdate`;
    }

    // @Patch(':id')
    // updatePartialBookById(@Param('id') id: string): string {
    //     return `Data buku dengan id: ${id} berhasil diupdate secara parsial`;
    // }

    @Delete(':id')
    deleteBooksById(@Param('id') id: string): string {
       return `Data buku dengan id: ${id} berhasil dihapus`;
    }
}
