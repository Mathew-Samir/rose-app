import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "auth-layout/login",
    pathMatch: "full",
  },
  {
    path: "auth-layout",
    loadComponent: () =>
      import("./features/layouts/auth-layout/auth-layout").then((m) => m.AuthLayout),
    title: "Auth Layout",
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./features/layouts/auth-layout/components/login/login").then((m) => m.Login),
        title: "Login",
      },
      {
        path: "register",
        loadComponent: () =>
          import("./features/layouts/auth-layout/components/register/register").then(
            (m) => m.Register,
          ),
        title: "Register",
      },
      {
        path: "reset-password",
        loadComponent: () =>
          import("./features/layouts/auth-layout/components/reset-password/reset-password").then(
            (m) => m.ResetPassword,
          ),
        title: "Reset Password",
      },
      {
        path: "reset-password/new-password",
        loadComponent: () =>
          import(
            "./features/layouts/auth-layout/components/reset-password/components/new-password/new-password"
          ).then((m) => m.NewPassword),
        title: "New Password",
      },
    ],
  },
  {
    path: "**",
    loadComponent: () => import("./features/pages/not-found/not-found").then((m) => m.NotFound),
    title: "Not Found",
  },
];
