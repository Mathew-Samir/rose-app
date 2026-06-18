import { importProvidersFrom, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import { ApplicationConfig } from "@angular/core";
import Aura from "@primeuix/themes/aura";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader, provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideMsrAuth } from "msr-auth";
import { environment } from "../../../environment/baseurl.dev";
import { headerInterceptor } from "./core/interceptors/header/header-interceptor";
import { apiResponseInterceptor } from "./core/interceptors/api-response/api-response-interceptor";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor, apiResponseInterceptor])
    ),
    MessageService,
    importProvidersFrom(ToastModule),
    provideAnimationsAsync(),
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
