import React from "react";

export const TextInput = (props) => {

    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/3 m-auto">
                <label className="block text-gray-500 font-bold md:text-right pr-4">
                    {props.name}
                </label>
            </div>
            <div className="md:w-2/3">
                <input 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={props.value}
                    onChange={props.handleChange}
                />
                {props.error ? <p className="text-red-500 text-xs italic">Required</p> : null} 
            </div>
        </div>
    )  
}
