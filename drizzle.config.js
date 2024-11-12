/** @type { import ("drizzle-kit" ).Config} */

export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: "postgresql://accounts:3cHwVloPSLO9@ep-solitary-mouse-a55o3jmn.us-east-2.aws.neon.tech/ai-interview?sslmode=require",
  }
};
