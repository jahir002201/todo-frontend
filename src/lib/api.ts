const API_URL =
  process.env.PUBLIC_API_URL ||
  "https://fastapi-todo-api-p4ao.onrender.com";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
}

export interface TodoCreate {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const data = await response.json();

      if (data.detail) {
        message = data.detail;
      } else if (typeof data === "object") {
        message = Object.values(data).flat().join(" ");
      }
    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/* =========================
   AUTH
========================= */

export async function register(data: {
  username: string;
  password: string;
  email?: string;
}) {
  return request<User>("/auth/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(
  username: string,
  password: string
): Promise<TokenResponse> {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(
    `${API_URL}/auth/jwt/create`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Username or password is incorrect"
    );
  }

  return data;
}

export async function refreshToken(refresh: string) {
  return request<TokenResponse>(
    "/auth/jwt/refresh",
    {
      method: "POST",
      body: JSON.stringify({
        refresh_token: refresh,
      }),
    }
  );
}

export async function verifyToken(token: string) {
  return request("/auth/jwt/verify", {
    method: "POST",
    body: JSON.stringify({
      token,
    }),
  });
}

/* =========================
   USER
========================= */

export async function getMe(token: string) {
  console.log("ME TOKEN:", token);

  return request<User>("/auth/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateMe(
  token: string,
  data: Record<string, unknown>
) {
  return request<User>("/auth/users/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteMe(token: string) {
  return request<void>("/auth/users/me", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/* =========================
   TODOS
========================= */

export async function getTodos(token: string) {
  console.log("TODO TOKEN:", token);

  return request<Todo[]>("/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTodo(token: string, id: number) {
  return request<Todo>(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createTodo(
  token: string,
  data: TodoCreate
) {
  return request<Todo>("/todos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function updateTodo(
  token: string,
  id: number,
  data: TodoUpdate
) {
  return request<Todo>(`/todos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTodo(token: string, id: number) {
  return request<void>(`/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}