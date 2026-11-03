import { PartialType } from "@nestjs/mapped-types";
import { CreateBooksDto } from "./create-book.dto.js";

export class UpdateBookDto extends PartialType(CreateBooksDto) {}