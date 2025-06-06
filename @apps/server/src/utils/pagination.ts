/**
 * Page-based pagination parameters.
 */
export interface PageBasedPaginationParams {
  page: number;
  perPage: number;
}

/**
 * Offset and limit pagination parameters.
 */
export interface OffsetLimitPaginationParams {
  offset: number;
  limit: number;
}

/**
 * Transforms page-based pagination parameters to offset and limit pagination parameters.
 *
 * @param   params           Page-based pagination parameters
 * @param   options          Options
 * @param   options.maxLimit Maximum number of items per page
 *
 * @returns                  Offset and limit pagination parameters
 */
export function transformOffsetLimitPaginationParams(
  params: PageBasedPaginationParams,
  options: {
    maxLimit?: number;
  } = {},
): OffsetLimitPaginationParams {
  const offset = (params.page - 1) * params.perPage;
  const limit = params.perPage;

  return {
    offset: Math.max(0, offset),
    limit: Math.max(1, Math.min(options.maxLimit || 100, limit)),
  };
}

/**
 * Transforms offset and limit pagination parameters to page-based pagination parameters.
 *
 * @param   params             Offset and limit pagination parameters
 * @param   options            Options
 * @param   options.maxPerPage Maximum number of items per page
 *
 * @returns                    Page-based pagination parameters
 */
export function transformPageBasedPaginationParams(
  params: OffsetLimitPaginationParams,
  options: {
    maxPerPage?: number;
  } = {},
): PageBasedPaginationParams {
  const page = Math.floor(params.offset / params.limit) + 1;
  const perPage = params.limit;

  return {
    page: Math.max(1, page),
    perPage: Math.max(1, Math.min(options.maxPerPage || 100, perPage)),
  };
}
