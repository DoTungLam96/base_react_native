export interface LoginBody {
  username?: string;
  password?: string;
}

export interface ExtraData {
  ISADMIN: string;
  ISUSECA: string;
  MAX_VIDEO_SECOND: string;
  DEPOSIT_TUTORIAL: string;
}

export interface Result {
  SessionKey: string;
  SessionID: number;
  UserID: number;
  Username: string;
  BranchId?: any;
  DisplayName: string;
  CreateDate: Date;
  LastAccess: Date;
  ClientIP: string;
  DNSName: string;
  SessionStatus: string;
  TerminatedUsername?: any;
  Description?: any;
  WorkingDate: Date;
  BatchDate: Date;
  SystemDate: Date;
  SettleDate: Date;
  SystemStatus: string;
  AllowDevelop: string;
  AllowViewAllData: string;
  LanguageID: string;
  RequireResetPassword?: any;
  ExtraData: ExtraData;
}

export interface LoginRespond {
  status: string;
  result: Result;
}
