export const authService = {
login,
register
}
const params = {        
method: "POST",
headers: {
  "Content-Type": "application/json",
}}
function login(email:string, password:string){
   return fetch("/api/login", {
        ...params,
        body: JSON.stringify({ email, password }),
      });
}

function register(username: string, email:string, password:string){
    return fetch("/api/register", {
          ...params,
         body: JSON.stringify({ username,email, password }),
       });
 }