// Sign up schema

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSignUp:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the user.
 *        email:
 *          type: string
 *          description: Email address of the user.
 *        password:
 *          type: string
 *          description: Password of the user.
 *      example:
 *        name: John Doe
 *        email: john@doe.com
 *        password: brickwall
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      UserSignIn:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email address of the registered user.
 *              password:
 *                  type: string
 *                  description: Password of the registered user.
 *          example:
 *              email: john@doe.com
 *              password: brickwall
 */


// Authentication success response schema

/**
 * @openapi
 * components:
 *  schemas:
 *    UserAuthSuccessResponse:
 *      type: object
 *      required:
 *        - user
 *        - accessToken
 *        - refreshToken
 *      properties:
 *        user:
 *          type: object
 *          required:
 *            - name
 *            - email
 *          properties:
 *            name:
 *              type: string
 *              description: Name of the signed in user.
 *            email:
 *              type: string
 *              description: Email address of the signed in user.
 *          description: Signed in user entity.
 *        accessToken:
 *          type: string
 *          description: Access token of the signed in user.
 *        refreshToken:
 *          type: string
 *          description: Refresh token of the signed in user.
 *      example:
 *        user:
 *          name: John Doe
 *          email: john@doe.com
 *        accessToken: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ
 *        refreshToken: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ
 * 
 */


// Forgot password schema

/**
 * @openapi
 * components:
 *  schemas:
 *      ForgotPassword:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email address of the user, required for OTP verification.
 *          example:
 *              email: john@doe.com
 */


/**
 * @openapi
 * components:
 *  schemas:
 *      VerifyOtp:
 *          type: object
 *          required:
 *              - otp
 *          properties:
 *              otp:
 *                  type: string
 *                  description: One time password.
 *          example:
 *              otp: XXXXX
 */


// Reset password schema

/**
 * @openapi
 * components:
 *  schemas:
 *      ResetPassword:
 *          type: object
 *          required:
 *              - password
 *              - confirmPassword
 *          properties:
 *              password:
 *                  type: string
 *                  description: New password.
 *              confirmPassword:
 *                  type: string
 *                  description: Confirm new password.
 *          example:
 *              password: janoblak
 *              confirmPassword: janoblak
 */


// Error response schema

/** 
 * @openapi
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      required:
 *        - code
 *        - message
 *      properties:
 *        code:
 *          type: string
 *          description: Error code.
 *        message:
 *          type: string
 *          description: Error message.
 */
