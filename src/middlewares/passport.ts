import passport from "passport";
import LocalStrategy from "passport-local";
import { Express } from "express";
import users from "../../database/queries/users";
import { User, UserLocatableColumns } from "../../types/models";
import { compare } from "../../utils/bcrypt";
import JWTStrategy, { ExtractJwt } from "passport-jwt";
import { token } from "../config";

export const configurePassport = async (app: Express) => {
  passport.use(
    new JWTStrategy.Strategy(
      {
        secretOrKey: token.key,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      (payload, done) => {
        done(null, payload);
      }
    )
  );

  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: "email",
        session: false,
      },
      async (email, password, done) => {
        const field: UserLocatableColumns = isEmail(email) ? "email" : "";

        const [user] = await users.find(field, email);
        if (!user) {
          return done(null, false);
        }
        const matches = await compare(password, user.password!);
        if (!matches) {
          done(null, false);
        } else {
          delete user.password;
          done(null, false);
        }
      }
    )
  );

  app.use(passport.initialize());
};
