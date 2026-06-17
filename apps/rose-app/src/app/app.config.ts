import { importProvidersFrom, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { providePrimeNG } from "primeng/config";
import { ApplicationConfig } from "@angular/core";
import Aura from "@primeuix/themes/aura";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader, provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideMsrAuth } from "msr-auth";
import { environment } from "../../../environment/baseurl.dev";
import { headerInterceptor } from "./core/interceptors/header/header-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([headerInterceptor])),
    provideRouter(appRoutes),
    provideMsrAuth({
      baseUrl: environment.baseApiUrl,
      endpoints: {
        login: "auth/login",
      },
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: ".dark-mode",
          cssLayer: false,
        },
      },
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateHttpLoader,
        },
      }),
    ),
    provideTranslateHttpLoader({
      prefix: "./i18n/",
      suffix: ".json",
    }),
  ],
};
