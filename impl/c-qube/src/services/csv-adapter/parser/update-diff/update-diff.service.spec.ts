import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../../app.controller';
import { AppService } from '../../../../app.service';

import { getDataDifference } from './update-diff.service';

describe('tests the file diff generator', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should generate two arrays', async () => {
    const oldFilePath =
      './test/fixtures/test-csvs/update-diff/mealserved-ingested.data.csv';
    const newFilePath =
      './test/fixtures/test-csvs/update-diff/mealserved-update.data.csv';
    const grammarFilePath =
      './test/fixtures/test-csvs/update-diff/mealserved-event.grammar.csv';
    const data = await getDataDifference(
      oldFilePath,
      newFilePath,
      grammarFilePath,
      './test/fixtures/test-csvs/update-diff',
    );
    // console.log(data);
    expect(data).toBeDefined(); //
    const res = ['district_id,total_meals_served', '202,1', '202,-2'];
    // expect(data).toEqual({
    //   toBeDeleted: ['202,2'],
    //   toBeInserted: ['202,1'],
    // });
    expect(data).toEqual(res);
  });
});
