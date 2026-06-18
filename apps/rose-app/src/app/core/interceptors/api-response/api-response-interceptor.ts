import {
  HttpContextToken,
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { tap } from "rxjs";

/** Set a custom static message to override the API response message */
export const TOAST_MESSAGE = new HttpContextToken<string>(() => "");

/** Set to true to skip showing a toast for this request */
export const SKIP_TOAST = new HttpContextToken<boolean>(() => false);

let skipNext = false;
let nextCustomMessage: string | null = null;

export const toastControl = {
  skipNext() {
    skipNext = true;
  },
  setCustomMessage(msg: string) {
    nextCustomMessage = msg;
  },
  /** @internal */
  consumeSkip(): boolean {
    const val = skipNext;
    skipNext = false;
    return val;
  },
  /** @internal */
  consumeCustomMessage(): string | null {
    const val = nextCustomMessage;
    nextCustomMessage = null;
    return val;
  }
};

const MUTATING_METHODS = new Set(["POST", "PUT", "DELETE", "PATCH"]);

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const shouldSkip = req.context.get(SKIP_TOAST) || toastControl.consumeSkip();
  if (!MUTATING_METHODS.has(req.method) || shouldSkip) {
    toastControl.consumeCustomMessage();
    return next(req);
  }

  const messageService = inject(MessageService);
  const customMessage = req.context.get(TOAST_MESSAGE) || toastControl.consumeCustomMessage();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as { status?: boolean; message?: string } | null;
          const detail = customMessage || body?.message;

          if (!detail) {
            return;
          }

          const severity = body?.status ? "success" : "error";
          const summary = body?.status ? "Success" : "Error";

          messageService.add({
            severity,
            summary,
            detail,
            life: 4000,
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        const detail = customMessage || err.error?.message || err.message || "An error occurred";
        messageService.add({
          severity: "error",
          summary: "Error",
          detail,
          life: 4000,
        });
      },
    }),
  );
};
