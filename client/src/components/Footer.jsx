import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className=" w-full   shadow-md border-t-2 border-blue-600 mt-20">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link to={"/"} className="hover:underline">
            Market.io
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              to="#"
              className="me-4 md:me-6 font-bold text-base hover:cursor-not-allowed"
            >
              Contact here
            </Link>
          </li>
          <li>
            <Link
              to={"http://github.com/WinHtooNaing"}
              className="hover:underline me-4 md:me-6 text-blue-500"
            >
              github
            </Link>
          </li>
          <li>
            <Link
              to={"https://www.facebook.com/win.h.naing.77398"}
              className="hover:underline me-4 md:me-6 text-blue-500"
            >
              facebook
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
