export const CheckBox = (props) =>{
    return (        
        <div className="md:flex mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    {props.label}
                </label>
            </div>
            <div className="md:w-2/3">
                <input 
                    className="requiredCheckbox mr-2"
                    type="checkbox"
                    checked={props.value}
                    onChange={props.handleChange}/>
            </div>
        </div>
    )
}