// src/lib/api.ts

export type AuthResponse = {
    id: number;
    email: string;
  };
  
  async function handleResponse(response: Response): Promise<AuthResponse> {
    const contentType = response.headers.get("content-type");
  
    if (!response.ok) {
      let errorMessage = "Unknown error";
      try {
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
      } catch (_) {}
  
      throw new Error(errorMessage);
    }
  
    if (contentType?.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Invalid server response");
    }
  }
  
  export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    return handleResponse(response);
  }
  
  export async function register(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    return handleResponse(response);
  }
  