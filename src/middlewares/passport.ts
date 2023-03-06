import { Express } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import JWTStrategy, { ExtractJwt } from "passport-jwt";
import { isEmail } from "../utils/validators";

import users from "../database/queries/users";
import { User, UserLocatableColumns } from "../types/models/auth";

import { token } from "../config";
import { compare } from "../utils/bcrypt";

export const configurePassport = async (app: Express) => {
  passport.serializeUser((user: User, done) => {
    if (user.password) {
      delete user.password;
    }
    done(null, user);
  });

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
