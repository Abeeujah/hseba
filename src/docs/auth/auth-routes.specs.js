// Sign up route

/**
 * @openapi
 * /auth/signup:
 *  post:
 *    summary: Sign up a User.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignUp'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/AuthenticationSuccess'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */


// Sign in route

/**
 * @openapi
 * /auth/signin:
 *  post:
 *    summary: Sign in a user.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignIn'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/AuthenticationSuccess'
 *      304:
 *        description: Incorrect credentials.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              code: 304
 *              message: Incorrect email or password.
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 */


// Forgot password route

/**
 * @openapi
 * /auth/forgot-password:
 *  post:
 *    summary: Forgot password.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ForgotPassword'
 *    responses:
 *      200:
 *          description: OTP sent successfully
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - success
 *                          - otpToken
 *                      properties:
 *                          success:
 *                              type: string
 *                              description: Success response from the API.
 *                          otpToken:
 *                              type: string
 *                              description: Cookie header to store the OTP.
 *                      example:
 *                          success: OTP sent to your email adress successfully.
 *                          otpToken: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ
 *      400:
 *          $ref: '#/components/responses/BadRequest'
 *      500:
 *          $ref: '#/components/responses/InternalServerError' 
 */


// Verify OTP route

/**
 * @openapi
 * /auth/verify-otp:
 *  post:
 *      summary: Verify one time password.
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/VerifyOtp'
 *      responses:
 *          200:
 *              description: OTP verification successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - message
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: OTP verification success message.
 *                          example:
 *                              message: Success.
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          408:
 *              description: OTP expired.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          code: 408
 *                          message: OTP expired, please request another.
 *          500:
 *              $ref: '#/components/responses/InternalServerError'
 */


// Reset Password route

/**
 * @openapi
 * /auth/reset-password:
 *  post:
 *      summary: Reset password.
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ResetPassword'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AuthenticationSuccess'
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          500:
 *              $ref: '#/components/responses/InternalServerError'
 */