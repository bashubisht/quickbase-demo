import React from "react";

const Choices = (props) => {
    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/3 m-auto">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Choices
                </label>
            </div>
            <div className="md:w-2/3">
                <textarea 
                    className="w-4/5 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
                    value={props.value}
                    onChange={props.handleChange}
                    rows="5"
                />
                {props.errors ? props.errors.map((error) => {
                    return <p className="text-red-500 text-xs italic" key={error}> {error} </p>
                }) : null}
            </div>
        </div>
    )
    
    
}

export default Choices;