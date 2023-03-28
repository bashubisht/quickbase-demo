import { FIELD_TYPES } from "../utils/constants";

const Type = (props) => {
    return (

        <div className="md:flex mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Type
                </label>
            </div>
            <div className="radioButton md:w-1/3" onClick={() => props.handleChange(FIELD_TYPES.multi)}>
                <input className="mr-2" 
                    type="radio" 
                    onChange={() => props.handleChange(FIELD_TYPES.multi)} 
                    checked={props.value === FIELD_TYPES.multi}
                    name = "Type"
                />
                <span>
                    {FIELD_TYPES.multi}
                </span>
            </div>
            <div className="radioButton md:w-1/3" onClick={() => props.handleChange(FIELD_TYPES.single)} >
                <input className="mr-2" 
                    type="radio" 
                    onChange={() => props.handleChange(FIELD_TYPES.single)} 
                    checked={props.value === FIELD_TYPES.single}
                    name = "Type"
                />
                <span>
                    {FIELD_TYPES.single}
                </span>
            </div>
        </div>
    )
}

export default Type;