import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
// import { Category } from './modules/categories/entities/category.entity';
// import { User } from './users/entities/user.entity';
import { join } from 'path';
import { ProductsModule } from './modules/products/products.module';
import { OptionsModule } from './modules/options/options.module';
import { OptionValuesModule } from './modules/option_values/option_values.module';
import { ProductSkusModule } from './modules/product_skus/product_skus.module';
import { SkuValuesModule } from './modules/sku_values/sku_values.module';
import { ProductImagesModule } from './modules/product_images/product_images.module';
import { MulterModule } from '@nestjs/platform-express';
import { FirebaseResolver } from './firebase/firebase.resolver';
import { FirebaseService } from './firebase/firebase.service';
import { ImageUploadResponse } from './firebase/entities/file.entity';
import { FirebaseController } from './firebase/firebase.controller';
import { BranchModule } from './modules/branch/branch.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/order_details/order_details.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { CommentModule } from './modules/comment/comment.module';
import { DiscountCodeModule } from './modules/discount_code/discount_code.module';
import { BannerModule } from './modules/banner/banner.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    ImageUploadResponse,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3306,
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      // entities: [Category, User],
      // logging: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OptionsModule,
    OptionValuesModule,
    ProductSkusModule,
    SkuValuesModule,
    ProductImagesModule,
    BranchModule,
    OrdersModule,
    OrderDetailsModule,
    FeedbackModule,
    CommentModule,
    DiscountCodeModule,
    BannerModule,
  ],
  controllers: [AppController, FirebaseController],
  providers: [AppService, FirebaseResolver, FirebaseService],
  exports: [FirebaseService],
})
export class AppModule {}
