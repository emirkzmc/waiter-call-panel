
interface RateLimitConfig {
    limit: number;      
    windowMs: number;
}

class RateLimiter {
    private requests: Map<string, number[]> = new Map();
    private limit: number;
    private window: number;

    constructor(config: RateLimitConfig = { limit: 10, windowMs: 60000 }) {
        this.limit = config.limit;
        this.window = config.windowMs;
    }

    canMakeRequest(identifier: string): boolean {
        const now = Date.now();
        const userRequests = this.requests.get(identifier) || [];


        const recentRequests = userRequests.filter(
            time => now - time < this.window
        );

        if (recentRequests.length >= this.limit) {
            return false;
        }

        recentRequests.push(now);
        this.requests.set(identifier, recentRequests);
        return true;
    }

    getRemainingRequests(identifier: string): number {
        const now = Date.now();
        const userRequests = this.requests.get(identifier) || [];
        const recentRequests = userRequests.filter(
            time => now - time < this.window
        );
        return Math.max(0, this.limit - recentRequests.length);
    }

    reset(identifier: string): void {
        this.requests.delete(identifier);
    }

    clearAll(): void {
        this.requests.clear();
    }
}



export const callRateLimiter = new RateLimiter({
    limit: 10,
    windowMs: 60000
});


export const tableManagementRateLimiter = new RateLimiter({
    limit: 10,
    windowMs: 60000
});

export default RateLimiter;
