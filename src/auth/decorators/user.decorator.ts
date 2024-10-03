import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

export const CurrentUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const req: PrismaService = ctx.switchToHttp().getRequest()
		const user = req.user

		return data ? user[data] : user
	},
)
