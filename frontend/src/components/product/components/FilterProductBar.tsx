import { FC, useState, useCallback } from 'react';

interface FilterProductProps {
  callBackFunction: (searchType: string, name: string, minPrice: number, maxPrice: number) => void;
}

const FilterProductBar: FC<FilterProductProps> = ({ callBackFunction }: FilterProductProps) => {
  const [searchType, setSearchType] = useState<string>('PRICE_ASC');
  const [name, setName] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      return callBackFunction(searchType, name, minPrice, maxPrice);
    },
    [callBackFunction, minPrice, maxPrice, name, searchType]
  );

  return (
    <div>
      <p className="text-xl">ค้นหาน้ำหอม</p>
      <form onSubmit={(e) => handleSubmit(e)} className="mt-2">
        <select
          name="searchType"
          id="searchType"
          className="lg:w-3/12 w-1/3 border border-black rounded p-1"
          onChange={(event) => setSearchType(event.target.value)}
        >
          <option value="เรียงจากราคามากสุด" selected>
            เรียงจากราคามากสุด
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
          className="lg:w-3/12 w-2/3 border-b border-black p-1"
          placeholder="ค้นหาชื่อและแบรนด์น้ำหอม"
          onChange={(event) => setName(event.target.value)}
        />
        <label className="lg:w-1/12 w-1/4">ในราคา</label>
        <input
          type="number"
          name="minPrice"
          className="lg:w-2/12 md:w-1/3 w-1/4 border-b border-black p-1"
          placeholder="ราคาขั้นต่ำ"
          min="1"
          onChange={(event) => setMinPrice(parseInt(event.target.value))}
        />
        <label className="lg:w-1/12 w-1/4">ถึง</label>
        <input
          type="number"
          name="maxPrice"
          className="lg:w-2/12 md:w-1/3 w-1/4 border-b border-black p-1"
          placeholder="ราคาขั้นสูง"
          min="1"
          onChange={(event) => setMaxPrice(parseInt(event.target.value))}
        />
        <button
          type="submit"
          className="border-2 border-black hover:bg-dark-500 px-2 py-1 rounded-full font-semibold my-2"
        >
          ค้นหา
        </button>
      </form>
    </div>
  );
};

export default FilterProductBar;
