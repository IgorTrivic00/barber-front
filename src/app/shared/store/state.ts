export interface CommonState{
  isLoading: boolean;
  lastUrl: string | null;
  showNavBar: boolean;
}

export const INIT_COMMON_STATE: CommonState = {
  isLoading: false,
  lastUrl: null,
  showNavBar: true
}
