import { ApplicationService } from "../../feature/application/application.service";
import { db } from "../db";
import { user } from "../db/schemas";
import { createTestJobOpening } from "./job-opening.factory";

export async function createTestApplication() {
  const applicationService = new ApplicationService();
  const userData = await db.select({ id: user.id }).from(user).limit(1)

  if(!userData[0]) {
    throw new Error("Failed to get user id");
  }

  const jobOpening = await createTestJobOpening();

  if(!jobOpening) {
    throw new Error("Failed to create job opening");
  }

  return await applicationService.createApplication(userData[0]?.id, {
    jobOpeningId: jobOpening.id,
    coverLetter: "test-cover-letter",
    resume: "test-resume"
  });
}