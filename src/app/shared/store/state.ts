export interface CommonState{
  lastUrl: string | null;
  currentUrl: string | null;
}

export const INIT_COMMON_STATE: CommonState = {
  lastUrl: null,
  currentUrl: null
}
