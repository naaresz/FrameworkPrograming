import { Injectable, NotFoundException} from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBooksDto } from './dto/create-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable() //saat ada @ dibaca dekorator
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}

    //
    async findAll(): Promise<Book[]>{
        return await this.bookRepository.find({
            order:({createdAt:'DESC'})
        })
    }

    //menyimpan buku
    async create(book: CreateBooksDto) : Promise<Book>{
        const existingBook = await this.bookRepository.findOneBy({
            isbn: book.isbn
        });

        if(existingBook){
            throw new NotFoundException(`Buku dengan ISBN ${book.isbn} sudah ada`)
        }


        const newBook = this.bookRepository.create({
            ...book,
            isAvailable: book.stock > 0 && book.isAvailable
        })

        return await this.bookRepository.save(newBook)
    }

    async findById(id: string): Promise<Book> {
        const book = await this.bookRepository.findOneBy({id})

        //jika tidak ada
        if(!book){
            //tampilkan error
            throw new NotFoundException(`Buku ${id} tidak ditemukan`)
        }

        return book
        //return await this.bookRepository.findOneBy({ id });
    }

    async update(id: string, updateBook:UpdateBookDto): Promise<Book>{
        const book = await this.findById(id)

        const updatedBook = this.bookRepository.merge(book, updateBook);

        if(updatedBook.stock <= 0){
            updatedBook.isAvailable = false
        }

        return await this.bookRepository.save(updatedBook)
    }

    async remove(id: string): Promise<{message:string, deleteId:string}>{
        await this.bookRepository.softDelete(id)

        return {
            message: `Buku ${id} berhasil dihapus`,
            deleteId: id
        }
    }
}