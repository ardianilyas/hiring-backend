export const JOB_OPENING_NOT_FOUND = "Job opening not found";

export const JOB_OPENING_DTO_VALIDATION_MESSAGE = {
  GET_JOB_OPENING: {
    id: {
      uuid: "Id should be uuid",
    },
  },
  CREATE_JOB_OPENING: {
    departmentId: {
      required: "Department id is required",
    },
    title: {
      required: "Title is required",
    },
    description: {
      required: "Description is required",
    },
    location: {
      required: "Location is required",
    },
    employmentType: {
      enum: "Please select a valid employment type",
    },
    isActive: {
      boolean: "Is active is required",
    },
  },
  UPDATE_JOB_OPENING: {
    id: {
      uuid: "Id should be uuid",
    },
  },
}

export const JOB_OPENING_SUCCESS_MESSAGE = {
  GET_JOB_OPENINGS: "Job openings fetched successfully",
  GET_JOB_OPENING: "Job opening fetched successfully",
  CREATE_JOB_OPENING: "Job opening created successfully",
  UPDATE_JOB_OPENING: "Job opening updated successfully",
  DELETE_JOB_OPENING: "Job opening deleted successfully",
}

export const JOB_OPENING_ROUTE = {
  GET_JOB_OPENINGS: "/",
  GET_JOB_OPENING: "/:id",
  CREATE_JOB_OPENING: "/",
  UPDATE_JOB_OPENING: "/:id",
  DELETE_JOB_OPENING: "/:id",
}

export const JOB_OPENING_ROUTE_TEST = {
  GET_JOB_OPENINGS: "/api/job-openings",
  CREATE_JOB_OPENING: "/api/job-openings",
  GET_JOB_OPENING: (id: string) => `/api/job-openings/${id}`,
  UPDATE_JOB_OPENING: (id: string) => `/api/job-openings/${id}`,
  DELETE_JOB_OPENING: (id: string) => `/api/job-openings/${id}`,
}
