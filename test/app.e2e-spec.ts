import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';

import { User } from '@user/user.entity';
import { getConnection, Repository } from 'typeorm';

describe('App', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  let accessToken: string;
  let refreshToken: string;

  const testId = 'test@test.com';
  const testPwd = '1234';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = getConnection().getRepository(User);
  });

  afterAll(async () => {
    userRepository.delete({ us_id: testId });
    app.close();
  });

  describe('AppController', () => {
    it('메인화면 (Get:/)', async () => {
      return await request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('AnnualCheck-API');
    });
  });

  describe('UserController', () => {
    it('회원가입 (Post:/v1/user)', async () => {
      return await request(app.getHttpServer())
        .post('/v1/user')
        .set('key', '1234')
        .send({
          id: testId,
          pwd: testPwd,
          nick: 'test',
        })
        .expect(201);
    });
  });

  describe('AuthController', () => {
    it('로그인 (Post:/v1/auth/sign)', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/auth/sign')
        .set('key', '1234')
        .send({
          id: testId,
          pwd: testPwd,
        })
        .expect(201);

      const { access_token, refresh_token } = response.body.data;

      accessToken = access_token;
      refreshToken = refresh_token;
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
    });

    it('로그인 체크 (Get:/v1/auth/sign)', async () => {
      return await request(app.getHttpServer())
        .get('/v1/auth/sign')
        .set('key', '1234')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('토큰 재발급 (Post:/v1/auth/sign/new)', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/auth/sign/new')
        .set('key', '1234')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(201);

      const { access_token } = response.body.data;
      expect(access_token).toBeDefined();
    });
  });
});
