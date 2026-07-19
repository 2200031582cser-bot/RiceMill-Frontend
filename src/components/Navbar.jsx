import { Link, NavLink } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (

    <div className="bg-green-700 text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-bold">

            Rice Mill ERP

          </h1>

          {

            user && (

              <p className="text-sm text-green-100">

                {user.millName}

              </p>

            )

          }

        </div>

        {/* CENTER */}

        <div className="flex items-center gap-8 text-lg">

          <Link
            to="/"
            className="hover:text-yellow-300"
          >
            Dashboard
          </Link>

          <div className="relative group">

            <button className="hover:text-yellow-300">

              Employees

            </button>

            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">

              <div className="bg-white text-black rounded-xl shadow-lg w-64 overflow-hidden">

                <NavLink
                  to="/employees"
                  className="block px-5 py-4 hover:bg-[#F5F5F5]"
                >
                  Employee Management
                </NavLink>

                <NavLink
                  to="/attendance"
                  className="block px-5 py-4 hover:bg-[#F5F5F5]"
                >
                  Attendance
                </NavLink>

                <NavLink
                  to="/salary"
                  className="block px-5 py-4 hover:bg-[#F5F5F5]"
                >
                  Salary
                </NavLink>

              </div>

            </div>

          </div>

          <Link to="/government">
  Government
</Link>

          <Link
            to="/procurement"
            className="hover:text-yellow-300"
          >
            Paddy Procurement
          </Link>

          <Link
            to="/brokenrice"
            className="hover:text-yellow-300"
          >
            Broken Rice Procurement
          </Link>

          <Link
            to="/sales"
            className="hover:text-yellow-300"
          >
            Sales
          </Link>

          <Link to="/ledger">

  Ledger

</Link>

          <Link
            to="/expenses"
            className="hover:text-yellow-300"
          >
            Expenses
          </Link>

          <Link
            to="/analysis"
            className="hover:text-yellow-300"
          >
            Analysis
          </Link>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {

            user && (

              <span className="text-sm">

                Hi, {user.username}

              </span>

            )

          }

          <button

            onClick={logout}

            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"

          >

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}

export default Navbar;