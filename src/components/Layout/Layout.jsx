import React from 'react';
import AUX from '../../hoc/auxlilary';
import classes from './Layout.css'
const layout = (props) => (  
    <AUX>
    <div>ToolBar, Sidebar, BackDrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </AUX>

);

 
export default layout;