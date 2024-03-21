// Update user info schema

/**
 * @openapi
 * components:
 *  schemas:
 *      UpdateUserInfo:
 *          type: object
 *          required:
 *              - gender
 *              - phone
 *              - address
 *          properties:
 *              gender:
 *                  type: string
 *                  enum:
 *                      - MALE
 *                      - FEMALE
 *                  description: The gender of the user.
 *              phone:
 *                  type: string
 *                  description: Phone number of the user.
 *              address:
 *                  type: string
 *                  description: Address of the user.
 *          example:
 *              gender: MALE
 *              phone: 081xxxxxx23
 *              address: 1600 Pennsylvania Avenue, N.W.
 */


// UserType schema

/**
 * @openapi
 * components:
 *  schemas:
 *      UserType:
 *          type: object
 *          required:
 *              - userType
 *          properties:
 *              userType:
 *                  type: string
 *                  enum:
 *                      - SELLER
 *                      - RIDER
 *                      - SHOPPER
 *                      - FREEELANCER
 *                      - SERVICES
 *                      - EXPLORER
 *                  description: Why the user signed up, defaults to EXPLORER.
 *          example:
 *              userType: FREELANCER
 */


// Profile creation success response

/**
 * @openapi
 * components:
 *  schemas:
 *      UserInfoUpdate:
 *          type: object
 *          required:
 *              - userEmail
 *              - gender
 *              - phone
 *              - address
 *              - userType
 *          properties:
 *              userEmail:
 *                  type: string
 *                  description: Email associated with the user profile.
 *              gender:
 *                  type: string
 *                  enum:
 *                      - MALE
 *                      - FEMALE
 *                  description: Gender of the user.
 *              phone:
 *                  type: string
 *                  description: Phone number associated with the user profile.
 *              address:
 *                  type: string
 *                  description: Address associated with the user profile.
 *              userType:
 *                  type: string
 *                  enum:
 *                      - SELLER
 *                      - RIDER
 *                      - SHOPPER
 *                      - FREELANCER
 *                      - SERVICES
 *                      - EXPLORER
 *          example:
 *              userEmail: john@doe.com
 *              gender: MALE
 *              phone: 081xxxxxx23
 *              address: 1600 Pennsylvania Avenue, N.W.
 *              userType: EXPLORER
 */