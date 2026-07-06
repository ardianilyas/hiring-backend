import { desc, eq, and, ilike, count } from "drizzle-orm";
import { db } from "../../shared/db";
import { jobOpenings } from "../../shared/db/schemas";
import { NotFoundError } from "../../shared/errors/not-found";
import type { CreateJobOpeningDto, UpdateJobOpeningDto, GetJobOpeningsQueryDto } from "./job-opening.dto";
import { JOB_OPENING_NOT_FOUND } from "./job-opening.constant";
import { createPaginatedResponse } from "../../shared/utils/pagination";

export class JobOpeningService {
  async getJobOpenings(query: GetJobOpeningsQueryDto, baseUrl: string) {
    const { page, limit, search, departmentId, location, employmentType } = query;

    const whereClause = and(
      search ? ilike(jobOpenings.title, `%${search}%`) : undefined,
      departmentId ? eq(jobOpenings.departmentId, departmentId) : undefined,
      location ? ilike(jobOpenings.location, `%${location}%`) : undefined,
      employmentType ? eq(jobOpenings.employmentType, employmentType) : undefined
    );

    const [totalCountResult] = await db
      .select({ value: count() })
      .from(jobOpenings)
      .where(whereClause);
      
    const total = totalCountResult.value;

    const data = await db.query.jobOpenings.findMany({
      where: whereClause,
      orderBy: [desc(jobOpenings.createdAt)],
      limit,
      offset: (page - 1) * limit,
      with: {
        department: true
      }
    });

    return createPaginatedResponse(data, total, page, limit, baseUrl, query);
  }

  async getJobOpening(id: string) {
    const [jobOpening] = await db.query.jobOpenings.findMany({
      where: eq(jobOpenings.id, id),
      with: {
        department: true,
      }
    });

    if(!jobOpening) {
      throw new NotFoundError(JOB_OPENING_NOT_FOUND);
    }

    return jobOpening;
  }

  async createJobOpening(data: CreateJobOpeningDto) {
    const [jobOpening] = await db.insert(jobOpenings).values(data).returning();

    return jobOpening;
  }

  async updateJobOpening(id: string, data: UpdateJobOpeningDto) {
    const [jobOpening] = await db.update(jobOpenings).set(data).where(eq(jobOpenings.id, id)).returning();

    if(!jobOpening) {
      throw new NotFoundError(JOB_OPENING_NOT_FOUND);
    }

    return jobOpening;
  }

  async deleteJobOpening(id: string) {
    const [jobOpening] = await db.delete(jobOpenings).where(eq(jobOpenings.id, id)).returning();

    if(!jobOpening) {
      throw new NotFoundError(JOB_OPENING_NOT_FOUND);
    }

    return true;;
  }
}
