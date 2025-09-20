
// -- Firebase --
// Initialize firebase service key from the environment.
const ServiceAccountKey = String(Bun.env.SERVICE_ACCOUNT_CREDENTIALS)
const ServiceAccountJson = String(Bun.env.SERVICE_ACCOUNT_FILE)

try {
    await Bun.write(Bun.file(ServiceAccountJson), ServiceAccountKey);
} catch(e) {
    console.error("Unable to find service credentials file:", ServiceAccountJson)
    console.error("Firebase service account credentials is required.")
}
// -- Firebase --