// UpdateUserInfo route

/**
 * @openapi
 * /api/profile/create:
 *  post:
 *      summary: Create a user profile.
 *      tags: [UserInfo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserInfo'
 *      responses:
 *          201:
 *              description: Profile creation successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserInfoUpdate'
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnAuthorized'
 *          404:
 *              $ref: '#/components/responses/NotFound'
 *          500:
 *              $ref: '#/components/responses/InternalServerError'
 */


// UpdateUserType route

/**
 * @openapi
 * /api/profile/usertype:
 *  post:
 *      summary: Updates the type of user.
 *      tags: [UserInfo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserType'
 *      responses:
 *          200:
 *              description: User type update successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - message
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Server response on successful execution of request.
 *                          example:
 *                              message: Updated user info successfully.
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnAuthorized'
 *          404:
 *              $ref: '#/components/responses/NotFound'
 *          500:
 *              $ref: '#/components/responses/InternalServerError'
 */