import request from "supertest";
import app from "../../src/server";
import { db } from "../../src/shared/db";
import * as schema from "../../src/shared/db/schemas";
import { eq } from "drizzle-orm";
import type { UserRole } from "../../src/shared/constants/auth.constants";

export async function authenticate(role: UserRole = "user", email: string = `test-${Date.now()}-${Math.random()}@example.com`) {
  const agent = request.agent(app)

  const user = {
    name: "Test User",
    email,
    password: "password123"
  }

  await agent
    .post("/api/auth/sign-up/email")
    .send(user)

  await db.update(schema.user).set({ role }).where(eq(schema.user.email, user.email))

  await agent
    .post("/api/auth/sign-in/email")
    .send({
      email: user.email,
      password: user.password
    })

  return {
    user,
    agent
  }
}