import React, { FC } from 'react'
import Navbar from '../../commons/Navbar'

const HomePage:FC = () =>{
    return (
        <div className="flex h-screen">
            <Navbar />
            <div className="w-4/5 overflow-y-scroll page-color p-4">
                {/* Banner */}
                <div className="h-screen flex items-center justify-center text-4xl">Home Page Banner</div>
                {/* Lastest Promotion */}
                <div className="flex flex-col items-center p-20">
                    <div className="text-3xl">Latest Promotions</div>
                    <hr className="h-1 w-64 color-gold mt-4"></hr>
                    <hr className="h-1 w-48 color-gold mt-2"></hr>
                    <div className="h-64 w-2/3 bg-blue-400 mt-4">
                        image
                    </div>
                    <p className="text-right w-full">See more</p>
                </div>
                {/* Lastest Product */}
                <div className="p-20">
                    <div className="text-2xl">Latest Product</div>
                    <div className="flex">
                        <div className="h-96 w-1/5 p-2">
                            <div className="bg-blue-400 w-full h-full">image</div>
                        </div>
                        <div className="h-96 w-1/5 p-2">
                            <div className="bg-blue-400 w-full h-full">image</div>
                        </div>
                        <div className="h-96 w-1/5 p-2">
                            <div className="bg-blue-400 w-full h-full">image</div>
                        </div>
                        <div className="h-96 w-1/5 p-2">
                            <div className="bg-blue-400 w-full h-full">image</div>
                        </div>
                        <div className="h-96 w-1/5 p-2">
                            <div className="bg-blue-400 w-full h-full">image</div>
                        </div>
                    </div>
                    <p className="text-right w-full">See more</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage