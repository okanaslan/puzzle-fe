export class Random {
  static getRandomSegmentSize = (maxSize: number): number => {
    // Use getRandomNumberForCos90 to determine the segment size
    return Random.getLogDistributedRandom(1, maxSize);
  };

  static getRandomGapSize = (): number => {
    return Random.getLogDistributedRandom(1, 5); // Random gap of 1-5 cells
  };

  static shouldFillSegment = (seed: number): boolean => {
    // Simple seeded random number generator (Linear Congruential Generator)
    const normalized = (Math.cos(seed + 1000) + 1) / 2; // [0,1]
    const s = Math.floor(normalized * 100); // Scale to [0, 100]
    return s % 4 === 0; // Randomly decide to fill or not based on even/odd
  };

  static getLogDistributedRandom = (min: number, max: number): number => {
    // Use Math.random() for a value between 0 and 1
    const normalized = Math.random();
    // Invert and apply logarithmic distribution to bias towards min
    const logBase = 100;
    const logMin = 0;
    const logMax = Math.log(logBase);
    const logValue = logMin + (logMax - logMin) * normalized;
    const factor = Math.exp(logValue) / logBase; // [0,1] but biased towards 0
    return Math.round(min + (max - min) * factor);
  };
}
