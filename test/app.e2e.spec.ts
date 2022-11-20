import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { seed } from './setup';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await seed();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jobs (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/jobs?paid=0')
      .set('profile_id', '2')
      .expect(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ContractId: 3,
          description: 'work',
          id: 3,
          paid: false,
          paymentDate: null,
          price: 202,
        }),
        expect.objectContaining({
          ContractId: 4,
          description: 'work',
          id: 4,
          paid: false,
          paymentDate: null,
          price: 200,
        }),
      ]),
    );
  });
  it('/jobs/:id/pay (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/jobs/1/pay')
      .send({})
      .set('profile_id', '1')
      .expect(201);

    expect(res.body).toMatchObject({
      ContractId: 1,
      contract: {
        ClientId: 1,
        ContractorId: 5,
        client: {
          balance: 950,
          firstName: 'Harry',
          id: 1,
          lastName: 'Potter',
          profession: 'Wizard',
          type: 'client',
        },
        contractor: {
          balance: 264,
          firstName: 'John',
          id: 5,
          lastName: 'Lenon',
          profession: 'Musician',
          type: 'contractor',
        },
        id: 1,
        status: 'terminated',
        terms: 'bla bla bla',
      },
      description: 'work',
      id: 1,
      paid: true,
      price: 200,
    });
  });
});
