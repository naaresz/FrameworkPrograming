import { Injectable, NotFoundException} from '@nestjs/common';
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

    async update(id: string, updateBook:CreateBooksDto): Promise<Book>{
        const book = await this.findById(id)

        const updatedBook = this.bookRepository.merge(book, updateBook);

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