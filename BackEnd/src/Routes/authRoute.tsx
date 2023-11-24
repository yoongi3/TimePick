import { Request,Response} from 'express';
import { userDatabase } from '../Data/Users';
import { checkAlphaNum } from './util';
import { v4 as uuidv4 } from "uuid";


export const registerHandler = (req: Request, res: Response) => {
  // only excepts post request
  if (req.method != "POST") return;
  if (!req.body) return;

  const requestBody = req.body;
  const displayName = requestBody.displayName
  const username = requestBody.username
  const password = requestBody.password

  const uuid = uuidv4();

  try {
    // case insensitive check for existing user
    const userExists = userDatabase.find(user => user.username.toLowerCase() === username.toLowerCase())

    if (!userExists) {
      const newUserObj = {
        id: uuid,
        displayName: displayName,
        username: username,
        password: password
      };

      // password validation
      if (password.length < 5){
        res.json({ error: "password requires minimum of 5 characters" });
        return;
      }
      if(checkAlphaNum(password)){
        res.json({ error: "password requires a mix of letters and numbers" });
        return;
      }

      userDatabase.push(newUserObj);
      for (const user of userDatabase) {
        console.log(user);
      }
      res.json({ message: "user registered" });
    }
    res.json({ error: "user already exists" });
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
      res.status(400).json({ error: "username does not exist" }); 
        return;
    }
    if (user.password !== password) { 
        res.status(400).json({ error: "invalid credentials" }); 
        return;
    }

    res.json({
      message: `login successful!\nwelcome ${user.displayName}!!!`,
      displayName: user.displayName,
    })
  } catch(err) {
    res.status(500).json({ error: 'an error has occurred' });
  }
}