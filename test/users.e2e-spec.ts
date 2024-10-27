import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
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

  const userData = {
    username: 'alepontes',
    password: 'abc123',
    birthdate: '1999-06-28',
  };

  it('/users/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/signup')
      .send(userData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(Object.keys(res.body)).toHaveLength(1);
        expect(Object.keys(res.body)).toEqual(['id']);
      });
  });

  it('/users/signin (POST)', async () => {
    await request(app.getHttpServer())
      .post('/users/signup')
      .send(userData)
      .expect(201);

    return request(app.getHttpServer())
      .post('/users/signin')
      .send({
        username: userData.username,
        password: userData.password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('expiresIn');
        expect(Object.keys(res.body)).toHaveLength(2);
        expect(new Date(res.body.expiresIn).getDate()).toBeGreaterThan(0);
      });
  });

  it('/users (GET)', async () => {
    await request(app.getHttpServer())
      .post('/users/signup')
      .send(userData)
      .expect(201);

    const signin = await request(app.getHttpServer())
      .post('/users/signin')
      .send({
        username: userData.username,
        password: userData.password,
      })
      .expect(200);

    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${signin.body.token}`)
      .expect(200)
      .expect((res) => {
        const user = res.body.find(
          (user) => user.username === userData.username,
        );

        expect(user).toBeDefined();
        expect(user).not.toHaveProperty('password');
        expect(user).toHaveProperty('username', user.username);
        expect(user).toHaveProperty('birthdate', user.birthdate);
        expect(user).toHaveProperty('balance', user.balance);
        expect(user).toHaveProperty('id');
      });
  });
});
