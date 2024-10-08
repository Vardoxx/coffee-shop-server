import { Status } from '@prisma/client'
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateOrderDto {
	@IsNumber()
	totalCost: number

	@IsString()
	address: string

	@IsArray()
	item: any[]
}

export class UpdateOrderDto {
	@IsOptional()
	@IsInt()
	totalCost?: number

	@IsString()
	status: Status

	@IsInt()
	deliveryTime: number
}

export class CancelOrderDto {
	@IsString()
	status: Status
}
