export interface CommonState{
  isLoading: boolean;
  lastUrl: string | null;
}

export const INIT_COMMON_STATE: CommonState = {
  isLoading: false,
  lastUrl: null
}
