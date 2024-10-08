import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CancelOrderDto, CreateOrderDto, UpdateOrderDto } from './dto/order.dto'

@Injectable()
export class OrderService {
	constructor(private prismaService: PrismaService) {}

	async getAll(id: string) {
		return this.prismaService.order.findMany({
			where: {
				id,
			},
		})
	}

	async getUserOrders(userId: string) {
		return this.prismaService.order.findMany({
			where: {
				userId,
			},
		})
	}

	async create(userId: string, dto: CreateOrderDto) {
		return this.prismaService.order.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async update(id: string, dto: UpdateOrderDto) {
		return this.prismaService.order.update({
			where: {
				id,
			},
			data: {
				...dto,
			},
		})
	}

	async cancel(orderId: string, userId: string, dto: Partial<CancelOrderDto>) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
		})

		if (!order)
			throw new NotFoundException('Order has been canceled or not found!')

		await this.prismaService.order.update({
			where: {
				userId,
				id: orderId,
			},
			data: {
				...dto,
			},
		})
		return { message: 'Order has been canceled!' }
	}

	async delete(id: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id },
		})

		if (!order) throw new NotFoundException(`Order with id: '${id}' not found!`)

		await this.prismaService.order.delete({
			where: {
				id,
			},
		})
		return {
			message: `Order with id: '${id}' has been deleted!`,
		}
	}
}
