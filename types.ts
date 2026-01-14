
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  MANUAL_REFUND = 'MANUAL_REFUND',
  CHARGEBACK = 'CHARGEBACK',
  RESUBMISSION = 'RESUBMISSION',
  STATUS_CHECK = 'STATUS_CHECK',
  SHADOW_LEDGER = 'SHADOW_LEDGER'
}

export interface TransactionStatus {
  reference: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REJECTED';
  date: string;
  type: string;
}

export interface ManualRefundData {
  originalRef: string;
  newRef: string;
  amount: number;
  iban: string;
  date: string;
}

export interface ChargebackData {
  originalRef: string;
  amount: number;
  chargebackNumber: string;
  date: string;
  file?: File;
}
