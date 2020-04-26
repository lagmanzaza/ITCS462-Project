import * as Redis from "ioredis";

export default new Redis({
  port: 6379, // Redis port
  host: "redis", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "h7nVvFfG6F5U7SjmPmEWjDXHJrsjyUpq",
  db: 0,
});
