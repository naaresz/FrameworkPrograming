import {
  IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

export class RegisterDto {
  //@IsString()
  @IsNotEmpty({ message: 'Username harus diisi' })
  @MaxLength(30, { message: 'Username maksimal 30 karakter' })
  readonly username: string;

  //@IsString()
  @IsNotEmpty({ message: 'Email harus diisi' })
  @IsEmail({}, { message: 'Email harus menggunakan format yang valid' })
  readonly email: string;

  //@IsString()
  @MinLength(3, { message: 'Password minimal 3 karakter' })
  @MaxLength(16, { message: 'Password maksimal 16 karakter' })
  readonly password: string;

  //@IsString()
  @MinLength(3, { message: 'Konfirmasi password minimal 3 karakter' })
  @MaxLength(16, { message: 'Konfirmasi password maksimal 16 karakter' })
  readonly confirmPassword: string;
}