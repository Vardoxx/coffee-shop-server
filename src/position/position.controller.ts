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
import { PositionDto } from './position.dto'
import { PositionService } from './position.service'

@Controller('position')
export class PositionController {
	constructor(private readonly positionService: PositionService) {}

	@Get()
	getAll(id: string) {
		return this.positionService.getAll(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	create(@Body() dto: PositionDto) {
		return this.positionService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: PositionDto) {
		return this.positionService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.positionService.delete(id)
	}
}
