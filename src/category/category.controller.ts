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
import { CategoryService } from './category.service'

import { CategoryDto } from './category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	getAll(id: string) {
		return this.categoryService.getAll(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}
}
