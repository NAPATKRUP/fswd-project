import { FC } from 'react';

import { HomeIcon } from '@heroicons/react/outline';

import { IAddress } from './type/IAddress';

interface AddressProps {
  address: IAddress;
}

const AddressCard: FC<AddressProps> = ({ address }: AddressProps) => {
  return (
    <div className="lg:px-20 px-10 pt-12">
      <p className="lg:text-xl md:text-lg font-semibold mt-8 mb-4 inline-flex">
        ที่อยู่ในการจัดส่ง <HomeIcon className="h-6 w-6 mx-2" />
      </p>
      <p className="md:text-sm lg:text-base mt-8">
        ชื่อที่แสดง <span className="mx-2 font-semibold">{address.name}</span>
      </p>
      <p className="md:text-sm lg:text-base mt-3">รายละเอียดที่อยู่</p>
      <p className="md:text-sm lg:text-base font-semibold">{address.addressDetail}</p>
    </div>
  );
};

export default AddressCard;
