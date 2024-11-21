import React from 'react';
import { NavLink } from 'react-router-dom';

function PriorityIndicator() {
    return (
        <div className='flex-grow'>
            <nav>
                <ul className='flex gap-3 justify-between p-3 bg-white rounded-lg shadow-2xl'>
                    <li>
                        <NavLink to="/">Priority</NavLink>
                    </li>
                    <li>
                        <NavLink to="/low">Low</NavLink>
                    </li>
                    <li>
                        <NavLink to="/medium">Medium</NavLink>
                    </li>
                    <li>
                        <NavLink to="/high">High</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PriorityIndicator;
