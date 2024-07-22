export enum CommonActions {
  OpenSpinner = '[CommonActions] Open Spinner',
  CloseSpinner = '[CommonActions] Close Spinner',
  SuccessMessage = '[CommonActions] Success Message',
}

export enum Severity {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export const SeverityMap: Map<Severity, string> = new Map<Severity, string>([
  [Severity.SUCCESS, 'Uspešno obrađeno'],
  [Severity.INFO, 'Informacija'],
  [Severity.WARN, 'Upozorenje'],
  [Severity.ERROR, 'Greška'],
])
