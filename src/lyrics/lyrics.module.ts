import { Module } from '@nestjs/common';
import { LyricsResolver } from './lyrics.resolver';
import { LyricsService } from './lyrics.service';

@Module({
  providers: [LyricsResolver, LyricsService]
})
export class LyricsModule {}
