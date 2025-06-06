/**
 * Check if the user ID parameter is for the requester.
 *
 * @param   userIdParam User ID parameter
 *
 * @returns             Whether the user ID parameter is for the requester
 */
export function isMyUserIdParam(userIdParam: Literal<'me', string>) {
  return userIdParam === 'me';
}
