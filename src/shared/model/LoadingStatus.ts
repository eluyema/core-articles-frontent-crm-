export const loadingStatuses = {
    pending: 'pending',
    success: 'success',
    idle: 'idle',
    failed: 'failed',
} as const;

export type LoadingStatus = typeof loadingStatuses[keyof typeof loadingStatuses];
