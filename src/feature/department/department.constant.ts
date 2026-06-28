export const DEPARTMENT_NOT_FOUND = "Department not found";

export const DEPARTMENT_DTO_VALIDATION_MESSAGE = {
  GET_DEPARTMENT: {
    id: {
      uuid: "Id should be uuid",
    },
  },
  CREATE_DEPARTMENT: {
    name: {
      required: "Name is required",
    },
    description: {
      required: "Description is required",
    },
    isActive: {
      boolean: "Is Active should be boolean"
    }
  },
  UPDATE_DEPARTMENT: {
    id: {
      uuid: "Id should be uuid",
    },
  }
}

export const DEPARTMENT_SUCCESS_MESSAGE = {
  GET_DEPARTMENTS: "Departments fetched successfully",
  GET_DEPARTMENT: "Department fetched successfully",
  CREATE_DEPARTMENT: "Department created successfully",
  UPDATE_DEPARTMENT: "Department updated successfully",
  DELETE_DEPARTMENT: "Department deleted successfully",
}

export const DEPARTMENT_ROUTE = {
  GET_DEPARTMENTS: "/",
  CREATE_DEPARTMENT: "/",
  GET_DEPARTMENT: "/:id",
  UPDATE_DEPARTMENT: "/:id",
  DELETE_DEPARTMENT: "/:id",
}

export const DEPARTMENT_ROUTE_TEST = {
  GET_DEPARTMENTS: "/api/departments",
  CREATE_DEPARTMENT: "/api/departments",
  GET_DEPARTMENT: (id: string) => `/api/departments/${id}`,
  UPDATE_DEPARTMENT: (id: string) => `/api/departments/${id}`,
  DELETE_DEPARTMENT: (id: string) => `/api/departments/${id}`,
}