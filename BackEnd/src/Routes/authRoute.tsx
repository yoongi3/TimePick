import { Request,Response} from 'express';
import { userDatabase } from '../Data/Users';
import { checkAlphaNum } from './util';
import { v4 as uuidv4 } from "uuid";


export const registerHandler = (req: Request, res: Response) => {
  // only excepts post request
  if (req.method != "POST") return;
  if (!req.body) return;

  // const requestBody = req.body;
  // const displayName = requestBody.displayName
  // const username = requestBody.username
  // const password = requestBody.password
  
  const { displayName, username, password } = req.body

  const uuid = uuidv4();

  try {
    // case insensitive check for existing user
    const userExists = userDatabase.find(user => user.username.toLowerCase() === username.toLowerCase())

    if (!userExists) {

      if (displayName.length < 1){
        return res.json({error: "please enter a name"});
      }
      if (username.length < 1){
        return res.json({error: "please enter a username"});
      }

      // password validation
      if (password.length < 5){
        return res.json({ error: "password requires minimum of 5 characters" });
      }
      if(checkAlphaNum(password)){
        return res.json({ error: "password requires a mix of letters and numbers" });
      }

      const newUserObj = {
        id: uuid,
        displayName: displayName,
        username: username,
        password: password
      };

      userDatabase.push(newUserObj);
      // ~ check if userDataBase is updated ~
  
      // for (const user of userDatabase) {
      //   console.log(user);
      // }
      
      res.json({ 
        message: `user registered ${uuid}`,
        displayName: displayName,
        id: uuid, });
    }

    return res.json({ error: "user already exists" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getUserNameByIdHandler = (req: Request, res: Response) => {
  const id = req.query.id
    if (id){
        const users = userDatabase.filter(user => {
            console.log(user)
            if(user.id == id){
                return true
            }
            return false;
        })
        console.log(users)
        return res.status(200).json(users);
    }else {
        return res.status(200).json(userDatabase);
    }
};


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
      id: user.id,
    })
  } catch(err) {
    res.status(500).json({ error: 'an error has occurred' });
  }
}