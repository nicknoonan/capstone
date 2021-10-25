import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Box from '@material-ui/core/Box';

    const redirecting = props => {
    const style = {textAlign: 'center'};
        return (
            <div style={style}>
                <ClimbingBoxLoader 
                        color='#F6832A' 
                        loading={loading} 
                        size={20}
                    />
                <Box
                    sx={{
                        p: 2,
                        minWidth: 'justify',
                        minHeight: '50px',
                        margin: 50,
                    }}
                >
                </Box>
            </div>
        );
    }


export default redirecting; 