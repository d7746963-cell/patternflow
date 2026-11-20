/**
 * Global Feature Flags for PatternFlow
 * 
 * FREE_BETA_MODE:
 * - When true: All signed-in users receive 100% free, unlimited AI chart analyses.
 *   Payment paywalls and analysis limits are paused.
 * - When false: Standard monetization applies (1 free analysis credit, followed by
 *   the Kelviq Pro subscription paywall).
 * 
 * To restore payments in the future, simply toggle this variable to false.
 */
export const FREE_BETA_MODE = true;
