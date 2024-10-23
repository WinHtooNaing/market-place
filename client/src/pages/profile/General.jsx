import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
const General = () => {
  const { email, name, role } = useSelector((state) => state.reducer.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <section>
      <p>Email -- {email}</p>
      <p>Name -- {name}</p>
      <p>Role -- {role}</p>
      <button
        onClick={logoutHandler}
        className="px-6 py-2 bg-blue-500 text-white rounded-sm"
      >
        Logout
      </button>
    </section>
  );
};

export default General;
