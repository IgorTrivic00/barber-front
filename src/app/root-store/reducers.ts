import {_commonReducer, commonReducer} from "../shared/store/reducers";
import {_authReducer} from "../auth/store/reducers";

export const appReducer = {
  common: _commonReducer,
  auth: _authReducer
};
