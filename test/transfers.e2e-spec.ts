import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import * as request from 'supertest';

describe('TransfersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importa o módulo principal da aplicação
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();
  });

  const baseUser = {
    username: 'user',
    password: 'abc123',
    birthdate: '1999-06-28',
  };

  const createUsers = async (): Promise<{ [key: string]: { id: number } }> => {
    const user1Promise = request(app.getHttpServer())
      .post('/users/signup')
      .send({
        ...baseUser,
        username: 'user-1',
      })
      .expect(201);

    const user2Promise = request(app.getHttpServer())
      .post('/users/signup')
      .send({
        ...baseUser,
        username: 'user-2',
      })
      .expect(201);

    const [user1, user2] = await Promise.all([user1Promise, user2Promise]);

    return {
      user1: user1.body,
      user2: user2.body,
    };
  };

  const signin = async (username: string, password: string): Promise<{ token: string; expiresIn: string }> => {
    const result = await request(app.getHttpServer())
      .post('/users/signin')
      .send({
        username,
        password,
      })
      .expect(200);

    return result.body;
  };

  const listUsers = async (
    token: string,
  ): Promise<
    Array<{
      id: number;
      username: string;
      birthdate: string;
      balance: number;
    }>
  > => {
    const result = await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`).expect(200);

    return result.body;
  };

  it('/transfer (POST)', async () => {
    const { user1, user2 } = await createUsers();

    const { token } = await signin('user-1', baseUser.password);

    const usersList = await listUsers(token);

    const trasnferValue = 10;

    const user1BeforeTransfer = usersList.find((user) => user.id === user1.id);
    const user2BeforeTransfer = usersList.find((user) => user.id === user2.id);

    await request(app.getHttpServer())
      .post('/transfer')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fromId: user1.id,
        toId: user2.id,
        amount: trasnferValue,
      })
      .expect(204)
      .expect(async () => {
        const usersList = await listUsers(token);

        const user1AfterTransfer = usersList.find((user) => user.id === user1.id);
        const user2AfterTransfer = usersList.find((user) => user.id === user2.id);

        expect(user1AfterTransfer.balance).toEqual(user1BeforeTransfer.balance - trasnferValue);
        expect(user2AfterTransfer.balance).toEqual(user2BeforeTransfer.balance + trasnferValue);
      });
  });
});
