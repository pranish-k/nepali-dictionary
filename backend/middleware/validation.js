import { body, validationResult } from "express-validator";

// Validation rules for word submission/update
export const wordValidationRules = [
  body("wordName")
    .trim()
    .notEmpty()
    .withMessage("Word name is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Word name must be between 1 and 200 characters"),

  body("wordMeaning")
    .trim()
    .notEmpty()
    .withMessage("Word meaning is required")
    .isLength({ min: 1, max: 2000 })
    .withMessage("Word meaning must be between 1 and 2000 characters"),

  body("wordSentence")
    .trim()
    .notEmpty()
    .withMessage("Example sentence is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Example sentence must be between 1 and 1000 characters"),

  body("wordNepaliScript")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Nepali script must not exceed 200 characters"),

  body("status")
    .optional()
    .isIn(["pending", "approved", "rejected"])
    .withMessage("Status must be pending, approved, or rejected"),
];

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Sanitize HTML to prevent XSS attacks
export const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        // Remove HTML tags and potentially dangerous characters
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/<[^>]+>/g, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+\s*=/gi, "");
      }
    });
  }
  next();
};
