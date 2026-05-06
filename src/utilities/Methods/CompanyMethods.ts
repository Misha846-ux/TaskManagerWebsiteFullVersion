const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

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

export async function GetAllCompanies() {
  const response = await fetch(`${API_URL}/Company`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetCompaniesPagination(count: number, side: number) {
  const response = await fetch(`${API_URL}/Company/Filtred?count=${count}&side=${side}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetMyCompanies() {
  const response = await fetch(`${API_URL}/Company/MyCompanies`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetMyCompaniesPagination(count: number, side: number) {
  const response = await fetch(`${API_URL}/Company/Filtred/MyCompanies?count=${count}&side=${side}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetCompanyById(id: string | number) {
  const response = await fetch(`${API_URL}/Company/ById${id}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetMyCompanyById(id: string | number) {
  const response = await fetch(`${API_URL}/Company/MyCompanyById${id}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function GetCompanyUsers(companyId: string | number) {
  const response = await fetch(`${API_URL}/Company/Get/Users/${companyId}`, {
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function AddCompany(company: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/Company/AddCompany`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(company),
  });
  return handleResponse(response);
}

export async function DeleteCompanyByIdForAdmin(id: string | number) {
  const response = await fetch(`${API_URL}/Company/DeleteForAdmin${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function DeleteCompanyById(id: string | number) {
  const response = await fetch(`${API_URL}/Company/Delete${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(response);
}

export async function UpdateCompanyForAdmin(company: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/Company/UpdateForAdmin`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(company),
  });
  return handleResponse(response);
}

export async function UpdateUsersCompany(company: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/Company/Update`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(company),
  });
  return handleResponse(response);
}

export async function UpdateCompany(companyId: string | number, company: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/Company/UpdateCompany`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ ...company, Id: companyId }),
  });
  return handleResponse(response);
}
