import  { useState } from 'react';
import PropTypes from 'prop-types';

const ExpandableText = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <p className={`${isExpanded ? '' : ''} text-justify`}>
                {isExpanded ? text : `${text.substring(0, maxLength)}...`}
                <button onClick={toggleExpansion} className="text-blue-500 ml-2">
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
            </p>
        </div>
    );
};

ExpandableText.propTypes = {
    text: PropTypes.string.isRequired,
    maxLength: PropTypes.number.isRequired,
};

export default ExpandableText;
