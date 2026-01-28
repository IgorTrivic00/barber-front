export enum CommonActions {
  UpdateLastUrl = '[CommonActions] Update Last Url',
  UpdateCurrentUrl = '[CommonActions] Update Currnet Url',
  ReturnToPreviousPage = '[CommonActions] Return To Previous Page',
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
