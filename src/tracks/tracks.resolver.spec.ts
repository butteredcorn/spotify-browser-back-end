import { Test, TestingModule } from '@nestjs/testing';
import { TracksResolver } from './tracks.resolver';

describe('TracksResolver', () => {
  let resolver: TracksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracksResolver],
    }).compile();

    resolver = module.get<TracksResolver>(TracksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
