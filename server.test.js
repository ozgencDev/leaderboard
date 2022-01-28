const _ = require("lodash");
const axios = require("axios");

const arr = [
  "tmaccart6a",
  "tgopsell7o",
  "sbarringer5g",
  "rsauratgn",
  "mchamberlenac",
  "mcamocken9",
  "eflippen8d",
  "ecawoodb5",
  "cmccumskay2u",
  "bhawsonok",
];

describe("Play game", () => {
  test("100 coins", async () => {
    const random = _.random(0, arr.length - 1);
    const response = await axios.post(
      `https://panteon-backend.herokuapp.com/play/add/${arr[random]}/100`
    );

    expect(response.status).toBe(200);
  });
  test("200 coins", async () => {
    const random = _.random(0, arr.length - 1);
    const response = await axios.post(
      `https://panteon-backend.herokuapp.com/play/add/${arr[random]}/200`
    );

    expect(response.status).toBe(200);
  });
  test("300 coins", async () => {
    const random = _.random(0, arr.length - 1);
    const response = await axios.post(
      `https://panteon-backend.herokuapp.com/play/add/${arr[random]}/300`
    );

    expect(response.status).toBe(200);
  });
  test("100 coins", async () => {
    const random = _.random(0, arr.length - 1);
    const response = await axios.post(
      `https://panteon-backend.herokuapp.com/play/add/${arr[random]}/100`
    );
    console.log(response);
    expect(response.status).toBe(200);
  });
  test("200 coins", async () => {
    const random = _.random(0, arr.length - 1);
    const response = await axios.post(
      `https://panteon-backend.herokuapp.com/play/add/${arr[random]}/200`
    );

    expect(response.status).toBe(200);
  });
  test("1000 coins", async () => {
    const response = await axios.post(
      `https://panteon-backend.herokuapp.com/play/add/mspillett3/1000`
    );

    expect(response.status).toBe(200);
  });
});
