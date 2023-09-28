
export default function authMiddleware(to, from, next) {
    const isAuthenticated = 
    localStorage.getItem("token") != null
    if (isAuthenticated) {
      next();
    } else {
      
      next('/login');
    }
  }
  