export class GetJobsParams {
  paid: boolean;
}

export class DepositParams {
  amount: string;
}

export class BaseBestParams {
  start: string;
  end: string;
  limit?: number;
}

export class BestProfession extends BaseBestParams {}

export class BestClients extends BaseBestParams {}
