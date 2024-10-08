import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PositionModule } from './position/position.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [UserModule, AuthModule, PositionModule, CategoryModule, OrderModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
