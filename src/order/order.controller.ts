import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

import { CancelOrderDto, CreateOrderDto, UpdateOrderDto } from './dto/order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get('all')
	async getAll(id: string) {
		return this.orderService.getAll(id)
	}

	@Get()
	@Auth()
	async getUserOrders(@CurrentUser('id') userId: string) {
		return this.orderService.getUserOrders(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: CreateOrderDto, @CurrentUser('id') userId: string) {
		return this.orderService.create(userId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async update(@Body() dto: UpdateOrderDto, @Param('id') orderId: string) {
		return this.orderService.update(orderId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('cancel/:id')
	@Auth()
	async cancel(
		@Param('id') orderId: string,
		@CurrentUser('id') userId: string,
		@Body() dto: CancelOrderDto,
	) {
		return this.orderService.cancel(orderId, userId, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.orderService.delete(id)
	}
}
