// Common responses

/**
 * @openapi
 * components:
 *  responses:
 *      UnAuthorized:
 *          description: Unauthorized.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      code: 401
 *                      message: Please authenticate to complete this request.
 *      AuthenticationSuccess:
 *          description: Authentication successful.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserAuthSuccessResponse'
 *      BadRequest:
 *          description: Bad request.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      code: 400
 *                      message: Please provide a valid request payload.
 *      NotFound:
 *          description: The specified resource was not found.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      code: 404
 *                      message: The specified resource was not found.
 *      InternalServerError:
 *          description: Internal server error.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '3/components/schemas/Error'
 *                  example:
 *                      code: 500
 *                      message: Some internal server error occured when processing your request.
 */