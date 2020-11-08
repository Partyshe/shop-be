export const getResponseObject = (
    statusCode: number,
    bodyObject: any,
    headers?: Record<string, any>
  ) => {
    return {
      statusCode,
      body: JSON.stringify(bodyObject),
      headers
    }
}