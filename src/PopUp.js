import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';

export default function PopoverPopupState(props) {
    return (
        <PopupState variant="popover">
            {(popupState) => (
                <div>
                    <Button variant="text" {...bindTrigger(popupState)}>
                        read
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography sx={{p: 2}}>{props.content}</Typography>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}