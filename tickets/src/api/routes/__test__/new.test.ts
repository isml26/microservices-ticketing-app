import request from 'supertest';
import { app } from '../../../app';

it('has a route handler listening to /api/tickets for pot request',async()=>{
    const response = await request(app)
    .post('/api/tickets')
    .send({});
    expect(response.status).not.toEqual(404); 
});

it('can only be accessed if the user is signed in ',async()=>{
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', (await global.signin()).toString())
      .send({});

    expect(response.status).not.toEqual(401);
  });

it('returns an error if invalid title is provided',async()=>{
    await request(app)
    .post('api/tickets')
    .set('Cookie',(await global.signin()).toString())
    .send({
      price:10,
    })
    .expect(400);
});

it('returns an error if price is provided',async()=>{
  await request(app)
  .post('api/tickets')
  .set('Cookie',(await global.signin()).toString())
  .send({
    title:'dsad',
    price:-10,
  })
  .expect(400);
  await request(app)
  .post('api/tickets')
  .set('Cookie',(await global.signin()).toString())
  .send({
    title:'asdas',
  })
  .expect(400);
});

it('creates a ticket with valid inputs',async()=>{
    
});
