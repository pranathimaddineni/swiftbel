import { isAuthenticated } from "@/utils/Authentication"
import { useRouter } from "next/router"
const ProtectedRoute = (ProtectedComponent) => {
   return (props) => {

      if (typeof window !== "undefined") {
         const Router = useRouter()
         const userIsLoggedIn = isAuthenticated()
         if (!userIsLoggedIn) {
            Router.replace({ pathname: '/',
            query: {
            from:Router.asPath,
            modal:true
            }},
            undefined, { shallow: true })
            return null
         } else {
            return <ProtectedComponent {...props} />
         }
      }

      return null
   }
}
export default ProtectedRoute