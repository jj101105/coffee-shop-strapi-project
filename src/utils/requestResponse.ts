// server/utils/response.ts
export function createResponse({ ctx, httpCode, devCode, message, data, meta } :any) {
  ctx.status = httpCode; // sets the actual HTTP status code, e.g. 201

  ctx.body = {
    status: httpCode < 400 ? 'success' : 'error',
    code: devCode ?? 'OK',
    statusCode: httpCode,
    message: message ?? '',
    data: data ?? null,
    meta: meta ?? {},
  };

  return ctx.body;
}