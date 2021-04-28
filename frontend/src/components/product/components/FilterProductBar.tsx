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
    <div className="px-20 py-10">
      <div className="text-2xl">ค้นหาน้ำหอม</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <select
          name="searchType"
          id="searchType"
          className="border border-black rounded p-1"
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
          className="border-b border-black mx-4 p-1"
          placeholder="ค้นหาชื่อและแบรนด์น้ำหอม"
          onChange={(event) => setName(event.target.value)}
        />
        <label>ในราคา</label>
        <input
          type="number"
          name="minPrice"
          className="border-b border-black mx-2 p-1"
          placeholder="ราคาขั้นต่ำ"
          min="1"
          onChange={(event) => setMinPrice(parseFloat(event.target.value))}
        />
        <label>ถึง</label>
        <input
          type="number"
          name="maxPrice"
          className="border-b border-black mx-2 p-1"
          placeholder="ราคาขั้นสูง"
          min="1"
          onChange={(event) => setMaxPrice(parseFloat(event.target.value))}
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
