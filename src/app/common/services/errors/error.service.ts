import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    public errorObservable: EventEmitter<string> = new EventEmitter();

    constructor() {
    }
    /**
     * Emit error
     * @param message. Is message error
     */
    public emitError(message:string){
        //console.log("Emit error " + message);
        this.errorObservable.emit(message);
    }
    
    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return "No connection";
        }
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string {
        return error?.stack!;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}
