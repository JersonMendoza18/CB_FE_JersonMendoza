import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountResponse, TransactionRequest, TransactionResponse } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // 1. Consultar cuenta: GET /api/accounts/{id}
  getAccount(id: number): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.baseUrl}/accounts/${id}`);
  }

  // 2. Registrar movimiento: POST /api/transactions
  executeTransaction(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.baseUrl}/transactions`, request);
  }
}