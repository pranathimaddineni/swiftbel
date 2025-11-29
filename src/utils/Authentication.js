export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    if (localStorage?.getItem('token')) {
      return localStorage?.getItem('token');
    } else {
      return false;
    }
  }
  };
  export const isAdminAuthenticated = () => {
    if (localStorage?.getItem('isAdmin')) {
      return localStorage?.getItem('isAdmin');
    } else {
      return false;
    }
  };

  export const isSPAuthenticated = () => {
    console.log(localStorage?.getItem('isServiceProvider'),"value")
    if (localStorage?.getItem('isServiceProvider')==="true") {
      return localStorage?.getItem('isServiceProvider');
    } else {
      return false;
    }
  };
