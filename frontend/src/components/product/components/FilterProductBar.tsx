import { FC, useState, useCallback } from 'react';

const FilterProductBar: any = (prop: any) => {
  const {
    handleName,
    handleMinPrice,
    handleMaxPrice,
    handleSearchType,
    nameInput,
    minPrice,
    maxPrice,
    searchType,
  } = prop;

  return (
    <div className="w-full">
      <p className="text-xl">ค้นหาน้ำหอม</p>
      <form className="mt-2">
        <select
          name="searchType"
          id="searchType"
          className="lg:w-3/12 w-1/3 border border-black rounded p-1"
          onChange={handleSearchType}
          value={searchType}
        >
          <option value="เรียงจากราคามากสุด">เรียงจากราคามากสุด</option>
          <option value="PRICE_ASC">เรียงจากราคาต่ำสุด</option>
          <option value="PRICE_DESC">เรียงจากราคาสูงสุด</option>
          <option value="NAME_ASC">เรียงตามชื่อสินค้า (A-Z)</option>
          <option value="NAME_DESC">เรียงตามชื่อสินค้า (Z-A)</option>
          <option value="BRAND_ASC">เรียงตามชื่อแบรนด์ (A-Z)</option>
          <option value="BRAND_DESC">เรียงตามชื่อแบรนด์ (Z-A)</option>
        </select>
        <input
          type="text"
          name="name"
          className="lg:w-3/12 w-2/3 border-b border-black p-1"
          placeholder="ค้นหาชื่อและแบรนด์น้ำหอม"
          onChange={handleName}
          value={nameInput}
        />
        <label className="lg:w-1/12 w-1/4">ในราคา</label>
        <input
          type="number"
          name="minPrice"
          className="lg:w-2/12 md:w-1/3 w-1/4 border-b border-black p-1"
          placeholder="ราคาขั้นต่ำ"
          min="1"
          onChange={handleMinPrice}
          value={minPrice}
        />
        <label className="lg:w-1/12 w-1/4">ถึง</label>
        <input
          type="number"
          name="maxPrice"
          className="lg:w-2/12 md:w-1/3 w-1/4 border-b border-black p-1"
          placeholder="ราคาขั้นสูง"
          min="1"
          onChange={handleMaxPrice}
          value={maxPrice}
        />
      </form>
    </div>
  );
};

export default FilterProductBar;
