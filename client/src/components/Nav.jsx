import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.reducer.user);
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <section className="bg-white flex items-center justify-between  py-4 text-blue-600 max-sm:px-10 shadow-md w-full px-[10%]  ">
      <Link to={"/"} className="text-3xl font-bold">
        Market.io
      </Link>
      {user ? (
        <>
          <div className="flex gap-2">
            {user.role === "user" && (
              <Link
                to={"/profile"}
                className="  px-2 py-1 flex items-end gap-1"
              >
                <UserIcon width={26} />
                profile
              </Link>
            )}
            {user.role === "admin" && (
              <Link to={"/admin"} className="  px-2 py-1 flex items-end gap-1">
                <UserIcon width={26} />
                Admin Pannel
              </Link>
            )}
            <Link
              to={"/saved-products"}
              className="px-2 py-1 flex items-end gap-1"
            >
              <BookmarkIcon width={26} />
              saved-products
            </Link>
            <ArrowRightOnRectangleIcon
              width={26}
              onClick={logout}
              className="text-red-600 cursor-pointer"
            />
          </div>
        </>
      ) : (
        <div className="flex gap-4 text-xl font-semibold ">
          <Link to={"/login"} className="hover:text-blue-300">
            Login
          </Link>
          <Link to={"/register"} className="hover:text-blue-200">
            Register
          </Link>
        </div>
      )}
    </section>
  );
};

export default Nav;
