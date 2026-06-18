import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from './services/financial.service';
import { AccountResponse, TransactionRequest } from './models/account';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Habilita directivas como *ngIf y [(ngModel)] en el HTML
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Variables para la consulta de cuenta
  searchAccountId: number | null = null;
  account: AccountResponse | null = null;

  // Variables para el registro de transacciones
  transactionForm: TransactionRequest = {
    accountId: 0,
    type: 'DEPOSIT',
    amount: 0
  };

  // Variables de estado y feedback para la UI
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private financialService: FinancialService) {}

  // Acción 1: Buscar Cuenta bancaria
  onSearchAccount(): void {
    if (!this.searchAccountId) return;
    this.clearAlerts();

    this.financialService.getAccount(this.searchAccountId).subscribe({
      next: (data) => {
        this.account = data;
        // UX: Auto-poblamos el ID en el formulario de transacciones
        this.transactionForm.accountId = data.id;
      },
      error: (err) => {
        this.account = null;
        // Captura el JSON exacto de tu @RestControllerAdvice del Backend
        this.errorMessage = err.error?.message || 'Account not found or server error.';
      }
    });
  }

  // Acción 2: Enviar Depósito o Retiro
  onSubmitTransaction(): void {
    this.clearAlerts();

    if (this.transactionForm.accountId <= 0 || this.transactionForm.amount <= 0) {
      this.errorMessage = 'Please enter a valid Account ID and an amount greater than zero.';
      return;
    }

    this.financialService.executeTransaction(this.transactionForm).subscribe({
      next: (response) => {
        this.successMessage = `Transaction ${response.id} (${response.type}) executed successfully!`;
        
        // Si la cuenta afectada es la que vemos en pantalla, refrescamos su saldo al instante
        if (this.account && this.account.id === this.transactionForm.accountId) {
          this.refreshCurrentAccount(this.account.id);
        }
        this.resetTransactionForm();
      },
      error: (err) => {
        // Captura las violaciones de límites (BR-04) o fondos insuficientes (BR-02) desde Spring
        this.errorMessage = err.error?.message || 'Transaction rejected by business rules.';
      }
    });
  }

  private refreshCurrentAccount(id: number): void {
    this.financialService.getAccount(id).subscribe({
      next: (data) => this.account = data
    });
  }

  private clearAlerts(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  private resetTransactionForm(): void {
    this.transactionForm.amount = 0;
  }
}