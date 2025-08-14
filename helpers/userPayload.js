
export const userResponsePayload = (user) => {
    const data ={
        id: user.id,
        fullName: user.fullName,
        address: user.address,  
    };
    if(user.email)data.email = user.email;
    if(user.phone)data.phone = user.phone;
    if(user.role)data.role = user.role;
    return data;
}


export const userCreatePayload = (user) => {
    const data = {
        fullName: user.fullName,
        password : user.password,
        address: user.address,    
    };
    if(user.email) data.email = user.email;
    if(user.phone) data.phone = user.phone;

    return data;
}