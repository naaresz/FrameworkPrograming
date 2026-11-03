import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ) {}

    // menampilkan semua data author
    async findAll(): Promise<Author[]> {
        return await this.authorRepository.find({
            order: ({ createdAt: 'DESC' })
        });
    }

    // menyimpan data author
    async create(author: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorRepository.create(author);

        return await this.authorRepository.save(newAuthor);
    }

    // menampilkan data author berdasarkan id
    async findById(id: string): Promise<Author> {
        const author = await this.authorRepository.findOneBy({ id });

        // jika tidak ada
        if (!author) {
            throw new NotFoundException(`Author ${id} tidak ditemukan`);
        }

        return author;
    }

    // mengupdate data author
    async update(id: string, updateAuthor: UpdateAuthorDto): Promise<Author> {
        const author = await this.findById(id);

        const updatedAuthor = this.authorRepository.merge(author, updateAuthor);

        return await this.authorRepository.save(updatedAuthor);
    }

    // menghapus data author
    async remove(id: string): Promise<{ message: string, deleteId: string }> {
        await this.findById(id);

        await this.authorRepository.delete(id);

        return {
            message: `Author ${id} berhasil dihapus`,
            deleteId: id
        };
    }
}