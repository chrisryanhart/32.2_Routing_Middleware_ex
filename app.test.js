process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app.js');
let items = require('./fakeDb.js');

// {"name": "fudgesicle", "price": 1.00}

describe('GET /items/:name', ()=>{
    test('Get specifc item',async ()=>{
        let resp = await request(app).get("/items/cheerios");

        // {'name': 'cheerios', 'price': 3.40}

        // expect(1+1).toEqual(2);
        expect(resp.body).toEqual({'name': 'cheerios', 'price': 3.4});
    });

    test('Returns 404 when item not found', async ()=>{
        const resp = await request(app).get("/items/bogus");

        expect(resp.statusCode).toEqual(404);
    });
});

describe('GET /items', ()=>{
    test('Get all items',async ()=>{
        let resp = await request(app).get("/items");

        // expect(1+1).toEqual(2);
        expect(resp.body).toContainEqual(items[0]);
    });
});

describe('POST /items', ()=>{
    test('Post new item',async ()=>{
        let resp = await await request(app)
        .post("/items")
        .send({"name": "coke", "price": 1.00});
        expect(resp.body).toEqual({added:{name: "coke", price: 1}});
    });

});




describe('Patch /items/:name', ()=>{
    test('Update specifc item',async ()=>{
        let resp = await request(app)
        .patch("/items/cheerios")
        .send({"name":"chips","price": 3});

        expect(resp.body).toEqual({"updated":{"name":"chips","price": 3}});
    });
    test('Returns 404 when item not found', async ()=>{
        const resp = await (await request(app)
        .patch("/items/bogus")
        .send({"name":"chips","price": 3}));

        expect(resp.statusCode).toEqual(404);
    })
});

describe('Delete /items/:name', ()=>{
    test('Delete specifc item',async ()=>{
        let resp = await request(app)
        .delete("/items/popsicle");

        expect(resp.body).toEqual({message: "Deleted"});
    });
});