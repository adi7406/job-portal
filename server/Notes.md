- **bcrypt** — Securely hashes and verifies user passwords before storing them in the database.
- **cloudinary** — Uploads, stores, manages, and delivers images and other media files through Cloudinary. (company logo and user resume)
- **cors** — Enables Cross-Origin Resource Sharing so your server can safely accept requests from different frontend origins.
- **dotenv** — Loads environment variables from a `.env` file into `process.env` for configuration and secret management.
- **express** — Provides the web server framework for creating APIs, routes, middleware, and handling HTTP requests/responses.
- **jsonwebtoken** — Creates and verifies JWT tokens for authentication and authorization.(for recruiter)
- **mongoose** — Connects your Node.js server to MongoDB and provides schemas, models, validation, and database operations.
- **multer** — Handles `multipart/form-data` and processes file uploads sent to your server.(for form data)
- **nodemon** — Automatically restarts the Node.js server whenever source files change during development.
- **svix** — Helps manage and verify webhooks, including receiving secure webhook events from external services.
( for clerk authentication webhooks ) (A webhook is a way for one server to automatically notify another server when something happens.)

in server
models folder - to store mongoose model using that we will manage the database task
routes folder - contains routes
controller - contains muiltiple files which helps us to manage multiple logic of server
middleswares folder - contains multer , cloudinary etc middlewares
utils - comman logic for controller function like generating a token for user
config - config file for mongoDB
sentry - application monitoring software that helps us to find and fix the error and also helps us to optimize our application