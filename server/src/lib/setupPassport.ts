import passport from 'passport';
import { BasicStrategy } from 'passport-http';

export default function setupPassport(): void {
  passport.use(new BasicStrategy((username, password, done): void => {
      if (username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD) {
        return done(null, true);
      }

      return done(null, false);
    }
  ));
}
