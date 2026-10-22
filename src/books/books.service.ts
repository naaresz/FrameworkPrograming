import { Injectable} from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBooksDto } from './dto/create-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        const newBook = this.bookRepository.create(book)

        return await this.bookRepository.save(newBook)
    }

     async findById(id: string): Promise<Book | null> {
        return await this.bookRepository.findOneBy({ id });
    }
}