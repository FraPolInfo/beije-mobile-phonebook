import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, tap } from "rxjs";
import { SpinnerService } from "../../../services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.setSpinnerValue(true)

    return next.handle(request).pipe(
      delay(1000),
      tap((event: HttpEvent<any>) => {
            this.spinnerService.setSpinnerValue(false)
      })
    );
  }
}