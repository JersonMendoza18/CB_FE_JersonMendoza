export interface AccountResponse {
  id: number;
  accountNumber: string;
  balance: number;
}

export interface TransactionRequest {
  accountId: number;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
}

export interface TransactionResponse {
  id: number;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  createdAt: string;
  accountId: number;
}

export interface ErrorResponse {
  error: String;
  message: string;
  timestamp: string;
}