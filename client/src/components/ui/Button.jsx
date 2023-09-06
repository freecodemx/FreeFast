import PropTypes from 'prop-types';

export function Button({ onClick, children }) {
    return (
        <button
            className="text-white bg-orange-600 hover:bg-orange-800 ml-6 px-4 py-1 rounded-lg block md:inline-block"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired, // Agregamos PropTypes para 'children'
};
