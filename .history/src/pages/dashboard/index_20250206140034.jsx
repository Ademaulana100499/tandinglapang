import React, { useState } from "react";
import { FiChevronsRight, FiChevronDown } from "react-icons/fi";
import { MdEventNote } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { FaRupiahSign } from "react-icons/fa6";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [selected, setSelected] = useState("Activities");

  return (
    <div className="flex bg-indigo-50">
      <Sidebar selected={selected} setSelected={setSelected} />
      <Content selected={selected} />
    </div>
  );
};
export default DashboardPage;

const Sidebar = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{ width: open ? "225px" : "fit-content" }}>
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={MdEventNote}
          title="Activities"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={TbCategory2}
          title="Sport Category"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FaRupiahSign}
          title="Transactions"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}>
      <div className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </div>
      {open && (
        <motion.span layout className="text-xs font-medium">
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-6 w-6" />
          {open && (
            <motion.div layout className="flex text-lg items-center gap-2">
              Tanding<span className="text-green-500">Lapang</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 hover:bg-slate-100">
      <div className="flex items-center p-2">
        <div className="grid size-10 place-content-center text-lg">
          <FiChevronsRight
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
        {open && (
          <motion.span layout className="text-xs font-medium">
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const Content = ({ selected }) => {
  return (
    <div className="h-[200vh] w-full p-4">
      {selected === "Activities" && <div>Activities</div>}
      {selected === "Sport Category" && <div>Sport Category</div>}
      {selected === "Transactions" && <div>Transactions</div>}
    </div>
  );
};
