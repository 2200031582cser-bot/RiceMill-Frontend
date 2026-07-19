import { useState } from "react";

import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBill,
  FaChartBar,
  FaClipboardList,
  FaUniversity,
  FaSignOutAlt,
  FaBook,
  FaShoppingCart,
  FaWarehouse,
  FaIndustry,
  FaBalanceScale,
  FaCog
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      className={`
      fixed
      left-0
      top-0
      h-screen
      z-50

      transition-all
      duration-300

      border-r
      border-[#E8E2DC]

      bg-gradient-to-b
      from-[#F3F2F5]
      via-[#F5EFEA]
      to-[#E6D5CB]

      shadow-[0_10px_30px_rgba(0,0,0,0.05)]

      ${open ? "w-72" : "w-20"}
      `}
    >
      {/* HEADER */}

      <div
  className="
  p-5
  flex
  justify-between
  items-center
  border-b
  border-[#E8E2DC]
  "
>
  {open && (
    <div>
      <h1
        className="
        text-xl
        font-bold
        text-[#655C56]
        "
      >
        Rice Mill ERP
      </h1>

      <div className="flex items-center gap-2 mt-1">

        <p
          className="
          text-sm
          text-[#9A8E85]
          "
        >
          {user?.millName}
        </p>

        <button
          onClick={() => navigate("/company-profile")}
          className="
          w-7
          h-7

          rounded-full

          flex
          items-center
          justify-center

          text-[#8D8078]

          hover:bg-white
          hover:text-[#A0522D]

          transition-all
          duration-200
          "
          title="Company Settings"
        >
          <FaCog size={13} />
        </button>

      </div>
    </div>
  )}

  <button
    onClick={() => setOpen(!open)}
    className="
    text-[#655C56]
    hover:text-[#B7C2B2]
    transition
    "
  >
    <FaBars size={22} />
  </button>
</div>

      {/* MENU */}

      <div
        className="
        mt-5
        flex
        flex-col
        gap-2
        px-3
        overflow-y-auto
        h-[calc(100vh-140px)]
        pb-28
        "
      >
        <SidebarItem
          icon={<FaTachometerAlt />}
          text="Dashboard"
          link="/"
          open={open}
        />

        <SidebarItem
          icon={<FaUsers />}
          text="Employees"
          link="/employees"
          open={open}
        />

        <SidebarItem
          icon={<FaClipboardList />}
          text="Attendance"
          link="/attendance"
          open={open}
        />

        <SidebarItem
          icon={<FaMoneyBill />}
          text="Salary"
          link="/salary"
          open={open}
        />

        <SidebarItem
          icon={<FaShoppingCart />}
          text="Paddy Procurement"
          link="/procurement"
          open={open}
        />

        <SidebarItem
          icon={<FaIndustry />}
          text="Milling"
          link="/milling"
          open={open}
        />

        <SidebarItem
          icon={<FaWarehouse />}
          text="Broken Rice"
          link="/brokenrice"
          open={open}
        />

        <SidebarItem
          icon={<FaWarehouse />}
          text="SKU's"
          link="/sku"
          open={open}
        />

        <SidebarItem
          icon={<FaMoneyBill />}
          text="Sales"
          link="/sales"
          open={open}
        />

        <SidebarItem
          icon={<FaBook />}
          text="Ledger"
          link="/ledger"
          open={open}
        />

        <SidebarItem

icon={<FaBalanceScale />}

text="Weigh Bridge"

link="/weighbridge"

open={open}

/>

        <SidebarItem
          icon={<FaUniversity />}
          text="Government"
          link="/government"
          open={open}
        />

        <SidebarItem
          icon={<FaMoneyBill />}
          text="Expenses"
          link="/expenses"
          open={open}
        />

        <SidebarItem
          icon={<FaChartBar />}
          text="Analysis"
          link="/analysis"
          open={open}
        />
      </div>

      {/* LOGOUT */}

      <div className="absolute bottom-5 left-3 right-3">
        <button
          onClick={logout}
          className="
          w-full
          py-3

          rounded-2xl

          bg-[#B7C2B2]
          text-white

          hover:bg-[#A8B5A3]

          transition-all
          duration-300

          shadow-sm
          "
        >
          {open ? (
            "Logout"
          ) : (
            <FaSignOutAlt className="mx-auto" />
          )}
        </button>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  text,
  link,
  open
}) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-4

        px-5
        py-4

        rounded-2xl

        transition-all
        duration-300

        ${
          isActive
            ? `
            bg-white
            text-[#655C56]
            font-semibold
            shadow-sm
            border
            border-[#E8E2DC]
            `
            : `
            text-[#6F625A]
            hover:bg-white/60
            `
        }
        `
      }
    >
      <span className="text-lg">
        {icon}
      </span>

      {open && (
        <span className="text-sm">
          {text}
        </span>
      )}
    </NavLink>
  );
}

export default Sidebar;