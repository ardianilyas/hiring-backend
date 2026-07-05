import { desc, eq } from "drizzle-orm";
import { db } from "../../shared/db";
import { applications } from "../../shared/db/schemas";
import { NotFoundError } from "../../shared/errors/not-found";
import type { CreateApplicationDto } from "./application.dto";
import { APPLICATION_NOT_FOUND } from "./application.constant";

export class ApplicationService {
  async getApplications() {
    return await db.query.applications.findMany({
      orderBy: [desc(applications.createdAt)],
      with: {
        user: true,
      }
    })
  }

  async getApplication(id: string) {
    const [application] = await db.query.applications.findMany({
      where: eq(applications.id, id),
      with: {
        user: true,
      }
    });

    if(!application) {
      throw new NotFoundError(APPLICATION_NOT_FOUND);
    }

    return application;
  }

  async createApplication(userId: string, data: CreateApplicationDto) {
    const [application] = await db.insert(applications).values({
      ...data,
      userId,
    }).returning();

    return application;
  }
}