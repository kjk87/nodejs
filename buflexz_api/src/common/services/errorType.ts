import { IERROR } from "../core/CoreError";

export const E_SUCCESS 							= {message: 'SUCCESS'}; 

export const E_INVALID_ARG: IERROR	    		= {code: 400, message: 'required {:name}', description: '필수 파라미터 누락'};
export const E_EXPIRED_SESSION: IERROR			= {code: 401, message: 'expired session', description: '세션만료'};
export const E_NOTFOUND: IERROR					= {code: 404, message: 'not found', description: '데이터없음'};

export const E_INTERNAL_SERVER: IERROR			= {code: 500, message: 'internal server error', description: '서버에러'}
export const E_ALREADY_EXIST: IERROR			= {code: 504, message: 'already exist', description: '중복에러'}
export const E_NOTPERMISSION: IERROR	        = {code: 505, message: 'not permission', description: '권한 에러'}
export const E_LACK_COST: IERROR            	= {code: 517, message: 'lack cost', description: '비용 부족 에'}
export const E_NEED_COMPULSORY_TERMS: IERROR	= {code: 587, message: 'need compulsory terms', description: '필수약관 에러'}
export const E_NOT_FOUND_RECOMMENDER: IERROR	= {code: 588, message: 'not found recommender', description: '추천인 에러'}
export const E_INCLUDE_CURSING: IERROR	        = {code: 589, message: 'include cursing', description: '비속어 에러'}

export const E_NOTMATCH_PWD: IERROR				= {code: 600, message: 'not match password', description: '비밀번호 오류'};
export const E_ALREADY_JOIN: IERROR				= {code: 661, message: 'already join', description: '가입 에러'};
export const E_ALREADY_LIMIT: IERROR			= {code: 662, message: 'exceed', description: '횟수 초과'};
export const E_CLOSE: IERROR        			= {code: 663, message: 'close', description: '종료된 이벤트'};
export const E_NOTMATCH_AUTH_NUMBER: IERROR     = {code: 664, message: 'invalid auth number', description: '인증번호 오류'};
export const E_NOTMATCH_AUTH_EMAIL: IERROR      = {code: 665, message: 'invalid auth auth', description: '이메일 오류'};
export const E_TIME_LIMIT: IERROR               = {code: 666, message: 'time limit', description: '시간 제한'};

export const E_REDIS_SET_FAIL: IERROR			= {code: 760, message: 'E_REDIS_SET_FAIL', description: '레디스 오류'};
export const E_REDIS_GET_FAIL: IERROR			= {code: 761, message: 'E_REDIS_GET_FAIL', description: '레디스 오류'};
export const E_REDIS_CONNECT_FAIL: IERROR		= {code: 762, message: 'E_REDIS_CONNECT_FAIL', description: '레디스 오류'};