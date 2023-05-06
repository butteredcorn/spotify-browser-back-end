import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { LoginModule } from './login/login.module';
import { LyricsModule } from './lyrics/lyrics.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      driver: ApolloDriver,
      autoSchemaFile:
        process.env.NODE_ENV === 'development'
          ? join(process.cwd(), 'src/tmp/schema.gql')
          : true,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    TracksModule,
    LoginModule,
    LyricsModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
