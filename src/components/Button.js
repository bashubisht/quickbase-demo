export const Button = (props) => {

    return (
        <div className="md:flex mb-2 mr-10">
            <div className="md:w-3/3">
                <button
                    className={"bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"}
                    type="button"
                    onClick={props.handleButtonClick}
                >
                    {props.isLoading ? "Loading..." : props.btnLabel}
                </button>
            </div>
        </div>
    )
}