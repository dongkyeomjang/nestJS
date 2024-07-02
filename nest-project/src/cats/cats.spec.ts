import { Test, TestingModule } from '@nestjs/testing';
import { Cats } from './cats';

describe('Cats', () => {
  let provider: Cats;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cats],
    }).compile();

    provider = module.get<Cats>(Cats);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
