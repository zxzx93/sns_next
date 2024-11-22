"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

// 폼 필드 유효성 검사 함수
const validateFormField = (
  formData: FormData,
  fieldName: string,
  message: string
) => {
  const value = formData.get(fieldName);
  if (!value || !(value as string)?.trim()) {
    return { isValid: false, message };
  }
  return { isValid: true, message: null };
};

const handleFormSubmit = async (prevState: any, formData: FormData) => {
  // 필수 필드 유효성 검사
  const validations = [
    validateFormField(formData, "id", "no_id"),
    validateFormField(formData, "name", "no_name"),
    validateFormField(formData, "password", "no_password"),
  ];

  for (const validation of validations) {
    if (!validation.isValid) {
      return { message: validation.message };
    }
  }

  // 이미지 필드 별도 검사
  if (!formData.get("image")) {
    return { message: "no_image" };
  }

  // API 호출 로직
  const apiResponse = await createUser(formData);
  if (apiResponse.status === "error") {
    return { message: apiResponse.message };
  }

  // 사용자 로그인 처리
  await signIn("credentials", {
    username: formData.get("id"),
    password: formData.get("password"),
    redirect: false,
  });

  // 성공 시 홈으로 리디렉션
  redirect("/home");
};

// API 호출 로직을 별도의 함수로 분리
const createUser = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    console.log(response.status);
    if (response.status === 403) {
      return { status: "error", message: "user_exists" };
    }

    console.log(await response.json());
    return { status: "success" };
  } catch (err) {
    console.error(err);
    return { status: "error", message: null };
  }
};

export default handleFormSubmit;
