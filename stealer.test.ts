import test from "tape";
import { Stealer } from "./stealer";


test("Seen flag initialized to false", t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2, unref: true });
  stealer.set("test", {});
  t.false(stealer.keyValues.get("test")?.marked);
  t.end();
});

test("Seen flag is set to true by stealer", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  await new Promise(r => setTimeout(r, 1000));
  t.true(stealer.keyValues.get("test")?.marked);
  stealer.destroy();
  t.end();
});

test("Value is stolen after ttl", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  await new Promise(r => setTimeout(r, 2500));
  t.false(stealer.keyValues.has("test"));
  stealer.destroy();
  t.end();
});

test("Get value from stealer", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  const value = {};
  stealer.set("test", value);
  const v = stealer.get("test");
  t.equal(v, value);
  stealer.destroy();
  t.end();
});

test("Get unmark value", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  await new Promise(r => setTimeout(r, 1000));
  const v = stealer.get("test");
  t.false(stealer.keyValues.get("test")?.marked);
  stealer.destroy();
  t.end();
});

test("Get return undefined after ttl", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  await new Promise(r => setTimeout(r, 2500));
  t.false(stealer.get("test"));
  stealer.destroy();
  t.end();
});

test("Check value existence returns true", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  t.true(stealer.has("test"));
  stealer.destroy();
  t.end();
});

test("Check value existence unmark value", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  await new Promise(r => setTimeout(r, 1000));
  stealer.has("test");
  t.false(stealer.keyValues.get("test")?.marked);
  stealer.destroy();
  t.end();
});

test("Check value existence returns false after ttl", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  await new Promise(r => setTimeout(r, 2500));
  t.false(stealer.has("test"));
  stealer.destroy();
  t.end();
});

test("Delete an item from stealer", async t => {
  const stealer = new Stealer<string, unknown>({ ttl: 2 });
  stealer.set("test", {});
  stealer.delete("test");
  t.false(stealer.has("test"));
  stealer.destroy();
  t.end();
});
