export enum NODE_ENV {
    PROD = 'PROD',
    STAGE = 'STAGE',
    LOCAL = 'LOCAL'
}

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum LotteryJoinType {
    ADVERTISE = 'advertise',
    EVENT = 'event',
    ATTENDANCE = 'attendance',
    COMBO = 'combo',
    INVITE = 'invite',
    PICKJOIN = 'pickJoin',
    PICKWIN = 'pickWin',
    SHOPPING = 'shopping',
    LOTTO = 'lotto',
    EVENTJOIN = 'eventJoin'
}

export enum LotteryGiftType {
    LOTTO = 'lotto',
    USDT = 'usdt',
    POINT = 'point',
    CASH = 'cash'
}

export enum HistoryCommissionType {
    ad = 'ad',
    ball = 'ball',
    bonus = 'bonus'
}

/*
      -1:결제실패, 1:결제요청, 2:결제승인, 11:취소요청, 12:취소완료, 21:환불요청, 22:환불완료, 31:교환요청, 32:교환완료
     */
export enum PurchaseStatus {
    FAIL = -1,
    PAY_REQ = 1, 
    PAY = 2,
    CANCEL_REQ = 11,
    CANCEL_COMPLETE = 12,
    REFUND_REQ = 21, 
    REFUND_COMPLETE = 22,
    EXCHANGE_REQ = 31, 
    EXCHANGE_COMPLETE = 32,
    COMPLETE = 99
}

export enum YN {
    Y = 'Y',
    N = 'N'
}

export enum ActiveStatus {
    ACTIVE = 'active',
    DEACTIVE = 'deactive',
    INACTIVE = 'inactive'
}