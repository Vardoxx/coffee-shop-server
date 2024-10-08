import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator'

export class PositionDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsNumber()
	cost: number

	@IsUrl()
	srcImg: string

	@IsString()
	type: string

	@IsBoolean()
	specialOffer?: boolean
}
