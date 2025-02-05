const request = require("supertest");
const app = require("../server");
const pool = require("../database/db");

jest.mock("../database/db"); // Mock the database connection
pool.end = jest.fn(); // Mock pool.end() to prevent errors

describe("Orders API", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error in tests
  });

  afterAll(async () => {
    await pool.end(); // Close DB connection after tests
  });

  test("GET /orders should return all orders", async () => {
    const mockOrders = { rows: [{ orderID: 1, catalogID: "ABC123" }] };
    pool.query.mockResolvedValue(mockOrders);

    const response = await request(app).get("/orders");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrders.rows);
  });

  test("GET /orders should handle database errors", async () => {
    pool.query.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/orders");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch orders" });
  });

  test("POST /orders/:catalogID should create an order when catalogID exists", async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 }); // Mock catalog check
    pool.query.mockResolvedValueOnce({}); // Mock order creation

    const response = await request(app).post("/orders/ABC123");

    expect(response.status).toBe(201);
    expect(response.text).toBe("Order created successfully");
  });

  test("POST /orders/:catalogID should handle non-existent catalogID", async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0 }); // Mock catalog check

    const response = await request(app).post("/orders/ABC123");

    expect(response.status).toBe(404);
    expect(response.text).toBe("CatalogID not found/incorrect");
  });

  test("POST /orders/:catalogID should handle database errors", async () => {
    pool.query.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/orders/ABC123");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal Server Error");
  });
});







// const request = require("supertest");
// const app = require("../server");
// const pool = require("../database/db");

// jest.mock("../database/db"); // Mock the database connection
// pool.end = jest.fn(); // Mock pool.end() to prevent errors

// describe("Orders API", () => {
//   beforeAll(() => {
//     jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error in tests
//   });

//   afterAll(async () => {
//     await pool.end(); // Close DB connection after tests
//   });

//   test("GET /orders should return all orders", async () => {
//     const mockOrders = { rows: [{ orderID: 1, catalogID: "ABC123" }] };
//     pool.query.mockResolvedValue(mockOrders);

//     const response = await request(app).get("/orders");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(mockOrders.rows);
//     expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("SELECT orders.*, satellite_images.*"));
//   });

//   test("POST /orders/:catalogID should create an order if catalogID exists", async () => {
//     pool.query
//       .mockResolvedValueOnce({ rowCount: 1 }) // Mock catalogID exists
//       .mockResolvedValueOnce({}); // Mock order insert

//     const response = await request(app).post("/orders/ABC123");

//     expect(response.status).toBe(201);
//     expect(response.text).toBe("Order created successfully");
//     expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO orders"));
//   });

//   test("POST /orders/:catalogID should return 500 on database error", async () => {
//     pool.query.mockRejectedValue(new Error("Database failure"));

//     const response = await request(app).post("/orders/ABC123");

//     expect(response.status).toBe(500);
//     expect(response.text).toBe("Internal Server Error");
//   });
// });
