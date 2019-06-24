import React from 'react'
import PropTypes from 'prop-types'
//postman hari reactapi hari nadda ?
const Progress = ({percentage})=>{
    return(
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success"
                 role="progressbar"
                 style={{width :'${percentage}%'}}
            >

                {percentage}%
            </div>
        </div>
            );
};//front end back end wena wenwama da ? ooooekema thama thiyenne server eke dala thiyenne back end eka

Progress.propTypes={
    percentage: PropTypes.number.isRequired
}

export default Progress