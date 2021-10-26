import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import Box from '@material-ui/core/Box';

    const redirecting = props => {
    const style = {textAlign: 'center'};
        return (
            <div style={style}>
                <PacmanLoader 
                        color='#F6832A' 
                        loading={redirecting} 
                        size={30}
                        align='center'
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