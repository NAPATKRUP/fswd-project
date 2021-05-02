import { FC } from 'react';

interface FilterProductBarProps {
  handleName: (e: any) => void;
  handleMinPrice: (e: any) => void;
  handleMaxPrice: (e: any) => void;
  handleSearchType: (e: any) => void;
}

const FilterProductBar: FC<FilterProductBarProps> = ({
  handleName,
  handleMinPrice,
  handleMaxPrice,
  handleSearchType,
}: FilterProductBarProps) => {
  return (
    <div className="w-full">
      <p className="text-lg">ค้นหาน้ำหอม</p>
      <form className="grid grid-cols-12 mt-2 gap-2">
        <select
          name="searchType"
          id="searchType"
          className="lg:col-span-3 col-span-5 border border-black rounded p-1"
          onChange={handleSearchType}
        >
          <option value="" disabled>
            เลือกประเภทการค้นหา
          </option>
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
          className="lg:col-span-3 col-span-7 border-b border-black p-1"
          placeholder="ค้นหาชื่อและแบรนด์น้ำหอม"
          onChange={handleName}
        />
        <div className="lg:col-span-3 col-span-6 grid grid-cols-12">
          <p className="col-span-3 inline-flex mt-1">ราคา</p>
          <input
            type="number"
            name="minPrice"
            className="col-span-9 border-b border-black p-1"
            placeholder="ราคาขั้นต่ำ"
            min="1"
            onChange={handleMinPrice}
          />
        </div>
        <div className="lg:col-span-3 col-span-6 grid grid-cols-12">
          <p className="col-span-2 inline-flex mt-1">ถึง</p>
          <input
            type="number"
            name="maxPrice"
            className="col-span-9 border-b border-black p-1"
            placeholder="ราคาขั้นสูง"
            min="1"
            onChange={handleMaxPrice}
          />
        </div>
      </form>
    </div>
  );
};

export default FilterProductBar;
