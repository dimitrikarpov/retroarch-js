import { NavLink, Outlet } from "react-router-dom"
import { cn } from "../utils"

export const Layout = () => {
  return (
    <div className="flex flex-col mt-5 ">
      <div className="flex justify-center">
        <div className="border border-black w-fit p-5 rounded-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "p-2 rounded-md bg-orange-300 text-white hover:opacity-70 mr-3 text-lg",
                isActive && "bg-orange-500",
              )
            }
          >
            from collection
          </NavLink>

          <NavLink
            to="/2"
            className={({ isActive }) =>
              cn(
                "p-2 rounded-md bg-orange-300 text-white hover:opacity-70 text-lg",
                isActive && "bg-orange-500",
              )
            }
          >
            from local
          </NavLink>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
