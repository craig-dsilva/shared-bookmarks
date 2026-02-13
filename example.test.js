import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { setData, getData } from "./storage.js";

global.localStorage = {
  getItem(key) {
    return this._data[key] ?? null;
  },
  setItem(key, value) {
    this._data[key] = String(value);
  },
  clear() {
    this._data = {};
  },
};

describe("setData", () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  it("should set data for a specific user", async function () {
    const userId = "1";
    const bookmark = { url: "https://test.com", title: "Test" };
    await setData(userId, { id: userId, data: [bookmark] });
    const storedData = await getData(userId);
    assert.deepStrictEqual(storedData, { id: userId, data: [bookmark] });
  });
});
