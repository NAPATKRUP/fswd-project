import { FC } from 'react';

import { IAddress } from './type/IAddress';

interface AddressProps {
  address: IAddress;
}

const AddressCard: FC<AddressProps> = ({ address }: AddressProps) => {
  return (
    <div className="lg:px-20 px-10 pt-12">
      <p className="lg:text-xl md:text-lg font-semibold mt-8 mb-4">ที่อยู่ในการจัดส่ง</p>
      <p className="md:text-sm lg:text-base">
        ชื่อที่แสดง <span className="font-semibold">{address.name}</span>
      </p>
      <p className="md:text-sm lg:text-base">
        รายละเอียดที่อยู่ <span className="font-semibold">{address.addressDetail}</span>
      </p>
    </div>
  );
};

export default AddressCard;
