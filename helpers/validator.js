

export const isValidEmail = (email)=>{
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   return emailRegex.test(email) && email.length <= 254; 
}



export const isValidPassword = (pw) => {
  // Example: at least 6 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
console.log(pw)
console.log( regex.test(pw))
  return regex.test(pw);
};

