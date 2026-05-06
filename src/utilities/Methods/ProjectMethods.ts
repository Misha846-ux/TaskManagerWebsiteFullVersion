const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

const getTokenPayload = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

const getUserIdFromToken = () => {
  const payload = getTokenPayload();
  if (!payload) return null;
  return (
    Number(payload.nameid) ||
    Number(payload.sub) ||
    Number(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
  );
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const text = await response.text();
    const message = text || response.statusText;
    throw new Error(`Error ${response.status}: ${message}`);
  }

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export async function GetProjects(companyId?: number) {
  const id = companyId ?? Number(localStorage.getItem("companyId"));
  if (!id || Number.isNaN(id)) {
    throw new Error("Company ID is required to fetch projects.");
  }

  const response = await fetch(`${API_URL}/projects/by-company/${id}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetAllProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetProjectsPagination(count: number, side: number) {
  const response = await fetch(`${API_URL}/projects/filtered?count=${count}&side=${side}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetProjectById(projectId: string | number) {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetProjectByName(name: string) {
  const response = await fetch(`${API_URL}/projects/by-name/${encodeURIComponent(name)}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetProject(projectId: string | number) {
  const response = await fetch(`${API_URL}/projects/my/${projectId}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetMyProjectByName(name: string) {
  const response = await fetch(`${API_URL}/projects/my/by-name/${encodeURIComponent(name)}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetProjectsByCompanyPagination(companyId: number, count: number, side: number) {
  const response = await fetch(`${API_URL}/projects/by-company/${companyId}/filtered?count=${count}&side=${side}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetUserProjects() {
  const response = await fetch(`${API_URL}/projects/my-projects`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetUserProjectsPagination(count: number, side: number) {
  const response = await fetch(`${API_URL}/projects/my-projects/filtered?count=${count}&side=${side}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function CreateProject(data: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const result = await handleResponse(response);

  const createdId = result && typeof result === "object" ? Number((result as any).id) : NaN;
  const userId = getUserIdFromToken();

  if (!Number.isNaN(createdId) && userId) {
    try {
      await AddUserToProject(createdId, userId);
    } catch (err) {
      console.warn("Could not add creator to project:", err);
    }
  }

  return result;
}

export async function GetProjectUsers(projectId: string | number) {
  const response = await fetch(`${API_URL}/projects/${projectId}/users`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function AddUserToProject(projectId: string | number, userId: string | number) {
  const response = await fetch(`${API_URL}/projects/my/${projectId}/users/${userId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function AddUserToProjectAdmin(projectId: string | number, userId: string | number) {
  const response = await fetch(`${API_URL}/projects/${projectId}/users/${userId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function RemoveUserFromProject(projectId: string | number, userId: string | number) {
  const response = await fetch(`${API_URL}/projects/my/${projectId}/users/${userId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function RemoveUserFromProjectAdmin(projectId: string | number, userId: string | number) {
  const response = await fetch(`${API_URL}/projects/${projectId}/users/${userId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function UpdateProject(projectId: string | number, data: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/projects/my/${projectId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
}

export async function UpdateProjectAdmin(projectId: string | number, data: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function DeleteProject(projectId: string | number) {
  const response = await fetch(`${API_URL}/projects/my/${projectId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function DeleteProjectAdmin(projectId: string | number) {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}
