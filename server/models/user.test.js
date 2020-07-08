const assert = require('assert'); 
const request = require('supertest');
const Users = require("./users");
const app = require('../app');

Users.init();

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe('idIdInDB Test', () => {
  it('find exsited user', () => {
    console.log(Users.users);
    expect(Users.isIdInDB('auddn6676')).toBe(true);
  });
  it('find not existed user', function () {
    expect(Users.isIdInDB('auddn667')).toBe(false);
  });
  it('empty string', function () {
    expect(Users.isIdInDB('')).toBe(false);
  });
  it('param is number', function () {
    expect(Users.isIdInDB(22)).toBe(false);
  });
  it('null type', function () {
    expect(Users.isIdInDB(null)).toBe(false);
  });
  it('undefined type', function () {
    expect(Users.isIdInDB(undefined)).toBe(false);
  });
});

describe('get getByIdPw', function () {
  it('find existed user', function () {
    const user = {
      id: 'auddn6676',
      pw: '12345'
    }
    expect(Users.getByIdPw(user)).toMatchObject(user);
  })
  it('find not existed user', function () {
    const user = {
      id: 'auddn667',
      pw: '12345'
    }
    expect(Users.getByIdPw(user)).toBeUndefined();
  })
  it('user is empty object', function () {
    const user = {};
    expect(Users.getByIdPw(user)).toBeUndefined();
  })
})

describe('test login request', () => {
  it('should success login', async () => {
    const user = {
      id: 'auddn6676',
      pw: '12345'
    }
    const res = await request(app)
      .post('/users/login')
      .send(user)
    expect(res.statusCode).toEqual(200)
  });
  it('should not success login', async () => {
    const user = {
      id: 'auddn667',
      pw: '12345'
    }
    const res = await request(app)
      .post('/users/login')
      .send(user)
    expect(res.statusCode).toEqual(404)
  });
  it("don't have id & pw property", async () => {
    const user = {};
    const res = await request(app)
      .post('/users/login')
      .send(user)
    expect(res.statusCode).toEqual(404)
  });
  it("param is undefined", async () => {
    const user = undefined;
    const res = await request(app)
      .post('/users/login')
      .send(user)
    expect(res.statusCode).toEqual(404)
  });
  it("param is null", async () => {
    const user = null;
    const res = await request(app)
      .post('/users/login')
      .send(user)
    expect(res.statusCode).toEqual(404)
  });
})