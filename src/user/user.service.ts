import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}

	getById(id: string) {
		return this.prismaService.user.findUnique({
			where: {
				id,
			},
		})
	}

	getByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: {
				email,
			},
		})
	}

	async create(dto: UserDto) {
		const user = {
			email: dto.email,
			name: dto.name,
			password: await hash(dto.password),
		}
		return this.prismaService.user.create({
			data: user,
		})
	}

	async update(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}
		return this.prismaService.user.update({
			where: {
				id,
			},
			data,
			select: {
				email: true,
				name: true,
			},
		})
	}
}
