import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
	constructor(private prismaService: PrismaService) {}

	async getAll(id: string) {
		return this.prismaService.positionCategory.findMany({
			where: {
				id,
			},
			select: {
				id: true,
				value: true,
			},
		})
	}

	async getByValue(value: string) {
		this.prismaService.positionCategory.findUnique({
			where: {
				value,
			},
		})
	}

	async create(dto: CategoryDto) {
		const existPositionCategory =
			await this.prismaService.positionCategory.findUnique({
				where: { value: dto.value },
			})

		if (existPositionCategory)
			throw new BadRequestException(
				`Category '${existPositionCategory.value}' already exist!`,
			)

		const res = await this.prismaService.positionCategory.create({
			data: {
				...dto,
			},
		})

		return {
			id: res.id,
			value: res.value,
		}
	}

	async delete(id: string) {
		const positionCategory =
			await this.prismaService.positionCategory.findUnique({
				where: { id },
			})

		if (!positionCategory) {
			throw new NotFoundException(`Category with id: ${id} not found`)
		}

		await this.prismaService.positionCategory.delete({
			where: {
				id,
			},
		})

		return {
			message: `Category '${positionCategory.value}' has been successfully deleted!`,
		}
	}

	async update(id: string, dto: CategoryDto) {
		const positionCategory =
			await this.prismaService.positionCategory.findUnique({
				where: { id },
			})

		if (!positionCategory) {
			throw new NotFoundException(`Category with id: ${id} not found`)
		}

		return this.prismaService.positionCategory.update({
			where: {
				id,
			},
			data: {
				...dto,
			},
			select: {
				id: true,
				value: true,
			},
		})
	}
}
