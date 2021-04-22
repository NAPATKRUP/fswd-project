import React, { FunctionComponent } from "react";

const FilterProductBar: FunctionComponent = () => {
  return (
    <div className="px-20 py-10">
      <div className="text-2xl">ค้นหาน้ำหอม</div>
      <form action="" method="post">
        <select name="searchType" id="searchType" className="border border-black rounded p-1">
          <option value="เรียงจากราคามากสุด" selected>
            เรียงจากราคามากสุด
          </option>
          <option value="เรียงจากราคาต่ำสุด">เรียงจากราคาต่ำสุด</option>
          <option value="เรียงตามชื่อสินค้า (A-Z)">เรียงตามชื่อสินค้า (A-Z)</option>
          <option value="เรียงตามชื่อสินค้า (Z-A)">เรียงตามชื่อสินค้า (Z-A)</option>
          <option value="เรียงตามชื่อแบรนด์ (A-Z)">เรียงตามชื่อแบรนด์ (A-Z)</option>
          <option value="เรียงตามชื่อแบรนด์ (Z-A)">เรียงตามชื่อแบรนด์ (Z-A)</option>
        </select>
        <input
          type="text"
          name="name"
          className="border-b border-black mx-4 p-1"
          placeholder="ค้นหาชื่อน้ำหอม"
          value=""
        />
        <label>ในราคา</label>
        <input
          type="number"
          name="minPrice"
          className="border-b border-black mx-2 p-1"
          placeholder="ราคาขั้นต่ำ"
          value=""
        />
        <label>ถึง</label>
        <input
          type="number"
          name="maxPrice"
          className="border-b border-black mx-2 p-1"
          placeholder="ราคาขั้นสูง"
          value=""
        />
        <button
          type="submit"
          className="border-2 border-black hover:bg-gray-300 px-3 py-2 mt-2 rounded-full font-bold mx-2"
        >
          *
        </button>
      </form>
    </div>
  );
};

export default FilterProductBar;
