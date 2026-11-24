import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { RolesModule } from './roles/roles.module.js';
import { AuthModule } from './auth/auth.module.js';                   
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule, type Duration } from '@nestjs/authentication';      
export const { ObserveModule, ObserveInstrument } = createObserveModule();
import { AuthorizationModule } from '@nestjs/authorization';
import { APP_FILTER } from '@nestjs/core';                              
import { QueryFailedFilter } from './common/filters/query-failed.filter.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    AuthenticationModule.forRootAsync({                               
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        accessToken: {
          key: config.getOrThrow<string>('JWT_SECRET'),
          issuer: 'parcial-api',
          audience: 'parcial-clients',
          ttl: config.getOrThrow<Duration>('JWT_EXPIRES_IN'),         
        },
        refreshToken: { ttl: config.getOrThrow<Duration>('JWT_REFRESH_EXPIRES_IN') },
        allowInMemoryStorage: true,
      }),
    }),
    AuthorizationModule.forRoot(),
    UsersModule,
    RolesModule,
    AuthModule,                                                      
  ],
  controllers: [AppController],
  providers: [AppService,{ provide: APP_FILTER, useClass: QueryFailedFilter }],
})
export class AppModule {}