import bcrypt from 'bcrypt'
import { NextApiResponse } from 'next'
import { RegisterError } from '../../lib/api';
import database from "../../lib/database"
import withSession from '../../lib/session';
import { ApiResult } from '../../types/global';

const emailRegex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default withSession(async (req, res: NextApiResponse<ApiResult>) => {

  try {
    const { email, password } = await req.body;

    if (!emailRegex.test(email))
      return res.json({ success: false, reason: RegisterError.InvalidEmail})

    const hash = await bcrypt.hash(password, 3);
    await database.register({ email, pwdHash: hash });

    req.session.set("user", { email });
    await req.session.save();

    res.json({ success: true });
  } catch (err) {

    if (err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: User.Email')
      res.json({ success: false, reason: RegisterError.ExistingEmail })

    else {
      res.json({ success: false, reason: RegisterError.UnknownError })
      console.error(err);
    }
  }
})
