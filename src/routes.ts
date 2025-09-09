// rute yang bisa diakses orang publik
export const publicRoutes = ["/", "/auth/new-verification"];

export const authRoutes = [
  "/auth/login",
  "/auth/register/mahasiswa",
  "/auth/register/dosen",
  "/auth/register/success",
  "/auth/reset-password",
  "/auth/reset-password/success",
  "/auth/new-password",
  "/auth/new-password/success",
];

export const apiAuthPrefix = "/api/auth";
export const dashboardPrefix = "/dashboard";
