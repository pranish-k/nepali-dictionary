import "dotenv/config";

// Secrets required for admin authentication. There are intentionally no
// fallbacks: the server must not run with a guessable JWT secret or a
// default admin account.
const REQUIRED_VARS = ["JWT_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD_HASH"];

// Placeholder values shipped in .env.example that must be replaced.
const PLACEHOLDERS = new Set(["your_jwt_secret_here", "your_bcrypt_hash_here"]);

const problems = REQUIRED_VARS.filter((name) => {
  const value = process.env[name]?.trim();
  return !value || PLACEHOLDERS.has(value);
});

if (problems.length > 0) {
  console.error(
    `Missing or placeholder environment variables: ${problems.join(", ")}.\n` +
      "Copy .env.example to .env and set real values before starting the server.\n" +
      "See the Environment Variables section of README.md."
  );
  process.exit(1);
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
