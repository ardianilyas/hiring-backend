import { desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { jobOpenings } from "../../db/schemas";
import { NotFoundError } from "../../errors/not-found";
import type { CreateJobOpeningDto, UpdateJobOpeningDto } from "./job-opening.dto";
import { JOB_OPENING_NOT_FOUND } from "./job-opening.constant";

export class JobOpeningService {
  async getJobOpenings() {
    return await db.query.jobOpenings.findMany({
      orderBy: [desc(jobOpenings.createdAt)],
      with: {
        department: true
      }
    })
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

    return jobOpening;
  }
}
