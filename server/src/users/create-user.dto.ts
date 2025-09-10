import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "Email unique de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mot de passe (min 8 caractères, max 36)' })
  @IsString()
  @MinLength(8)
  @MaxLength(36)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Le mot de passe doit contenir au moins une majuscule',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  @Matches(/(?=.*[-!@#$%^&*])/, {
    message: 'Le mot de passe doit contenir au moins un caractère spécial',
  })
  @Matches(/^[\p{L}\p{N}!@#$%^&*()_\-+=]*$/u, {
    message:
      'Le mot de passe ne peut pas contenir d’emojis ou de caractères non autorisés',
  })
  password: string;
}
