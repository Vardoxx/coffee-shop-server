import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	password: string
}
