import { auth } from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://dev-caxz7stiiqangw24.us.auth0.com/api/v2/",
    issuerBaseURL: "https://dev-caxz7stiiqangw24.us.auth0.com",
    tokenSigningAlg: "RS256"
})
export default jwtCheck