import { desc, eq, count } from "drizzle-orm";
import { db } from "../../shared/db";
import { applications } from "../../shared/db/schemas";
import { NotFoundError } from "../../shared/errors/not-found";
import type { CreateApplicationDto, GetApplicationsQueryDto, UpdateApplicationStatusDto } from "./application.dto";
import { APPLICATION_NOT_FOUND } from "./application.constant";
import { createPaginatedResponse } from "../../shared/utils/pagination";

export class ApplicationService {
  async getApplications(query: GetApplicationsQueryDto, baseUrl: string) {
    const { page, limit } = query;

    const [totalCountResult] = await db
      .select({ value: count() })
      .from(applications);

    const total = totalCountResult.value;

    const data = await db.query.applications.findMany({
      orderBy: [desc(applications.createdAt)],
      limit,
      offset: (page - 1) * limit,
      with: {
        user: true,
        jobOpening: {
          columns: {
            title: true,
          }
        }
      }
    });

    return createPaginatedResponse(data, total, page, limit, baseUrl, query);
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