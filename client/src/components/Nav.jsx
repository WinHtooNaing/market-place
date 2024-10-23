import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  return (
    <section className="bg-blue-500 flex items-center justify-between px-24 py-4 text-white max-sm:px-10 ">
      <Link to={"/"} className="text-3xl font-bold">
        POINT.IO
      </Link>
      {user ? (
        <Link to={"/profile"} className="flex items-end text-xl ">
          <UserIcon width={25} />
          profile
        </Link>
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
