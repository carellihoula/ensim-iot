import { userSchema } from "@/components/types/UserSchema";
import { User } from "@/components/types/UserTypes";

export const registerUser = async (formData: User) => {
  // Validate user data
  const validation = userSchema.safeParse(formData);
  if (!validation.success) {
    throw new Error(
      validation.error.errors.map((err) => err.message).join(", ")
    );
  }

  // Send request to backend
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

export const fetchUserData = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_API_URL}/users/${userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
