import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBooksDto } from './dto/create-book.dto.js';

@Injectable() //saat ada @ dibaca dekorator
export class BooksService {
    private books: Book[] = [
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            isbn: '978-0-7432-7356-5',
            publishedYear: 1925,
            isAvailable: true
        }
    ];

    //mencari semua data buku
    findAll(): Book[] {
        return this.books; //this.books artinya dia akan membaca data buku
    }

    // menyimpan data buku
    create(book: CreateBooksDto): Book {
        const newBook: Book = {
            id: this.books.length + 1,
            title: book.title, 
            author: book.author,
            isbn: book.isbn,
            publishedYear: book.publishedYear,
            isAvailable: true
        }
        //simpan ke database 
        this.books.push(newBook);

        return newBook;
    }

    findById(id: number): Book | undefined {
        return this.books.find(book => book.id === Number(id));
    }
}