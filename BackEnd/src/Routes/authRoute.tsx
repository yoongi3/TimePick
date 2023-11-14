import { Request,Response} from 'express';
import { userDatabase } from '../Data/Users';
import { checkAlphaNum } from './util';

export const registerHandler = (req: Request, res: Response) => {
  // only excepts post request
  if (req.method != "POST") return;
  if (!req.body) return;

  const requestBody = req.body;
  const displayName = requestBody.displayName
  const username = requestBody.username
  const password = requestBody.password

  try {
    // case insensitive check for existing user
    const userExists = userDatabase.find(user => user.username.toLowerCase() === username.toLowerCase())

    if (!userExists) {
      const newUserObj = {
        displayName: displayName,
        username: username,
        password: password
      };

      // password validation
      if (password.length < 9){
        res.send("password requires minimum of 9 characters \n")
        return;
      }
      if(checkAlphaNum(password)){
        res.send("password requires a mix of letters and numbers \n")
        return;
      }

      userDatabase.push(newUserObj);
      for (const user of userDatabase) {
        console.log(user);
      }
      res.send("user registered \n")
    }
    res.send("user already exists \n")
  } catch(err) {
    // do nothing 
  }
}

export const usersListHandler = (req: Request, res: Response) => {
  const username = req.query.id
  if (username){
      const users = userDatabase.filter(user => {
          console.log(user)
          if(user.username == username){
              return true
          }
          return false;
      })
      console.log(users)
      return res.status(200).json(users);
  }else {
      return res.status(200).json(userDatabase);
  }
}


export const loginHandler = (req: any, res: any) => {
  // only excepts post request
  if (req.method != "POST") return;
  if (!req.body) return;

  const requestBody = req.body;
  const username = requestBody.username
  const password = requestBody.password

  try {
    const user = userDatabase.find(user => user.username === username)
    if (!user) { 
        res.send("username does not exist"); 
        return;
    }
    if (user.password !== password) { 
        res.send("invalid credentials"); 
        return;
    }

    res.send(`login successful!\nwelcome ${user.displayName}!!!\n`)
  } catch(err) {
    res.send("an error has occurred")
  }
}