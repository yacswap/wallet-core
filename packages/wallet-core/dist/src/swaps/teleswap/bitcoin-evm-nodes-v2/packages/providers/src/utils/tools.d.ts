/// <reference types="node" />
export const sleep: typeof import("timers/promises").setTimeout;
export function runWithRetries(action: any, config?: {
    maxTries: number;
    retrySleep: number;
}): Promise<any>;
export function getRandomInteger(min: any, max: any): any;
export function getAxiosInstance({ baseUrl, timeout, headers, auth, }: {
    baseUrl: any;
    timeout?: number | undefined;
    headers?: {} | undefined;
    auth: any;
}): any;
