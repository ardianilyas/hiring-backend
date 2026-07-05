export const APPLICATION_SUCCESS_MESSAGE = "Application fetched successfully";
export const APPLICATION_NOT_FOUND = "Application not found";
export const APPLICATION_DELETED = "Application deleted successfully";

export const APPLICATION_ROUTE_TEST = {
  GET_APPLICATIONS: "/api/applications",
  GET_APPLICATION: (id: string) => `/api/applications/${id}`,
  CREATE_APPLICATION: "/api/applications",
}
