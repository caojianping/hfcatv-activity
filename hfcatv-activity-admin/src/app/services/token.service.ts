import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {Urls} from "../common/urls";
import Token from "../common/token";
import HttpService from './http.service';

@Injectable({
    providedIn: 'root',
})
export class TokenService {

}
