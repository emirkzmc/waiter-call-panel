import { useMemo } from 'react';
import { sortCalls } from '../utils/callHelpers';
import type { Call } from '../types/callTypes';

export function useSortedCalls(calls: Call[]) {
    return useMemo(() => sortCalls(calls), [calls]);
}
