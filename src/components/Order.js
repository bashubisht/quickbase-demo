import { CHOICE_ORDER_OPTIONS } from '../utils/constants';

const Order = (props) => {
    return (
        <div className="md:flex mb-6">
            <div className="md:w-1/3 m-auto">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    {props.name}
                </label>
            </div>
            <div className="md:w-2/3">
                <select 
                    className = "dropdownField bg-gray-200 border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
                    onChange = {props.handleChange}
                    value={props.value}
                >
                    <option>{props.option1}</option>
                    <option>{props.option2}</option>
                </select>
            </div>
        </div>
    )
}

export default Order; 