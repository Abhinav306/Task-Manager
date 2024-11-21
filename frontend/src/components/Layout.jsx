import React from 'react';
import TaskIndicator from './TaskIndicator';
import PriorityIndicator from './PriorityIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <CreateTask />
                <div className='task-container w-full md:w-2/3 mx-5 mt-3 flex flex-col gap-3'>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    {/* Use flex to align the indicators horizontally */}
                    <div className='flex justify-between gap-3'>
                        <div className='indicator w-1/2'>
                            <PriorityIndicator />
                        </div>
                        <div className='indicator w-1/2'>
                            <TaskIndicator />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
