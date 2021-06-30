import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoadingService } from '../api/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(
        private _snackBar: MatSnackBar,
        private injector: Injector,
        private loadingService: LoadingService
    ) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);

        let message;
        let stackTrace;
        this.loadingService.setLoading(false);
        if (error instanceof HttpErrorResponse) {
            // Server Error
            if (error.status === 0) {
                message = "Errore di comunicazione con il server dati";
            } else {
                message = errorService.getServerMessage(error);
            }
            stackTrace = errorService.getServerStack(error);
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
        }

        this._snackBar.open(message, undefined, {
            duration: 2000,
        });
        console.log(message);
        console.log(stackTrace);
    }
}
