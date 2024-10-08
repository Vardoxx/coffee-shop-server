import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PositionDto } from './position.dto'

@Injectable()
export class PositionService {
	constructor(private prismaService: PrismaService) {}

	async getAll(id: string) {
		return this.prismaService.position.findMany({
			where: {
				id,
			},
		})
	}

	async getByTitle(title: string) {
		this.prismaService.position.findUnique({
			where: {
				title,
			},
		})
	}

	async create(dto: PositionDto) {
		const existPosition = await this.prismaService.position.findUnique({
			where: { title: dto.title },
		})

		if (existPosition)
			throw new BadRequestException(
				`Position '${existPosition.title}' already exist!`,
			)

		return this.prismaService.position.create({
			data: {
				...dto,
			},
		})
	}

	async delete(id: string) {
		const position = await this.prismaService.position.findUnique({
			where: { id },
		})

		if (!position) {
			throw new NotFoundException(`Position with id: ${id} not found`)
		}

		await this.prismaService.position.delete({
			where: {
				id,
			},
			select: {
				title: true,
			},
		})

		return {
			message: `Position '${position.title}' has been successfully deleted!`,
		}
	}

	async update(id: string, dto: PositionDto) {
		const position = await this.prismaService.position.findUnique({
			where: { id },
		})

		if (!position) {
			throw new NotFoundException(`Position with id: ${id} not found`)
		}

		return this.prismaService.position.update({
			where: {
				id,
			},
			data: {
				...dto,
			},
		})
	}
}
