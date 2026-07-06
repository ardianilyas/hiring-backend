import { desc, eq } from "drizzle-orm";
import { db } from "../../shared/db";
import { applications } from "../../shared/db/schemas";
import { NotFoundError } from "../../shared/errors/not-found";
import type { CreateApplicationDto, UpdateApplicationStatusDto } from "./application.dto";
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

  async getMyApplications(userId: string) {
    return await db.query.applications.findMany({
      where: eq(applications.userId, userId),
      orderBy: [desc(applications.createdAt)],
      with: {
        jobOpening: true,
      }
    });
  }

  async updateApplicationStatus(id: string, data: UpdateApplicationStatusDto) {
    const [application] = await db.update(applications)
      .set({
        status: data.status,
        feedback: data.feedback,
      })
      .where(eq(applications.id, id))
      .returning();

    if(!application) {
      throw new NotFoundError(APPLICATION_NOT_FOUND);
    }

    return application;
  }
}