  export const isAdminAppAuthenticated = () => {
    return isUserAuthenticated("ADMIN_APP");
  };

  export const isClienteAuthenticated = () => {
    return isUserAuthenticated("CLIENTE_ROLE");
  };
  
  export const isUserAuthenticated = (userTypes) => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const userRole = decodedPayload.rol;
  
      // Check if userRole matches any of the userTypes
      if (Array.isArray(userTypes) && userTypes.includes(userRole)) {
        return true;
      } else if (userRole === userTypes) {
        return true;
      }
    }
  
    return false;
  };

  export const isUserLogged = () => {

    if (localStorage.getItem('token')) {
        return true;
    }

    return false;

}
  